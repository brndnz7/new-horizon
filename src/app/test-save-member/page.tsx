'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function TestSaveMemberPage() {
  const [memberData, setMemberData] = useState({
    id: 1, // ID d'un membre existant
    name: 'Test Member',
    role: 'Test Role',
    description: 'Description de test',
    imageUrl: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setResult(null);
    
    console.log('🔄 Test sauvegarde avec données:', memberData);
    
    try {
      const response = await fetch('/api/admin/equipe', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData)
      });

      console.log('📥 Statut réponse:', response.status);
      
      const responseData = await response.json();
      console.log('📋 Données de réponse:', responseData);
      
      setResult({
        success: response.ok,
        status: response.status,
        data: responseData
      });
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      setResult({
        success: false,
        error: error.toString()
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Test Sauvegarde Membre</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-md space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nom</label>
            <input
              type="text"
              value={memberData.name}
              onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Rôle</label>
            <input
              type="text"
              value={memberData.role}
              onChange={(e) => setMemberData({ ...memberData, role: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={memberData.description}
              onChange={(e) => setMemberData({ ...memberData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
          
          <ImageUpload
            label="Image du membre"
            value={memberData.imageUrl}
            onChange={(imageUrl) => setMemberData({ ...memberData, imageUrl })}
          />
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          
          {result && (
            <div className="mt-6 p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Résultat :</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
          
          <div className="text-sm text-gray-600">
            <p><strong>Instructions :</strong></p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Ajoutez une image avec le composant ci-dessus</li>
              <li>Ouvrez la console (F12)</li>
              <li>Cliquez sur "Sauvegarder"</li>
              <li>Vérifiez les logs et le résultat affiché</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 