import { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  container?: boolean;
}

export default function Section({ 
  className = '', 
  children, 
  container = true, 
  ...props 
}: SectionProps) {
  const sectionClasses = [
    'py-16',
    className
  ].filter(Boolean).join(' ');

  const content = container ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  ) : (
    children
  );

  return (
    <section className={sectionClasses} {...props}>
      {content}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  centered = false, 
  className = '' 
}: SectionHeaderProps) {
  const headerClasses = [
    'mb-12',
    centered ? 'text-center' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClasses}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
} 