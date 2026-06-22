import { BASE_URL } from '@/lib/constants';
import { getTranslations } from 'next-intl/server';

const SITE_IMAGE = `${BASE_URL}/images/xpoint-logo-512.png`;
const SITE_ICON = `${BASE_URL}/images/xpoint-logo-256.png`;

export const siteMetadata = async (props: {
  title?: string;
  description?: string;
  image?: string;
}) => {
  const dict = await getTranslations('metadata.root');
  const { title, description = dict('description'), image = SITE_IMAGE } = props;
  return {
    metadataBase: new URL(BASE_URL),
    title: `${title ? `${title} | ` : ''}${dict('title')}`,
    description,
    icons: {
      icon: SITE_ICON,
      apple: SITE_ICON,
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
  };
};
