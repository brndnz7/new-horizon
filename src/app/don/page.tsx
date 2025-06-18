'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function DonPage() {
  const { t } = useLanguage();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Faire un don</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Soutenez New Horizon</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Votre don nous aide à poursuivre notre mission de promotion de la mobilité européenne 
              et de l'inclusion sociale des jeunes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">25€</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Contribution standard
              </p>
            </div>
            <div className="text-center p-6 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">50€</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Soutien renforcé
              </p>
              <div className="text-xs bg-blue-500 text-white px-2 py-1 rounded mt-2">Populaire</div>
            </div>
            <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">100€</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Mécénat
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-600 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-200">
                🚧 <strong>Page en construction</strong> - Le système de paiement sera bientôt disponible
              </p>
            </div>
            
            <div className="text-gray-600 dark:text-gray-300">
              <h3 className="font-semibold mb-2">En attendant, vous pouvez nous contacter :</h3>
              <p>📧 contact@newhorizon-asso.fr</p>
              <p>📱 +33 X XX XX XX XX</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 