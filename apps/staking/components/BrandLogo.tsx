import { cn } from '@session/ui/lib/utils';
import Image from 'next/image';

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export function BrandLogo({ className, iconClassName, textClassName }: BrandLogoProps) {
  return (
    <span className={cn('inline-flex h-11 items-center gap-3', className)}>
      <Image
        src="/images/xpoint-logo-256.png"
        alt="XPoint Network"
        width={40}
        height={40}
        priority
        className={cn('h-10 w-10 object-contain', iconClassName)}
      />
      <span
        className={cn(
          'bg-clip-text font-monument-extended text-transparent text-xl',
          '[background-image:var(--session-gradient-green)]',
          textClassName
        )}
      >
        XPoint
      </span>
    </span>
  );
}
