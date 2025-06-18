'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SimpleTestPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Test Simple du Mode Sombre</h1>
      
      <div className="mb-8">
        <p>Thème actuel : {theme}</p>
        <p>Thème résolu : {resolvedTheme}</p>
        <p>Classe dark active : {document.documentElement.classList.contains('dark') ? 'OUI' : 'NON'}</p>
      </div>

      <div className="space-x-4 mb-8">
        <button 
          onClick={() => setTheme('light')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Dark
        </button>
        <button 
          onClick={() => setTheme('system')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          System
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Carte de test</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ce texte devrait changer de couleur selon le mode.
          </p>
        </div>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">
            Carte colorée
          </h2>
          <p className="text-blue-600 dark:text-blue-300">
            Les couleurs doivent s'adapter au thème.
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 border border-gray-300 dark:border-gray-600 rounded">
        <h3 className="font-semibold mb-2">Test des bordures</h3>
        <p>Cette boîte a une bordure qui change selon le thème.</p>
      </div>
    </div>
  );
} 