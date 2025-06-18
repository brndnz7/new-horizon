import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany()
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des membres" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        description: data.description,
        imageUrl: data.imageUrl,
      },
    })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création du membre" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('🔄 API PUT - Données reçues:', data)
    
    const member = await prisma.teamMember.update({
      where: { id: data.id },
      data: {
        name: data.name,
        role: data.role,
        description: data.description,
        imageUrl: data.imageUrl,
      },
    })
    
    console.log('✅ API PUT - Membre mis à jour:', member)
    return NextResponse.json(member)
  } catch (error) {
    console.error('❌ API PUT - Erreur:', error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour du membre" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '')
    
    await prisma.teamMember.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: "Membre supprimé avec succès" })
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression du membre" }, { status: 500 })
  }
} 