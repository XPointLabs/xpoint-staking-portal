import { forwardRef } from 'react';
import type { SVGAttributes } from '../types';

export const SessionIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} ref={ref}>
    <title>XPoint</title>
    <path d="M3.2 3h4.2l4.7 6.4L16.8 3H21l-6.7 8.9L21.5 21h-4.3l-5.1-6.5L7 21H2.7l7.3-9.4L3.2 3Z" />
    <circle cx="12" cy="12" r="1.8" />
    <path d="M11 1.5h2v4h-2zM11 18.5h2v4h-2zM1.5 11h4v2h-4zM18.5 11h4v2h-4z" />
  </svg>
));
