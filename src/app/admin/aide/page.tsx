'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Card, { CardContent } from '@/components/Card'

export default function AdminAidePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started')
  const router = useRouter()

  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_auth')
    if (adminAuth !== 'authenticated') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const sections = [
    {
      id: 'getting-started',
      title: '🚀 Premiers pas',
      content: (
        <div className="space-y-4">
          <p>Bienvenue dans l'interface d'administration de votre site web ! Cette interface vous permet de modifier facilement le contenu sans connaissances techniques.</p>
          
          <h4 className="font-semibold text-lg">Comment ça marche ?</h4>
          <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
            <li>Connectez-vous avec votre mot de passe</li>
            <li>Choisissez ce que vous voulez modifier (équipe, projets, etc.)</li>
            <li>Remplissez les formulaires comme dans Word</li>
            <li>Cliquez sur "Sauvegarder" - c'est tout !</li>
          </ol>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>💡 Astuce :</strong> Toutes vos modifications sont automatiquement sauvegardées. Pas de risque de perdre votre travail !
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'team',
      title: '👥 Gérer l\'équipe',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Ajouter un nouveau membre :</h4>
          <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
            <li>Allez dans "Équipe" depuis le tableau de bord</li>
            <li>Cliquez sur "➕ Ajouter un membre"</li>
            <li>Remplissez le nom, rôle, email, description</li>
            <li>Ajoutez une photo (copiez l'adresse d'une image du web)</li>
            <li>Ajoutez les spécialités une par une</li>
            <li>Sauvegardez !</li>
          </ol>

          <h4 className="font-semibold text-lg">Modifier un membre existant :</h4>
          <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
            <li>Trouvez le membre dans la liste</li>
            <li>Cliquez sur "✏️ Modifier"</li>
            <li>Changez ce que vous voulez</li>
            <li>Sauvegardez</li>
          </ol>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>⚠️ Important :</strong> Pour les photos, utilisez des images de bonne qualité (minimum 200x200 pixels). Vous pouvez prendre les photos sur Unsplash.com par exemple.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'projects',
      title: '📋 Gérer les projets',
      content: (
        <div className="space-y-4">
          <p>Les projets sont vos programmes et actions principales. Ils apparaissent sur la page d'accueil et la page projets.</p>
          
          <h4 className="font-semibold text-lg">Créer un nouveau projet :</h4>
          <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
            <li>Cliquez sur "Projets" puis "➕ Créer un projet"</li>
            <li>Donnez un titre accrocheur (ex: "Erasmus+ pour tous")</li>
            <li>Choisissez une catégorie (Erasmus+, CES, Formation...)</li>
            <li>Écrivez une description courte et claire</li>
            <li>Ajoutez une image représentative</li>
            <li>Indiquez le nombre de bénévoles et bénéficiaires</li>
            <li>Rédigez le contenu détaillé</li>
          </ol>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-green-800 dark:text-green-200">
              <strong>✅ Conseil :</strong> Utilisez des chiffres concrets (nombre de participants, durée, budget) pour crédibiliser vos projets.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'blog',
      title: '📝 Publier des actualités',
      content: (
        <div className="space-y-4">
          <p>Le blog vous permet de partager vos actualités, témoignages et événements.</p>
          
          <h4 className="font-semibold text-lg">Écrire un nouvel article :</h4>
          <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-300">
            <li>Allez dans "Blog" puis "➕ Nouvel article"</li>
            <li>Rédigez un titre qui donne envie de lire</li>
            <li>Choisissez une catégorie (Actualités, Témoignages, Événements...)</li>
            <li>Écrivez un résumé de 1-2 phrases</li>
            <li>Rédigez votre article (comme dans Word)</li>
            <li>Ajoutez une image d'illustration</li>
            <li>Programmez la publication</li>
          </ol>

          <h4 className="font-semibold text-lg">Idées d'articles :</h4>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300">
            <li>Témoignages de participants</li>
            <li>Retours de missions européennes</li>
            <li>Annonces d'événements</li>
            <li>Présentation de nouveaux projets</li>
            <li>Actualités européennes</li>
          </ul>
        </div>
      )
    },
    {
      id: 'settings',
      title: '⚙️ Paramètres généraux',
      content: (
        <div className="space-y-4">
          <p>Cette section vous permet de modifier les informations de base de votre association.</p>
          
          <h4 className="font-semibold text-lg">Ce que vous pouvez modifier :</h4>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300">
            <li><strong>Informations générales :</strong> nom, slogan, description</li>
            <li><strong>Coordonnées :</strong> adresse, téléphone, email</li>
            <li><strong>Statistiques :</strong> nombre de membres, bénéficiaires, projets</li>
            <li><strong>Réseaux sociaux :</strong> liens Facebook, LinkedIn, Instagram</li>
            <li><strong>Horaires :</strong> heures d'ouverture, permanences</li>
          </ul>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-800 dark:text-red-200">
              <strong>🔐 Sécurité :</strong> Ces informations apparaissent sur votre site public. Vérifiez bien avant de sauvegarder.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'tips',
      title: '💡 Conseils pratiques',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Pour ajouter des images :</h4>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300">
            <li><strong>Méthode 1 :</strong> Glissez directement votre image dans la zone prévue</li>
            <li><strong>Méthode 2 :</strong> Cliquez sur la zone pour sélectionner un fichier</li>
            <li><strong>Méthode 3 :</strong> Utilisez l'option "Ou saisir une URL" pour coller un lien d'image</li>
            <li>Formats acceptés : JPG, PNG, WEBP, GIF (max 5MB)</li>
            <li>Pour des photos libres : <a href="https://unsplash.com" target="_blank" className="text-blue-600 hover:underline">Unsplash.com</a>, recherchez "european youth", "diversity", "teamwork"</li>
          </ul>

          <h4 className="font-semibold text-lg">Pour bien écrire :</h4>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300">
            <li>Utilisez des phrases courtes et claires</li>
            <li>Mettez en avant les bénéfices pour les participants</li>
            <li>Ajoutez des chiffres concrets quand possible</li>
            <li>Relisez-vous avant de publier</li>
          </ul>

          <h4 className="font-semibold text-lg">Fréquence de mise à jour :</h4>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300">
            <li><strong>Blog :</strong> 1-2 articles par mois minimum</li>
            <li><strong>Équipe :</strong> quand il y a des changements</li>
            <li><strong>Projets :</strong> mettre à jour les chiffres régulièrement</li>
            <li><strong>Statistiques :</strong> une fois par trimestre</li>
          </ul>
        </div>
      )
    },
    {
      id: 'help',
      title: '🆘 Besoin d\'aide ?',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Problèmes courants :</h4>
          
          <div className="space-y-3">
            <div>
              <strong>❓ "Je n'arrive pas à ajouter une photo"</strong>
              <p className="text-neutral-600 dark:text-neutral-300">Vérifiez que l'adresse commence par "https://" et finit par ".jpg" ou ".png"</p>
            </div>
            
            <div>
              <strong>❓ "Mes modifications n'apparaissent pas"</strong>
              <p className="text-neutral-600 dark:text-neutral-300">Rafraîchissez la page de votre site (F5) ou videz le cache de votre navigateur</p>
            </div>
            
            <div>
              <strong>❓ "J'ai fait une erreur, comment annuler ?"</strong>
              <p className="text-neutral-600 dark:text-neutral-300">Retournez dans la section concernée et corrigez. Vous pouvez toujours modifier vos contenus</p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200">📞 Support technique</h4>
            <p className="text-purple-800 dark:text-purple-200">
              En cas de problème technique, contactez votre administrateur web :<br/>
              <strong>Email :</strong> support@votre-developpeur.com<br/>
              <strong>Téléphone :</strong> 06 XX XX XX XX
            </p>
          </div>
        </div>
      )
    }
  ]

  if (!isAuthenticated) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button 
                onClick={() => router.push('/admin')} 
                variant="outline" 
                className="text-sm"
              >
                ← Retour au dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Guide d'utilisation</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Comment utiliser votre interface d'administration</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Guide d'utilisation simple
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Tout ce que vous devez savoir pour gérer facilement le contenu de votre site web, 
            expliqué en termes simples et avec des exemples pratiques.
          </p>
        </div>

        {/* Sections d'aide */}
        <div className="space-y-4">
          {sections.map((section) => (
            <Card key={section.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full p-6 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {section.title}
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-neutral-400 transform transition-transform ${
                      expandedSection === section.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedSection === section.id && (
                <CardContent className="px-6 pb-6">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {section.content}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
            Prêt à commencer ?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => router.push('/admin/equipe')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              👥 Gérer l'équipe
            </Button>
            <Button 
              onClick={() => router.push('/admin/projets')}
              className="bg-green-500 hover:bg-green-600"
            >
              📋 Gérer les projets
            </Button>
            <Button 
              onClick={() => router.push('/admin/blog')}
              className="bg-purple-500 hover:bg-purple-600"
            >
              📝 Écrire un article
            </Button>
            <Button 
              onClick={() => router.push('/admin/parametres')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              ⚙️ Paramètres
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 