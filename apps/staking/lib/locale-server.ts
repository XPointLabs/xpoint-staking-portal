import 'server-only';

import { getMessages, getRequestConfig as i18nGetRequestConfig } from 'next-intl/server';
import { type UnsafeUnwrappedHeaders, headers } from 'next/headers';
import { getLangDir } from 'rtl-detect';
import { defaultTranslationValues } from './locale-defaults';
import { DEFAULT_LOCALE, type Locale, matchClosestLocale } from './locale-util';

type MessageValue = string | Messages;

interface Messages {
  [key: string]: MessageValue;
}

function isMessages(value: unknown): value is Messages {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function mergeMessages(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (isMessages(value) && isMessages(base[key])) {
      result[key] = mergeMessages(base[key], value);
      continue;
    }
    result[key] = value;
  }

  return result;
}

async function getMessagesForLocale(locale: Locale) {
  const defaultMessages = (await import(`../locales/${DEFAULT_LOCALE}.json`)).default as Messages;
  if (locale === DEFAULT_LOCALE) {
    return defaultMessages;
  }

  try {
    const localizedMessages = (await import(`../locales/${locale}.json`)).default as Messages;
    return mergeMessages(defaultMessages, localizedMessages);
  } catch (error) {
    console.warn(`Failed to load locale "${locale}", falling back to ${DEFAULT_LOCALE}`, error);
    return defaultMessages;
  }
}

function getCookieValue(cookieHeader: string | null, name: string) {
  const cookie = cookieHeader
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(name.length + 1));
}

export const getServerSideLocale = () => {
  const requestHeaders = headers() as unknown as UnsafeUnwrappedHeaders;
  const cookieLocale = getCookieValue(requestHeaders.get('cookie'), 'NEXT_LOCALE');
  const acceptLanguage = requestHeaders.get('accept-language');

  return matchClosestLocale(cookieLocale ?? acceptLanguage);
};

export const getLocalizationData = async () => {
  const locale = getServerSideLocale();
  const direction = getLangDir(locale);
  const messages = await getMessages();
  return { locale, direction, messages };
};

const getRequestConfig: ReturnType<typeof i18nGetRequestConfig> = i18nGetRequestConfig(async () => {
  const locale = getServerSideLocale();
  return {
    locale,
    messages: await getMessagesForLocale(locale),
    defaultTranslationValues,
  };
});

export default getRequestConfig;
