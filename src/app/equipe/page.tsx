'use client'

import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import { useTranslatedTeamMembers } from '@/hooks/useAutoTranslate';
import TranslationIndicator from '@/components/TranslationIndicator';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
}

export default function TeamPage() {
  const { t, language } = useLanguage();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Réactivation du hook de traduction
  const { translatedMembers, isTranslating } = useTranslatedTeamMembers(members, language);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setError(null);
        const response = await fetch('/api/admin/equipe');
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validation que data est bien un tableau
        if (Array.isArray(data)) {
          setMembers(data);
        } else {
          console.error('Les données reçues ne sont pas un tableau:', data);
          throw new Error('Format de données invalide');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des membres:', error);
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
        setMembers([]); // S'assurer que members reste un tableau vide
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Erreur:</strong> {error}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Validation supplémentaire pour s'assurer que translatedMembers est un tableau
  const safeTranslatedMembers = Array.isArray(translatedMembers) ? translatedMembers : [];

  return (
    <>
      <TranslationIndicator isTranslating={isTranslating} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">{t('team.title')}</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          {t('team.subtitle')}
        </p>
        
        {/* Indicateur de traduction */}
        {isTranslating && language !== 'fr' && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Traduction en cours...
            </div>
          </div>
        )}

        {safeTranslatedMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Aucun membre d'équipe à afficher.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeTranslatedMembers.map((member) => (
              <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {member.imageUrl && (
                  <div className="relative h-64">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{member.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.role}</p>
                  <p className="text-gray-700 dark:text-gray-300">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
} 