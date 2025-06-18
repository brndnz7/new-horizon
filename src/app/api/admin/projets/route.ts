import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function GET() {
  try {
    // Vérifier si Prisma est disponible
    if (!prisma) {
      console.warn('Prisma not available, using fallback data');
      const projectsData = await import('../../../../../data/projets.json').then(m => m.default);
      return NextResponse.json(projectsData);
    }
    
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    // Transformer les données pour le frontend seulement si c'est de Prisma
    const transformedProjects = projects.map((project: any) => ({
      ...project,
      tags: typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags,
      startDate: project.startDate?.toISOString ? project.startDate.toISOString() : project.startDate,
      endDate: project.endDate?.toISOString ? project.endDate.toISOString() : project.endDate
    }))
    
    return NextResponse.json(transformedProjects)
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    // Fallback vers les données JSON
    try {
      const projectsData = await import('../../../../../data/projets.json').then(m => m.default);
      return NextResponse.json(projectsData);
    } catch (fallbackError) {
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des projets' },
        { status: 500 }
      )
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: data.description,
        content: data.content,
        image: data.image,
        category: data.category,
        status: data.status || 'active',
        location: data.location || 'Strasbourg, France',
        volunteers: data.volunteers || 0,
        beneficiaries: data.beneficiaries || 0,
        budget: data.budget || 0,
        raised: data.raised || 0,
        progress: data.progress || 0,
        tags: JSON.stringify(data.tags || []),
        startDate: new Date(data.startDate || new Date()),
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
    console.error('Erreur lors de la création du projet:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    )
  }
} 