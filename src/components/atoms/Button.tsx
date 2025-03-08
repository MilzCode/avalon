import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  className?: string;
}

export const Button = ({ children, variant = 'primary', fullWidth = false, className = '', disabled, ...props }: Props) => {
  const baseStyles = 'px-4 py-2 rounded transition-all duration-200';
  const variants = {
    primary: 'bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white',
    secondary: 'bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
