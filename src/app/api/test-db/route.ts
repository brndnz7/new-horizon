import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    // Test de connexion simple
    const userCount = await prisma.user.count();
    const teamCount = await prisma.teamMember.count();
    const projectCount = await prisma.project.count();
    const blogCount = await prisma.blogPost.count();

    return NextResponse.json({
      success: true,
      message: 'Connexion à la base de données réussie',
      data: {
        users: userCount,
        teamMembers: teamCount,
        projects: projectCount,
        blogPosts: blogCount
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return NextResponse.json({
      success: false,
      error: 'Impossible de se connecter à la base de données',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 