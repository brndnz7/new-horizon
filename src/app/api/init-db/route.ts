import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST() {
  try {
    console.log('🚀 Initialisation de la base de données...');

    // Créer l'utilisateur admin
    console.log('👤 Création de l\'utilisateur admin...');
    try {
      const admin = await prisma.user.create({
        data: {
          username: 'admin',
          password: 'NewHorizon2024!',
          role: 'admin',
          name: 'Administrateur',
          email: 'admin@newhorizon.org',
          active: true
        }
      });
      console.log('✅ Admin créé:', admin.username);
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log('⚠️ Admin existe déjà');
      } else {
        throw error;
      }
    }

    // Créer les membres de l'équipe
    console.log('👥 Création des membres de l\'équipe...');
    const teamMembers = [
      {
        name: 'Jean Dupont',
        role: 'Président',
        description: 'Fondateur de l\'association avec plus de 10 ans d\'expérience dans la mobilité européenne.',
        imageUrl: '/images/team/jean.jpg'
      },
      {
        name: 'Marie Martin',
        role: 'Vice-présidente',
        description: 'Spécialiste en développement communautaire et coordinatrice des projets Erasmus+.',
        imageUrl: '/images/team/marie.jpg'
      },
      {
        name: 'Pierre Durand',
        role: 'Trésorier',
        description: 'Expert en gestion financière et comptabilité des associations.',
        imageUrl: '/images/team/pierre.jpg'
      }
    ];

    let createdMembers = 0;
    for (const member of teamMembers) {
      try {
        await prisma.teamMember.create({ data: member });
        console.log('✅ Membre créé:', member.name);
        createdMembers++;
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log('⚠️ Membre existe déjà:', member.name);
        } else {
          throw error;
        }
      }
    }

    // Créer les projets
    console.log('📋 Création des projets...');
    const projects = [
      {
        title: 'Erasmus+ Jeunesse – « Horizon Europe »',
        slug: 'erasmus-horizon-europe',
        description: 'Mobilité de 20 jeunes de quartiers prioritaires vers l\'Espagne pour un échange interculturel de 10 jours.',
        content: '# Erasmus+ « Horizon Europe »\n\nCe projet vise à promouvoir la mobilité européenne des jeunes.',
        image: '/images/projects/erasmus.jpg',
        category: 'Mobilité',
        status: 'active',
        location: 'Valence, Espagne',
        volunteers: 4,
        beneficiaries: 20,
        tags: JSON.stringify(['jeunesse','europe']),
        startDate: new Date('2024-07-15')
      },
      {
        title: 'Corps Européen de Solidarité – « Green City »',
        slug: 'ces-green-city',
        description: 'Parcours de volontariat écologique de 6 mois pour sensibiliser aux enjeux climatiques.',
        content: '# Green City\n\nProjet environnemental pour sensibiliser aux enjeux climatiques.',
        image: '/images/projects/green-city.jpg',
        category: 'Environnement',
        status: 'active',
        location: 'Strasbourg',
        volunteers: 6,
        beneficiaries: 300,
        tags: JSON.stringify(['écologie','volontariat']),
        startDate: new Date('2024-03-01')
      }
    ];

    let createdProjects = 0;
    for (const project of projects) {
      try {
        await prisma.project.create({ data: project });
        console.log('✅ Projet créé:', project.title);
        createdProjects++;
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log('⚠️ Projet existe déjà:', project.title);
        } else {
          throw error;
        }
      }
    }

    // Créer les articles de blog
    console.log('📝 Création des articles de blog...');
    const blogPosts = [
      {
        title: '5 conseils pour préparer son premier échange Erasmus',
        slug: '5-conseils-erasmus',
        excerpt: 'Tout ce qu\'il faut savoir pour vivre une mobilité réussie avec New Horizon.',
        content: '# 5 conseils pour préparer son premier échange Erasmus\n\nDécouvrez nos conseils pour réussir votre mobilité.',
        image: '/images/blog/conseils-erasmus.jpg',
        category: 'Mobilité',
        tags: JSON.stringify(['erasmus','tips']),
        author: 'Léa Schneider',
        authorRole: 'Coordinatrice mobilité',
        readTime: 4,
        published: true,
        publishedAt: new Date('2024-06-01')
      },
      {
        title: 'L\'impact de l\'éducation non formelle',
        slug: 'impact-education-non-formelle',
        excerpt: 'Pourquoi apprendre en dehors de la salle de classe change la donne ?',
        content: '# L\'impact de l\'éducation non formelle\n\nExplorons les bénéfices de l\'apprentissage informel.',
        image: '/images/blog/education-nf.jpg',
        category: 'Éducation',
        tags: JSON.stringify(['éducation','innovation']),
        author: 'Karim Benali',
        authorRole: 'Formateur',
        readTime: 6,
        published: true,
        publishedAt: new Date('2024-05-20')
      }
    ];

    let createdPosts = 0;
    for (const post of blogPosts) {
      try {
        await prisma.blogPost.create({ data: post });
        console.log('✅ Article créé:', post.title);
        createdPosts++;
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log('⚠️ Article existe déjà:', post.title);
        } else {
          throw error;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: '🎉 Base de données initialisée avec succès !',
      data: {
        adminCreated: true,
        membersCreated: createdMembers,
        projectsCreated: createdProjects,
        postsCreated: createdPosts
      },
      credentials: {
        username: 'admin',
        password: 'NewHorizon2024!'
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'initialisation de la base de données',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 