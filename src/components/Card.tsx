import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'interactive' | 'gradient';
  hover?: boolean;
}

export default function Card({ 
  className = '', 
  children, 
  variant = 'default',
  hover = false,
  ...props 
}: CardProps) {
  const baseClasses = 'bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-600 overflow-hidden transition-all duration-300 ease-in-out';
  
      const variantClasses = {
      default: 'shadow-sm hover:shadow-md',
      elevated: 'shadow-lg hover:shadow-xl hover:translate-y-[-2px]',
      interactive: 'shadow-md hover:shadow-xl hover:translate-y-[-3px] cursor-pointer',
      gradient: 'border-gradient shadow-lg hover:shadow-xl hover:translate-y-[-2px] bg-gradient-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900'
    };

      const hoverClasses = hover ? 'hover-card' : '';

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ className = '', children, ...props }: CardHeaderProps) {
  const combinedClasses = [
    'px-6 py-5 border-b border-gray-200 dark:border-neutral-600 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-700 dark:to-neutral-800',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ className = '', children, ...props }: CardContentProps) {
  const combinedClasses = [
    'px-6 py-5 relative',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  const combinedClasses = [
    'px-6 py-4 border-t border-gray-200 dark:border-neutral-600 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-700 dark:to-neutral-800',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
} 