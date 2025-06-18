'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useTranslatedStaticContent } from '@/hooks/useAutoTranslate';
import Footer from '@/components/Footer';
import TranslationIndicator from '@/components/TranslationIndicator';

export default function TestFooterTranslationPage() {
  const { t, language, setLanguage } = useLanguage();

  // Exemple de contenu à traduire avec exclusions
  const testContent = {
    title: 'Test de traduction',
    description: 'Cette description sera traduite automatiquement.',
    email: 'contact@newhorizon.fr', // Ne sera PAS traduit
    address: '123 Rue de la Solidarité, 67000 Strasbourg, France', // Ne sera PAS traduit
    phone: '03 88 12 34 56', // Ne sera PAS traduit
    buttonText: 'Contactez-nous', // Sera traduit
  };

  const { translatedContent, isTranslating } = useTranslatedStaticContent(testContent, language);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TranslationIndicator isTranslating={isTranslating} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            🧪 Test Footer & Traduction Sélective
          </h1>
          
          {/* Sélecteur de langue */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">🌍 Changement de langue</h2>
            <div className="flex space-x-4 justify-center">
              {['fr', 'en', 'tr'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    language === lang
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {lang === 'fr' ? '🇫🇷 Français' : lang === 'en' ? '🇬🇧 English' : '🇹🇷 Türkçe'}
                </button>
              ))}
            </div>
          </div>

          {/* Test de traduction sélective */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">🎯 Traduction Sélective</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Contenu original */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                  📝 Contenu Original (français)
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Titre:</strong> {testContent.title}</p>
                  <p><strong>Description:</strong> {testContent.description}</p>
                  <p><strong>Email:</strong> {testContent.email}</p>
                  <p><strong>Adresse:</strong> {testContent.address}</p>
                  <p><strong>Téléphone:</strong> {testContent.phone}</p>
                  <p><strong>Bouton:</strong> {testContent.buttonText}</p>
                </div>
              </div>

              {/* Contenu traduit */}
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-3">
                  🌍 Contenu Traduit ({language.toUpperCase()})
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Titre:</strong> {translatedContent.title}</p>
                  <p><strong>Description:</strong> {translatedContent.description}</p>
                  <p><strong>Email:</strong> <span className="bg-green-200 dark:bg-green-800 px-1 rounded">
                    {translatedContent.email} ✅ Non traduit
                  </span></p>
                  <p><strong>Adresse:</strong> <span className="bg-green-200 dark:bg-green-800 px-1 rounded">
                    {translatedContent.address} ✅ Non traduite
                  </span></p>
                  <p><strong>Téléphone:</strong> <span className="bg-green-200 dark:bg-green-800 px-1 rounded">
                    {translatedContent.phone} ✅ Non traduit
                  </span></p>
                  <p><strong>Bouton:</strong> {translatedContent.buttonText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Amélioré */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">🎨 Footer Amélioré</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  ✨ Améliorations apportées :
                </h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• <strong>Bordure supérieure</strong> : Border-t-4 pour délimiter clairement</li>
                  <li>• <strong>Dégradé de fond</strong> : from-gray-50 to-gray-100 en mode clair</li>
                  <li>• <strong>Ombre prononcée</strong> : shadow-2xl pour plus de profondeur</li>
                  <li>• <strong>Couleurs harmonisées</strong> : Palette gray cohérente</li>
                  <li>• <strong>Newsletter centrée</strong> : Section dédiée avec traduction</li>
                  <li>• <strong>Liens interactifs</strong> : Hover effects en bleu</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">
                  🌍 Traduction Newsletter :
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Le titre et la description du newsletter sont maintenant traduits automatiquement !
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2 text-blue-800 dark:text-blue-200">
              📋 Comment tester :
            </h3>
            <ol className="text-blue-700 dark:text-blue-300 space-y-2 text-sm">
              <li>1. <strong>Changez de langue</strong> avec les boutons ci-dessus</li>
              <li>2. <strong>Observez la traduction sélective</strong> : emails/adresses/téléphones restent intacts</li>
              <li>3. <strong>Scrollez vers le footer</strong> : voyez la démarcation claire en mode clair</li>
              <li>4. <strong>Testez le newsletter</strong> : titre et description traduits automatiquement</li>
              <li>5. <strong>Vérifiez les liens</strong> : hover effects en bleu, focus amélioré</li>
            </ol>
          </div>
        </div>
      </main>

      {/* Le footer apparaîtra ici naturellement */}
    </div>
  );
} 