'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '@/components/Button'
import Card, { CardContent } from '@/components/Card'
import ImageUpload from '@/components/ImageUpload'
import { useToast } from '@/components/Toast'

interface TeamMember {
  id: number
  name: string
  role: string
  description: string
  imageUrl: string | null
}

export default function AdminEquipePage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { showToast, ToastComponent } = useToast()

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminLoggedIn')
    if (adminAuth !== 'true') {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
    fetchMembers()
  }, [router])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/equipe')
      if (response.ok) {
        const data = await response.json()
        console.log('📥 Données reçues de l\'API:', data)
        
        const mapped = data.map((m: any) => {
          console.log('👤 Membre individuel:', m)
          return {
            id: m.id,
            name: m.name,
            role: m.role,
            description: m.description,
            imageUrl: m.imageUrl || '',
            email: m.email || '',
            specialties: m.specialties || [],
            joinedAt: m.joinedAt || new Date().toISOString(),
            quote: m.quote || '',
            social: m.social || {}
          }
        })
        console.log('🔄 Données mappées:', mapped)
        setMembers(mapped)
      } else {
        throw new Error('Erreur lors du chargement des membres')
      }
    } catch (error) {
      console.error('Erreur lors du chargement des membres:', error)
      alert('Erreur lors du chargement des membres')
    } finally {
      setLoading(false)
    }
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member)
    setIsEditing(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      try {
        const response = await fetch(`/api/admin/equipe?id=${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          await fetchMembers() // Recharger la liste
          showToast('Membre supprimé avec succès !', 'success')
        } else {
          showToast('Erreur lors de la suppression', 'error')
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        showToast('Erreur lors de la suppression', 'error')
      }
    }
  }

  const handleSave = async (updatedMember: TeamMember) => {
    console.log('💾 Sauvegarde membre:', updatedMember);
    setIsSaving(true);
    try {
      const payload = {
        id: updatedMember.id,
        name: updatedMember.name,
        role: updatedMember.role,
        description: updatedMember.description,
        imageUrl: updatedMember.imageUrl
      };
      console.log('📤 Données envoyées:', payload);
      
      const response = await fetch('/api/admin/equipe', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      console.log('📥 Réponse API:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Sauvegarde réussie:', result);
        await fetchMembers() // Recharger la liste
        setIsEditing(false)
        setSelectedMember(null)
        showToast('Modifications sauvegardées avec succès !', 'success')
      } else {
        const errorText = await response.text();
        console.error('❌ Erreur API:', errorText);
        showToast(`Erreur lors de la sauvegarde: ${errorText}`, 'error')
      }
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error)
      showToast(`Erreur lors de la sauvegarde: ${error}`, 'error')
    } finally {
      setIsSaving(false);
    }
  }

  const handleCreateMember = async (newMember: TeamMember) => {
    try {
      const response = await fetch('/api/admin/equipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newMember.name,
          role: newMember.role,
          description: newMember.description,
          imageUrl: newMember.imageUrl
        })
      })
      
      if (response.ok) {
        await fetchMembers() // Recharger la liste
        setIsEditing(false)
        setSelectedMember(null)
        showToast('Nouveau membre ajouté avec succès !', 'success')
      } else {
        showToast('Erreur lors de l\'ajout', 'error')
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error)
      showToast('Erreur lors de l\'ajout', 'error')
    }
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-xl">{loading ? 'Chargement...' : 'Authentification...'}</div>
      </div>
    )
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
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Gestion de l'équipe</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{members.length} membres</p>
              </div>
            </div>
            <Button 
              onClick={() => {
                const newMember: TeamMember = {
                  id: 0,
                  name: '',
                  role: '',
                  description: '',
                  imageUrl: ''
                }
                setSelectedMember(newMember)
                setIsEditing(true)
              }} 
              className="bg-blue-500 hover:bg-blue-600"
            >
              ➕ Ajouter un membre
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un membre par nom ou rôle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Liste des membres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-16">
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 80px, 80px"
                        className="object-cover rounded-full"
                        onError={(e) => {
                          console.error('❌ Erreur chargement image:', member.imageUrl);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-neutral-500">
                        📷
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{member.name}</h3>
                    <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">{member.role}</p>
                  </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-3">
                  {member.description}
                </p>

                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleEdit(member)}
                    variant="outline" 
                    className="flex-1 text-sm"
                  >
                    ✏️ Modifier
                  </Button>
                  <Button 
                    onClick={() => handleDelete(member.id)}
                    variant="outline" 
                    className="text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    🗑️
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Aucun membre trouvé</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Essayez de modifier votre recherche ou ajoutez un nouveau membre.
            </p>
            <Button onClick={() => {
              const newMember: TeamMember = {
                id: 0,
                name: '',
                role: '',
                description: '',
                imageUrl: ''
              }
              setSelectedMember(newMember)
              setIsEditing(true)
            }}>
              Ajouter un membre
            </Button>
          </div>
        )}
      </main>

      {/* Modal d'édition */}
      {isEditing && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {selectedMember.id === 0 ? 'Nouveau membre' : `Modifier ${selectedMember.name}`}
              </h2>
              <Button 
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="text-sm"
              >
                ✕ Fermer
              </Button>
            </div>

            <EditMemberForm 
              member={selectedMember}
              onSave={selectedMember?.id === 0 ? handleCreateMember : handleSave}
              onCancel={() => setIsEditing(false)}
              isSaving={isSaving}
            />
          </div>
        </div>
      )}
      
      {/* Toast notifications */}
      <ToastComponent />
    </div>
  )
}

// Composant formulaire d'édition
function EditMemberForm({ 
  member, 
  onSave, 
  onCancel,
  isSaving = false
}: { 
  member: TeamMember
  onSave: (member: TeamMember) => void
  onCancel: () => void
  isSaving?: boolean
}) {
  const [formData, setFormData] = useState<TeamMember>(member)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🚀 Formulaire soumis avec données:', formData)
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Nom complet
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Rôle/Poste
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <ImageUpload
          label="Photo du membre"
          value={formData.imageUrl || ''}
          onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
          placeholder="Glissez la photo du membre ici ou cliquez pour sélectionner"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <Button type="button" onClick={onCancel} variant="outline">
          Annuler
        </Button>
        <Button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sauvegarde...
            </>
          ) : (
            <>💾 Sauvegarder</>
          )}
        </Button>
      </div>
    </form>
  )
} 