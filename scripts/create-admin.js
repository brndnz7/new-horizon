const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('🔄 Création de l\'utilisateur admin...')

    // Supprimer l'admin existant s'il existe
    try {
      await prisma.user.delete({
        where: { username: 'admin' }
      })
      console.log('🗑️ Ancien admin supprimé')
    } catch (e) {
      // Pas grave si n'existe pas
    }

    // Créer l'utilisateur admin
    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        password: 'NewHorizon2024!', // En production, utiliser bcrypt pour hasher
        role: 'admin',
        name: 'Administrateur',
        email: 'admin@newhorizon.org',
        active: true
      }
    })

    console.log('✅ Utilisateur admin créé avec succès!')
    console.log(`   - Nom d'utilisateur: ${admin.username}`)
    console.log(`   - Mot de passe: NewHorizon2024!`)
    console.log(`   - Rôle: ${admin.role}`)
    console.log(`   - Email: ${admin.email}`)

  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'admin:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin() 