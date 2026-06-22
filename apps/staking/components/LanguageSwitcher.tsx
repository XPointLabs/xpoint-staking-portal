'use client';

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@session/ui/ui/dropdown-menu';
import { useLocale, useTranslations } from 'next-intl';

const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const LOCALES = [
  { locale: 'en', label: 'English' },
  { locale: 'ru', label: 'Русский' },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const dictionary = useTranslations('navigation.hamburgerDropdown');

  const setLocale = (nextLocale: (typeof LOCALES)[number]['locale']) => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuLabel className="text-session-text-black-secondary">
        {dictionary('language')}
      </DropdownMenuLabel>
      {LOCALES.map(({ locale: optionLocale, label }) => (
        <DropdownMenuItem
          key={optionLocale}
          onSelect={() => setLocale(optionLocale)}
          className="flex cursor-pointer justify-between gap-8"
        >
          <span>{label}</span>
          {locale === optionLocale ? <span className="text-session-green">●</span> : null}
        </DropdownMenuItem>
      ))}
    </>
  );
}
