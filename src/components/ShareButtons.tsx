'use client';

import { useEffect, useState } from 'react';

interface ShareButtonsProps {
  title: string;
  className?: string;
}

export default function ShareButtons({ title, className = '' }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!currentUrl) {
    return (
      <div className={`flex space-x-4 ${className}`}>
        <a className="inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 focus:ring-primary-500 hover:shadow-md hover:translate-y-[-1px] px-4 py-2 text-sm transition-all duration-300 ease-in-out animate-pulse"
        >
          Partage...
        </a>
      </div>
    );
  }

  return (
    <div className={`flex space-x-4 ${className}`}>
      <a 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`}
        className="inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 focus:ring-primary-500 hover:shadow-md hover:translate-y-[-1px] px-4 py-2 text-sm transition-all duration-300 ease-in-out"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
        className="inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 focus:ring-primary-500 hover:shadow-md hover:translate-y-[-1px] px-4 py-2 text-sm transition-all duration-300 ease-in-out"
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
      <a 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
        className="inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 focus:ring-primary-500 hover:shadow-md hover:translate-y-[-1px] px-4 py-2 text-sm transition-all duration-300 ease-in-out"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
} 