import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'henna';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary:
    'bg-saffron-500 text-white hover:bg-saffron-600 shadow-diya hover:shadow-khadi',
  ghost:
    'bg-khadi-100 text-ink-900 hover:bg-khadi-200 border border-khadi-300',
  henna: 'bg-henna-500 text-white hover:bg-henna-700',
};

export const Button = ({ variant = 'primary', className, children, ...rest }: Props) => (
  <button
    {...rest}
    className={clsx(
      'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-200 active:scale-[0.98]',
      variantClass[variant],
      className,
    )}
  >
    {children}
  </button>
);
