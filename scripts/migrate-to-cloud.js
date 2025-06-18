const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Charger les données JSON existantes
const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/blog.json'), 'utf8'));
const projectsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/projets.json'), 'utf8'));
const teamData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/equipe.json'), 'utf8'));

async function migrateToCloud() {
  console.log('🚀 Migration vers la base cloud...');
  
  // Utiliser la base de données cloud (DATABASE_URL dans .env)
  const prisma = new PrismaClient();
  
  try {
    // Migrer les articles de blog
    console.log('📝 Migration des articles de blog...');
    for (const post of blogData) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: post,
        create: post
      });
    }
    
    // Migrer les projets
    console.log('📋 Migration des projets...');
    for (const project of projectsData) {
      await prisma.project.upsert({
        where: { slug: project.slug },
        update: project,
        create: project
      });
    }
    
    // Migrer les membres de l'équipe
    console.log('👥 Migration des membres de l\'équipe...');
    for (const member of teamData) {
      await prisma.teamMember.upsert({
        where: { id: member.id },
        update: member,
        create: member
      });
    }
    
    console.log('✅ Migration terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la migration
migrateToCloud(); 