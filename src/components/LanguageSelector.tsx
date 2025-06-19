"use client";

import React from 'react';
import { useLanguage, Language } from '@/hooks/useLanguage';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'fr' as Language, label: 'Français', shortCode: 'FR' },
    { code: 'en' as Language, label: 'English', shortCode: 'EN' },
    { code: 'tr' as Language, label: 'Türkçe', shortCode: 'TR' }
  ] as const;

  const handleLanguageChange = (langCode: Language) => {
    try {
      setLanguage(langCode);
      console.log('Language changed to:', langCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <div className="flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200
            ${language === lang.code
              ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-neutral-700/50'
            }
          `}
          aria-label={`Changer la langue vers ${lang.label}`}
          title={lang.label}
        >
          {lang.shortCode}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector; 