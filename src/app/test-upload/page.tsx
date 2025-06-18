'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function TestUploadPage() {
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🧪 Test Upload d'Images
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md space-y-6">
          <ImageUpload
            label="Test d'upload"
            value={imageUrl}
            onChange={setImageUrl}
            placeholder="Testez l'upload ici"
          />
          
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              URL résultante :
            </h3>
            <code className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm block overflow-x-auto">
              {imageUrl || 'Aucune image sélectionnée'}
            </code>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p><strong>Instructions :</strong></p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Ouvrez la console du navigateur (F12)</li>
              <li>Glissez une image ou cliquez pour en sélectionner une</li>
              <li>Vérifiez les logs dans la console</li>
              <li>L'URL devrait apparaître ci-dessus</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 