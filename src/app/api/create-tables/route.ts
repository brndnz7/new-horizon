import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🚀 Création des tables...');

    // Utiliser des requêtes SQL directes pour créer les tables
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "username" TEXT UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "role" TEXT DEFAULT 'admin',
        "name" TEXT NOT NULL,
        "email" TEXT UNIQUE NOT NULL,
        "active" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "TeamMember" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "imageUrl" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Project" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "description" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "image" TEXT,
        "category" TEXT,
        "status" TEXT DEFAULT 'active',
        "location" TEXT,
        "volunteers" INTEGER DEFAULT 0,
        "beneficiaries" INTEGER DEFAULT 0,
        "budget" INTEGER DEFAULT 0,
        "raised" INTEGER DEFAULT 0,
        "progress" INTEGER DEFAULT 0,
        "tags" TEXT,
        "startDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "endDate" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "BlogPost" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "excerpt" TEXT,
        "content" TEXT NOT NULL,
        "image" TEXT,
        "category" TEXT,
        "tags" TEXT,
        "author" TEXT,
        "authorRole" TEXT,
        "readTime" INTEGER DEFAULT 5,
        "published" BOOLEAN DEFAULT false,
        "publishedAt" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "settings" (
        "id" SERIAL PRIMARY KEY,
        "key" TEXT UNIQUE NOT NULL,
        "value" TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('✅ Tables créées avec succès !');

    return NextResponse.json({
      success: true,
      message: '✅ Tables créées avec succès !',
      instructions: 'Maintenant, allez sur /api/init-db pour insérer les données'
    });

  } catch (error) {
    console.error('❌ Erreur lors de la création des tables:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la création des tables',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 