'use client';

import { useState, useEffect } from 'react';

export default function DebugDbPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/equipe');
      const result = await response.json();
      console.log('🔍 Données brutes de la DB:', result);
      setData(result);
    } catch (error) {
      console.error('❌ Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMemberImage = async (id: number, imageUrl: string) => {
    try {
      const payload = {
        id,
        name: "Test Member",
        role: "Test Role", 
        description: "Test Description",
        imageUrl
      };
      
      console.log('📤 Test update avec:', payload);
      
      const response = await fetch('/api/admin/equipe', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      console.log('📥 Réponse update:', result);
      
      if (response.ok) {
        alert('✅ Update réussi !');
        fetchData(); // Recharger
      } else {
        alert('❌ Erreur update');
      }
    } catch (error) {
      console.error('❌ Erreur update:', error);
      alert('❌ Erreur update');
    }
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Debug Base de Données</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Données brutes :</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test Update Image :</h2>
          <div className="space-y-4">
            {data && data.map((member: any) => (
              <div key={member.id} className="border p-4 rounded">
                <p><strong>ID:</strong> {member.id}</p>
                <p><strong>Nom:</strong> {member.name}</p>
                <p><strong>Image actuelle:</strong> {member.imageUrl || 'Aucune'}</p>
                <button
                  onClick={() => updateMemberImage(member.id, '/uploads/test-image.jpg')}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                >
                  Tester update image
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 