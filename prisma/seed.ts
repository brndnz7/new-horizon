// TEMPORAIREMENT DÉSACTIVÉ POUR VERCEL BUILD
// TODO: Réactiver une fois Supabase configuré

console.log('Seed script temporarily disabled for Vercel build');

/*
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Données de l'équipe
  const teamMembers = [
    {
      name: 'Sophie Martin',
      role: 'Présidente',
      description: 'Fondatrice de l\'association avec plus de 15 ans d\'expérience dans le secteur associatif.',
      imageUrl: '/images/team/sophie.jpg'
    },
    {
      name: 'Thomas Dubois',
      role: 'Trésorier',
      description: 'Expert-comptable de formation, il gère les finances de l\'association depuis 5 ans.',
      imageUrl: '/images/team/thomas.jpg'
    },
    {
      name: 'Marie Laurent',
      role: 'Secrétaire générale',
      description: 'Passionnée par l\'éducation et le développement durable.',
      imageUrl: '/images/team/marie.jpg'
    }
  ];

  // Données des projets (exemples New Horizon)
  const projects = [
    {
      title: 'Erasmus+ Jeunesse – « Horizon Europe »',
      slug: 'erasmus-horizon-europe',
      description: 'Mobilité de 20 jeunes de quartiers prioritaires vers l\'Espagne pour un échange interculturel de 10 jours.',
      content: `# Erasmus+ « Horizon Europe »

Ce projet permet à vingt jeunes de **Strasbourg** de partir à Valence pour découvrir d\'autres cultures, développer leurs compétences linguistiques et sociales.

## Objectifs
- Favoriser l\'ouverture culturelle.
- Développer l\'autonomie et la confiance.

## Activités
- Ateliers de cuisine internationale.
- Jeux brise-glace.
- Visites culturelles.

## Impact attendu
85 % des participants déclarent vouloir s\'engager bénévolement après le séjour.
`,
      image: '/images/projects/erasmus.jpg',
      category: 'Mobilité',
      status: 'active',
      location: 'Valence, Espagne',
      volunteers: 4,
      beneficiaries: 20,
      tags: JSON.stringify(['jeunesse', 'europe']),
      startDate: new Date('2024-07-15'),
    },
    {
      title: 'Corps Européen de Solidarité – « Green City »',
      slug: 'ces-green-city',
      description: 'Parcours de volontariat écologique de 6 mois pour sensibiliser aux enjeux climatiques.',
      content: `# Volontariat « Green City »

Six volontaires européens s\'engagent dans des actions de **reforestation urbaine** et d\'éducation à l\'environnement.
`,
      image: '/images/projects/green-city.jpg',
      category: 'Environnement',
      status: 'active',
      location: 'Strasbourg',
      volunteers: 6,
      beneficiaries: 300,
      tags: JSON.stringify(['écologie', 'volontariat']),
      startDate: new Date('2024-03-01'),
    }
  ];

  // Données du blog (exemples)
  const blogPosts = [
    {
      title: '5 conseils pour préparer son premier échange Erasmus',
      slug: '5-conseils-erasmus',
      excerpt: 'Tout ce qu\'il faut savoir pour vivre une mobilité réussie avec New Horizon.',
      content: `# Se lancer dans l\'aventure Erasmus

Partir à l\'étranger peut faire peur, mais avec une bonne préparation, c\'est la clé du succès !`,
      image: '/images/blog/conseils-erasmus.jpg',
      category: 'Mobilité',
      tags: JSON.stringify(['erasmus', 'tips']),
      author: 'Léa Schneider',
      authorRole: 'Coordinatrice mobilité',
      readTime: 4,
      published: true,
      publishedAt: new Date('2024-06-01'),
    },
    {
      title: 'L\'impact de l\'éducation non formelle',
      slug: 'impact-education-non-formelle',
      excerpt: 'Pourquoi apprendre en dehors de la salle de classe change la donne ?',
      content: '## L\'éducation non formelle, un levier d\'émancipation…',
      image: '/images/blog/education-nf.jpg',
      category: 'Éducation',
      tags: JSON.stringify(['éducation', 'innovation']),
      author: 'Karim Benali',
      authorRole: 'Formateur',
      readTime: 6,
      published: true,
      publishedAt: new Date('2024-05-20'),
    }
  ];

  // Insertion des données
  console.log('Début de l\'insertion des données...');

  // Insertion des membres de l'équipe
  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: member
    });
  }
  console.log('Membres de l\'équipe insérés');

  // Insertion des projets
  for (const project of projects) {
    await prisma.project.create({
      data: project
    });
  }
  console.log('Projets insérés');

  // Insertion des articles de blog
  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post
    });
  }
  console.log('Articles de blog insérés');

  console.log('Insertion des données terminée !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
*/ 