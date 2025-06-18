'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Card, { CardContent } from '@/components/Card'

interface AssociationSettings {
  name: string
  tagline: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  socialMedia: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
  statistics: {
    members: number
    beneficiaries: number
    projects: number
    yearsActive: number
  }
  hours: {
    weekdays: string
    weekends: string
    special: string
  }
}

export default function AdminParametresPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const [settings, setSettings] = useState<AssociationSettings>({
    name: 'New Horizon',
    tagline: 'Ouvrir de nouveaux horizons ensemble',
    description: 'Association à but non lucratif basée à Strasbourg, œuvrant pour une société plus inclusive, solidaire et ouverte sur le monde.',
    address: '15 Rue de la Krutenau, 67000 Strasbourg',
    phone: '03 88 36 25 47',
    email: 'contact@newhorizon-strasbourg.org',
    website: 'https://newhorizon-strasbourg.org',
    socialMedia: {
      facebook: 'https://facebook.com/newhorizonstrasbourg',
      linkedin: 'https://linkedin.com/company/new-horizon-strasbourg',
      instagram: 'https://instagram.com/newhorizonstrasbourg'
    },
    statistics: {
      members: 8,
      beneficiaries: 650,
      projects: 6,
      yearsActive: 6
    },
    hours: {
      weekdays: '9h - 18h',
      weekends: '10h - 16h (Samedi uniquement)',
      special: 'Permanence mardis 14h-17h'
    }
  })

  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_auth')
    if (adminAuth !== 'authenticated') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsSaving(false)
      alert('Paramètres sauvegardés ! (Dans la vraie version, cela se connectera à l\'API)')
    }, 1000)
  }

  const handleStatChange = (key: keyof AssociationSettings['statistics'], value: number) => {
    setSettings({
      ...settings,
      statistics: {
        ...settings.statistics,
        [key]: value
      }
    })
  }

  const handleSocialChange = (platform: keyof AssociationSettings['socialMedia'], value: string) => {
    setSettings({
      ...settings,
      socialMedia: {
        ...settings.socialMedia,
        [platform]: value
      }
    })
  }

  const handleHoursChange = (key: keyof AssociationSettings['hours'], value: string) => {
    setSettings({
      ...settings,
      hours: {
        ...settings.hours,
        [key]: value
      }
    })
  }

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
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Paramètres généraux</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Informations de l'association</p>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-500 hover:bg-green-600"
            >
              {isSaving ? '💾 Sauvegarde...' : '💾 Sauvegarder tout'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Informations générales */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                🏢 Informations générales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Nom de l'association
                  </label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Slogan/Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Description
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                📞 Coordonnées
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Adresse complète
                  </label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                📊 Statistiques principales
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Membres de l'équipe
                  </label>
                  <input
                    type="number"
                    value={settings.statistics.members}
                    onChange={(e) => handleStatChange('members', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Bénéficiaires
                  </label>
                  <input
                    type="number"
                    value={settings.statistics.beneficiaries}
                    onChange={(e) => handleStatChange('beneficiaries', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Projets actifs
                  </label>
                  <input
                    type="number"
                    value={settings.statistics.projects}
                    onChange={(e) => handleStatChange('projects', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Années d'activité
                  </label>
                  <input
                    type="number"
                    value={settings.statistics.yearsActive}
                    onChange={(e) => handleStatChange('yearsActive', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-bold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Réseaux sociaux */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                🌐 Réseaux sociaux
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    🔵 Facebook
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.facebook || ''}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/votreassociation"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    💼 LinkedIn
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.linkedin || ''}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/votreassociation"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    📷 Instagram
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.instagram || ''}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/votreassociation"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    🐦 Twitter
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.twitter || ''}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/votreassociation"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horaires */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                🕒 Horaires d'ouverture
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Lundi - Vendredi
                  </label>
                  <input
                    type="text"
                    value={settings.hours.weekdays}
                    onChange={(e) => handleHoursChange('weekdays', e.target.value)}
                    placeholder="Ex: 9h - 18h"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Week-end
                  </label>
                  <input
                    type="text"
                    value={settings.hours.weekends}
                    onChange={(e) => handleHoursChange('weekends', e.target.value)}
                    placeholder="Ex: 10h - 16h (Samedi uniquement)"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Horaires spéciaux/Permanences
                  </label>
                  <input
                    type="text"
                    value={settings.hours.special}
                    onChange={(e) => handleHoursChange('special', e.target.value)}
                    placeholder="Ex: Permanence mardis 14h-17h"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bouton de sauvegarde finale */}
          <div className="text-center">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-lg px-8 py-4"
            >
              {isSaving ? '💾 Sauvegarde en cours...' : '💾 Sauvegarder tous les paramètres'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 