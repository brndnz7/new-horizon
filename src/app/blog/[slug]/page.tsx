import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import Card, { CardContent } from '@/components/Card';
import Button from '@/components/Button';
// TEMPORAIREMENT DÉSACTIVÉ: import { prisma } from '@/lib/prisma';
// FALLBACK pour le développement: import blogData from '@/data/blog.json';

interface PageProps {
  params: {
    slug: string;
  };
}

// Fonction pour convertir le markdown basique en HTML
function renderMarkdown(content: string) {
  return content
    .split('\n')
    .map((line) => {
      // Titres
      if (line.startsWith('# ')) {
        return `<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">${line.slice(2)}</h1>`;
      }
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">${line.slice(3)}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">${line.slice(4)}</h3>`;
      }
      
      // Listes
      if (line.startsWith('- ')) {
        return `<li class="text-gray-600 dark:text-gray-300 mb-1 ml-4">${line.slice(2)}</li>`;
      }
      
      // Texte gras
      if (line.includes('**')) {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');
      }
      
      // Texte italique
      if (line.includes('*')) {
        line = line.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
      }
      
      // Paragraphes
      if (line.trim() === '') {
        return '<br>';
      }
      
      if (!line.startsWith('<') && line.trim() !== '') {
        return `<p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">${line}</p>`;
      }
      
      return line;
    })
    .join('\n');
}

// Fonction pour formater les dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  // TEMPORAIREMENT: utiliser JSON jusqu'à ce que la base Supabase soit prête
  // TODO: restaurer Prisma une fois les tables créées
  const blogData = await import('@/data/blog.json').then(m => m.default);
  const article = blogData.find(post => post.slug === params.slug);

  if (!article) {
    notFound();
  }

  const otherArticles = blogData
    .filter(post => post.slug !== params.slug)
    .slice(0, 3);

  // @ts-ignore
  article.tags = article.tags || [];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {article.readTime} min de lecture
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
              <span className="text-primary-600 dark:text-primary-300 font-semibold">
                {article.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="text-left">
              <div className="font-medium text-neutral-900 dark:text-white">
                {article.author}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {article.authorRole} • {formatDate(article.publishedAt)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Image principale */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200 pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Section>

      {/* Contenu de l'article */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-3">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ 
                  __html: renderMarkdown(article.content) 
                }}
              />
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Partage */}
              <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Partager cet article</h3>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                    className="text-sm"
                  >
                    Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    className="text-sm"
                  >
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    className="text-sm"
                  >
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">À propos de l'auteur</h3>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-300 font-semibold">
                          {article.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900 dark:text-white">
                          {article.author}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {article.authorRole}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" href="/equipe" className="w-full text-sm">
                      Voir l'équipe
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Catégorie</h3>
                    <span className="bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm">
                      {article.category}
                    </span>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Nous soutenir</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      Votre soutien nous permet de continuer nos actions.
                    </p>
                                <Button href="/contact" className="w-full">
              Nous rejoindre
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Articles suggérés */}
      {otherArticles.length > 0 && (
        <Section className="bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              À lire aussi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherArticles.map((otherArticle) => (
                <Card key={otherArticle.id} className="group hover-lift">
                  <div className="relative h-48">
                    <Image
                      src={otherArticle.image}
                      alt={otherArticle.title}
                      fill
                      className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                      {formatDate(otherArticle.publishedAt)}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                      {otherArticle.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-2">
                      {otherArticle.excerpt}
                    </p>
                    <Link
                      href={`/blog/${otherArticle.slug}`}
                      className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
                    >
                      Lire l'article →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button href="/blog" variant="outline">
                Voir tous les articles
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

export async function generateStaticParams() {
  // TEMPORAIREMENT: utiliser JSON jusqu'à ce que la base Supabase soit prête
  const blogData = await import('@/data/blog.json').then(m => m.default);
  return blogData.map(article => ({ slug: article.slug }));
} 