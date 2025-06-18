'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function TestThemePage() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8">Chargement du test du mode sombre...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Test du mode sombre (next-themes)</h1>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold mb-4">État actuel du thème</h2>
            <div className="space-y-2">
              <p><strong>Composant monté :</strong> {mounted ? 'Oui' : 'Non'}</p>
              <p><strong>Thème sélectionné :</strong> {theme}</p>
              <p><strong>Thème résolu :</strong> {resolvedTheme}</p>
              <p><strong>Thème système :</strong> {systemTheme}</p>
              <p><strong>Classe sur HTML :</strong> {document.documentElement.classList.contains('dark') ? 'dark' : 'light'}</p>
              <p><strong>localStorage :</strong> {localStorage.getItem('theme') || 'non défini'}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold mb-4">Contrôles</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setTheme('light')}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Mode clair
              </button>
              <button
                onClick={() => setTheme('dark')}
                className="px-4 py-2 bg-neutral-700 text-white rounded-md hover:bg-neutral-800 transition-colors"
              >
                Mode sombre
              </button>
              <button
                onClick={() => setTheme('system')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Système
              </button>
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Basculer
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold mb-4">Test visuel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded">
                <h3 className="font-semibold mb-2">Couleurs de base</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Texte secondaire qui change selon le thème
                </p>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded">
                <h3 className="font-semibold mb-2 text-primary-700 dark:text-primary-300">
                  Couleurs primaires
                </h3>
                <p className="text-primary-600 dark:text-primary-400">
                  Couleurs de marque adaptées au thème
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold mb-4">Éléments interactifs</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Champ de saisie"
                className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
              />
              <button className="w-full p-3 bg-accent-500 hover:bg-accent-600 text-white rounded-md transition-colors">
                Bouton d'action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 