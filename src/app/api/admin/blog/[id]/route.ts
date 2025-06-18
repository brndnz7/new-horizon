import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const id = parseInt(params.id)
    
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        category: data.category,
        author: data.author,
        authorRole: data.authorRole,
        readTime: data.readTime,
        published: data.published,
        publishedAt: data.published && !data.publishedAt ? new Date() : 
                      data.published && data.publishedAt ? new Date(data.publishedAt) : null
      }
    })
    
    return NextResponse.json({
      ...post,
      publishedAt: post.publishedAt?.toISOString() || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    })
  } catch (error) {
    console.error('Erreur lors de la modification de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la modification de l\'article' },
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
    
    await prisma.blogPost.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Article supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'article' },
      { status: 500 }
    )
  }
} 