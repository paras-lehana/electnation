import { clsx } from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  withPaisley?: boolean;
}

export const Card = ({ children, className, withPaisley, ...props }: Props) => (
  <div
    {...props}
    className={clsx(
      'relative rounded-2xl border border-khadi-200 bg-white/80 p-6 shadow-khadi backdrop-blur-sm',
      withPaisley && 'paisley-corner',
      className,
    )}
  >
    {children}
  </div>
);
