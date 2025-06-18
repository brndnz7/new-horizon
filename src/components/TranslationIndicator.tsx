'use client';

import { useEffect, useState } from 'react';

interface TranslationIndicatorProps {
  isTranslating: boolean;
}

export default function TranslationIndicator({ isTranslating }: TranslationIndicatorProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isTranslating) {
      setShow(true);
    } else {
      // Masquer l'indicateur avec un délai pour une animation fluide
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isTranslating]);

  if (!show) return null;

  return (
    <div 
      className={`fixed top-16 left-0 right-0 z-40 bg-blue-500/90 dark:bg-blue-600/90 backdrop-blur-sm border-b border-blue-300 dark:border-blue-500 transition-all duration-300 ${
        isTranslating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-center space-x-3">
          {/* Spinner animé */}
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          
          {/* Texte */}
          <span className="text-white text-sm font-medium">
            Traduction en cours...
          </span>
          
          {/* Barre de progression animée */}
          <div className="w-20 h-1 bg-blue-300/50 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-pulse rounded-full w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 