import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const id = parseInt(params.id)
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        image: data.image,
        category: data.category,
        status: data.status,
        location: data.location,
        volunteers: data.volunteers,
        beneficiaries: data.beneficiaries,
        budget: data.budget,
        raised: data.raised,
        progress: data.progress,
        tags: JSON.stringify(data.tags),
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null
      }
    })
    
    return NextResponse.json({
      ...project,
      tags: JSON.parse(project.tags),
      startDate: project.startDate.toISOString(),
      endDate: project.endDate?.toISOString() || null
    })
  } catch (error) {
    console.error('Erreur lors de la modification du projet:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la modification du projet' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    await prisma.project.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    )
  }
} 