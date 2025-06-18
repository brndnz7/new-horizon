import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Types de fichiers autorisés
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Validation du type de fichier
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Type de fichier non autorisé. Utilisez JPG, PNG, WEBP ou GIF.' 
      }, { status: 400 });
    }

    // Validation de la taille
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ 
        error: 'Fichier trop volumineux. Maximum 5MB.' 
      }, { status: 400 });
    }

    // Générer un nom de fichier unique
    const timestamp = new Date().getTime();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${originalName}`;

    // Déterminer le dossier de destination
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Créer le dossier si il n'existe pas
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sauvegarder le fichier
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Retourner l'URL publique
    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({ 
      url: publicUrl,
      message: 'Fichier uploadé avec succès'
    });

  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload du fichier' 
    }, { status: 500 });
  }
} 