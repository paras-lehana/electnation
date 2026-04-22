import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  withPaisley?: boolean;
}

export const Card = ({ children, className, withPaisley }: Props) => (
  <div
    className={clsx(
      'relative rounded-2xl border border-khadi-200 bg-white/80 p-6 shadow-khadi backdrop-blur-sm',
      withPaisley && 'paisley-corner',
      className,
    )}
  >
    {children}
  </div>
);
