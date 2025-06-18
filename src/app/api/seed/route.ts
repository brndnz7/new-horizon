import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET () {
  try {
    // Vérifie si les données existent déjà (simple vérif sur TeamMember)
    const count = await prisma.teamMember.count()
    if (count > 0) {
      return NextResponse.json({ message: 'Les données existent déjà.' })
    }

    // Membres d'équipe
    const membersData = [
      {
        name: 'Jean Dupont',
        role: 'Président',
        description: "Fondateur de l'association avec plus de 10 ans d'expérience.",
        imageUrl: '/images/team/jean.jpg'
      },
      {
        name: 'Marie Martin',
        role: 'Vice-présidente',
        description: 'Spécialiste en développement communautaire.',
        imageUrl: '/images/team/marie.jpg'
      },
      {
        name: 'Pierre Durand',
        role: 'Trésorier',
        description: 'Expert en gestion financière et comptabilité.',
        imageUrl: '/images/team/pierre.jpg'
      }
    ]

    for (const member of membersData) {
      await prisma.teamMember.create({ data: member })
    }

    // Projets
    const projectsData = [
      {
        title: 'Projet Éducation',
        description: "Programme d'éducation pour les enfants défavorisés.",
        imageUrl: '/images/projects/education.jpg',
        status: 'En cours'
      },
      {
        title: 'Projet Environnement',
        description: "Initiative de protection de l'environnement local.",
        imageUrl: '/images/projects/environment.jpg',
        status: 'Planifié'
      }
    ]

    for (const project of projectsData) {
      await prisma.project.create({ data: project })
    }

    // Articles de blog
    const postsData = [
      {
        title: 'Notre mission',
        content: 'Découvrez notre mission et nos valeurs…',
        imageUrl: '/images/blog/mission.jpg'
      },
      {
        title: 'Nos réalisations',
        content: 'Un aperçu de nos projets réussis…',
        imageUrl: '/images/blog/achievements.jpg'
      }
    ]

    for (const post of postsData) {
      await prisma.blogPost.create({ data: post })
    }

    return NextResponse.json({ message: 'Données de démonstration insérées avec succès ✅' })
  } catch (error) {
    console.error('[SEED]', error)
    return new NextResponse('Erreur lors de l\'insertion', { status: 500 })
  }
} 