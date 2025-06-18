import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function GET() {
  try {
    // Vérifier si Prisma est disponible
    if (!prisma) {
      console.warn('Prisma not available, using fallback data');
      const blogData = await import('../../../../../data/blog.json').then(m => m.default);
      return NextResponse.json(blogData);
    }
    
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    // Transformer les données pour le frontend seulement si c'est de Prisma
    const transformedPosts = posts.map((post: any) => ({
      ...post,
      publishedAt: post.publishedAt?.toISOString ? post.publishedAt.toISOString() : post.publishedAt,
      createdAt: post.createdAt?.toISOString ? post.createdAt.toISOString() : post.createdAt,
      updatedAt: post.updatedAt?.toISOString ? post.updatedAt.toISOString() : post.updatedAt
    }))
    
    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    // Fallback vers les données JSON
    try {
      const blogData = await import('../../../../../data/blog.json').then(m => m.default);
      return NextResponse.json(blogData);
    } catch (fallbackError) {
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des articles' },
        { status: 500 }
      )
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        category: data.category,
        author: data.author,
        authorRole: data.authorRole,
        readTime: data.readTime || 5,
        published: data.published || false,
        publishedAt: data.published ? new Date() : null
      }
    })
    
    return NextResponse.json({
      ...post,
      publishedAt: post.publishedAt?.toISOString() || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    })
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    )
  }
} 