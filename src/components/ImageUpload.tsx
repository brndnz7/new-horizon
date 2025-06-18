'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export default function ImageUpload({ 
  value, 
  onChange, 
  label = "Image", 
  required = false,
  placeholder = "Glissez une image ici ou cliquez pour sélectionner"
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestion du glisser-déposer
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, []);

  // Gestion de la sélection de fichier
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  }, []);

  // Upload du fichier
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    console.log('🔄 Upload en cours pour:', file.name);
    
    try {
      // Créer un FormData pour l'upload
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('📤 Envoi vers /api/upload...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      console.log('📥 Réponse reçue:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Upload réussi:', result);
        setPreview(result.url);
        onChange(result.url);
      } else {
        const error = await response.text();
        console.error('❌ Erreur serveur:', error);
        // Fallback: créer une URL temporaire pour l'aperçu
        const tempUrl = URL.createObjectURL(file);
        setPreview(tempUrl);
        onChange(tempUrl);
        alert('Problème d\'upload, image temporaire utilisée. Vérifiez la console.');
      }
    } catch (error) {
      console.error('❌ Erreur upload:', error);
      // Fallback: créer une URL temporaire pour l'aperçu
      const tempUrl = URL.createObjectURL(file);
      setPreview(tempUrl);
      onChange(tempUrl);
      alert('Erreur de connexion, image temporaire utilisée.');
    } finally {
      setIsUploading(false);
    }
  };

  // Supprimer l'image
  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="space-y-4">
        {/* Zone de prévisualisation */}
        {preview && (
          <div className="space-y-3">
            <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group">
              <Image
                src={preview}
                alt="Aperçu"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                onError={() => {
                  setPreview(null);
                  onChange('');
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-red-600"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <strong>URL:</strong> <code>{preview}</code>
            </div>
          </div>
        )}

        {/* Zone de glisser-déposer */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload en cours...</p>
              </>
            ) : (
              <>
                <svg
                  className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {placeholder}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  PNG, JPG, WEBP jusqu'à 5MB
                </p>
              </>
            )}
          </div>
        </div>

        {/* Input caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

                 {/* Option pour URL manuelle */}
         {!preview && (
           <details className="group">
             <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
               📎 Ou saisir une URL d'image
             </summary>
             <div className="mt-2">
               <input
                 type="text"
                 name="imageUrl"
                 value={value || ''}
                 onChange={(e) => {
                   onChange(e.target.value);
                   setPreview(e.target.value);
                 }}
                 placeholder="https://exemple.com/image.jpg ou /uploads/image.jpg"
                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
               />
             </div>
           </details>
         )}
      </div>
    </div>
  );
} 