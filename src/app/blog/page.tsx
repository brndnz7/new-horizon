'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Section, { SectionHeader } from '@/components/Section';
import Card, { CardContent } from '@/components/Card';
import AnimatedSection from '@/components/AnimatedSection';
import { useLanguage } from '@/hooks/useLanguage';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

const fetchPosts = async (): Promise<BlogPost[]> => {
  const res = await fetch('/api/admin/blog', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

// Fonction pour formater les dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(data => {
        setArticles(data.filter(p => p.published));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Section>
        <p className="text-center">{t('common.loading')}</p>
      </Section>
    );
  }

  if (!articles.length) {
    return (
      <Section>
        <p className="text-center">{t('blog.no_articles')}</p>
      </Section>
    );
  }

  const [featuredArticle, ...otherArticles] = articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-200">
        <AnimatedSection>
          <SectionHeader 
            title={t('blog.title')} 
            subtitle={t('blog.subtitle')}
            centered
          />
        </AnimatedSection>
      </Section>

      {/* Article principal */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <AnimatedSection>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{t('blog.featured')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl hover-scale transition-transform duration-300"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <span>{formatDate(featuredArticle.publishedAt)}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime} {t('blog.read_time')}</span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-300 font-semibold">
                        {featuredArticle.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-white">
                        {featuredArticle.author}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {featuredArticle.authorRole}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredArticle.slug}`}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center group"
                  >
                    {t('blog.read_article')}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* Autres articles */}
      <Section className="bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
        <AnimatedSection>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{t('blog.all_articles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article, index) => (
              <AnimatedSection key={article.id} animation="scale-in" delay={index * 150}>
                <Card className="h-full flex flex-col group hover-lift">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-neutral-600 dark:text-neutral-400">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span>•</span>
                      <span>{article.readTime} {t('blog.read_time_short')}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-4 flex-1 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 dark:text-primary-300 text-xs font-semibold">
                            {article.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {article.author}
                        </div>
                      </div>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
                      >
                        {t('blog.read_more')} →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      {/* Call to Action */}
      <Section className="bg-primary-500 text-white">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t('blog.newsletter.title')}</h2>
            <p className="text-xl mb-8 text-primary-100">
              {t('blog.newsletter.description')}
            </p>
            <Link
              href="#newsletter"
              className="bg-white text-primary-500 hover:bg-primary-50 px-8 py-3 rounded-md font-semibold transition-colors inline-flex items-center"
            >
              {t('blog.newsletter.subscribe')}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
} 