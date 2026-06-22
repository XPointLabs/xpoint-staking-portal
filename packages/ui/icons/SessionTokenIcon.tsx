import { forwardRef } from 'react';
import type { SVGAttributes } from './types';

export const SessionTokenIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props} ref={ref}>
    <title>XPoint token</title>
    <defs>
      <linearGradient id="xpoint-token-gradient" x1="9" x2="55" y1="8" y2="56">
        <stop offset="0" stopColor="#2eefff" />
        <stop offset="0.42" stopColor="#18c8ff" />
        <stop offset="1" stopColor="#126dff" />
      </linearGradient>
      <linearGradient id="xpoint-token-core" x1="18" x2="46" y1="16" y2="48">
        <stop offset="0" stopColor="#8a5aff" />
        <stop offset="1" stopColor="#24d8ff" />
      </linearGradient>
    </defs>
    <circle
      cx="32"
      cy="32"
      r="29"
      fill="#020711"
      stroke="url(#xpoint-token-gradient)"
      strokeWidth="3"
    />
    <path
      fill="url(#xpoint-token-gradient)"
      d="M15.2 16.8h10.4l7 9.9 7.1-9.9h10.1L38 32.4l12.6 14.8H40.2l-7.9-9.8-8 9.8H14.1l12.8-15-11.7-15.4Z"
    />
    <circle cx="32" cy="32" r="4.2" fill="url(#xpoint-token-core)" />
    <path
      fill="none"
      stroke="#24d8ff"
      strokeLinecap="round"
      strokeWidth="2.4"
      d="M32 12v8.4M32 43.6V52M12 32h8.4M43.6 32H52"
    />
  </svg>
));
