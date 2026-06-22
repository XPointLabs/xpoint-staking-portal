import { cn } from '@session/ui/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export type NodeNotificationProps = HTMLAttributes<HTMLSpanElement> & {
  level?: 'info' | 'warning' | 'error';
};

export const BaseNodeNotificationText = forwardRef<HTMLSpanElement, NodeNotificationProps>(
  ({ className, children, level, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex min-w-0 max-w-full flex-wrap items-center gap-1 font-normal text-xs md:text-base',
        level === 'warning'
          ? 'text-warning'
          : level === 'error'
            ? 'text-destructive'
            : 'text-session-text',
        className
      )}
      {...props}
    >
      <span aria-hidden className="mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      {children}
    </span>
  )
);
