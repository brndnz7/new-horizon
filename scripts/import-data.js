const { PrismaClient } = require('../src/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function importData() {
  try {
    console.log('🔄 Importation des données...')

    // Importer l'équipe
    const equipeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/equipe.json'), 'utf8'))
    for (const member of equipeData) {
      await prisma.teamMember.upsert({
        where: { email: member.email },
        update: {
          name: member.name,
          role: member.role,
          description: member.description,
          image: member.image,
          specialties: JSON.stringify(member.specialties),
          quote: member.quote,
          linkedin: member.social?.linkedin,
          twitter: member.social?.twitter,
          joinedAt: new Date(member.joinedAt)
        },
        create: {
          name: member.name,
          role: member.role,
          description: member.description,
          image: member.image,
          email: member.email,
          specialties: JSON.stringify(member.specialties),
          quote: member.quote,
          linkedin: member.social?.linkedin,
          twitter: member.social?.twitter,
          joinedAt: new Date(member.joinedAt)
        }
      })
    }
    console.log('✅ Équipe importée')

    // Importer les projets
    const projetsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/projets.json'), 'utf8'))
    for (const project of projetsData) {
      const defaultStartDate = new Date('2024-01-01')
      await prisma.project.upsert({
        where: { slug: project.slug },
        update: {
          title: project.title,
          description: project.description,
          content: project.content,
          image: project.image,
          category: project.category,
          status: project.status || 'active',
          location: project.location || 'Strasbourg, France',
          volunteers: project.volunteers,
          beneficiaries: project.beneficiaries,
          budget: project.budget,
          raised: project.raised,
          progress: project.progress,
          tags: JSON.stringify(project.tags),
          startDate: project.startDate ? new Date(project.startDate) : defaultStartDate,
          endDate: project.endDate ? new Date(project.endDate) : null
        },
        create: {
          title: project.title,
          slug: project.slug,
          description: project.description,
          content: project.content,
          image: project.image,
          category: project.category,
          status: project.status || 'active',
          location: project.location || 'Strasbourg, France',
          volunteers: project.volunteers,
          beneficiaries: project.beneficiaries,
          budget: project.budget,
          raised: project.raised,
          progress: project.progress,
          tags: JSON.stringify(project.tags),
          startDate: project.startDate ? new Date(project.startDate) : defaultStartDate,
          endDate: project.endDate ? new Date(project.endDate) : null
        }
      })
    }
    console.log('✅ Projets importés')

    // Importer le blog
    const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/blog.json'), 'utf8'))
    for (const post of blogData) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          category: post.category,
          author: post.author,
          authorRole: post.authorRole,
          readTime: post.readTime,
          published: true,
          publishedAt: new Date(post.publishedAt)
        },
        create: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          category: post.category,
          author: post.author,
          authorRole: post.authorRole,
          readTime: post.readTime,
          published: true,
          publishedAt: new Date(post.publishedAt)
        }
      })
    }
    console.log('✅ Blog importé')

    console.log('🎉 Toutes les données ont été importées avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error)
  } finally {
    await prisma.$disconnect()
  }
}

importData() 