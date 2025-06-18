import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Début de l\'insertion des données...');

  try {
    // Données des membres de l'équipe
    const teamMembers = [
      {
        name: 'Jean Dupont',
        role: 'Président',
        description: 'Fondateur de l\'association avec plus de 10 ans d\'expérience.',
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
    ];

    // Données des projets (exemples New Horizon)
    const projects = [
      {
        title: 'Erasmus+ Jeunesse – « Horizon Europe »',
        slug: 'erasmus-horizon-europe',
        description: 'Mobilité de 20 jeunes de quartiers prioritaires vers l\'Espagne pour un échange interculturel de 10 jours.',
        content: '# Erasmus+ « Horizon Europe »',
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
        content: '# Green City',
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

    // Données des articles de blog
    const blogPosts = [
      {
        title: '5 conseils pour préparer son premier échange Erasmus',
        slug: '5-conseils-erasmus',
        excerpt: 'Tout ce qu\'il faut savoir pour vivre une mobilité réussie avec New Horizon.',
        content: '# Erasmus tips',
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
        content: '# Education NF',
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

    // Insertion des données
    console.log('Insertion des membres de l\'équipe...');
    for (const member of teamMembers) {
      await prisma.teamMember.create({ data: member });
    }

    console.log('Insertion des projets...');
    for (const project of projects) {
      await prisma.project.create({ data: project });
    }

    console.log('Insertion des articles de blog...');
    for (const post of blogPosts) {
      await prisma.blogPost.create({ data: post });
    }

    console.log('Insertion des données terminée !');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}); 