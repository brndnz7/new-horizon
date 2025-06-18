'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Section, { SectionHeader } from '@/components/Section';
import Card, { CardContent } from '@/components/Card';
import Button from '@/components/Button';
import { useLanguage } from '@/hooks/useLanguage';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  status: string;
  location: string;
  volunteers: number;
  beneficiaries: number;
  budget: number;
  raised: number;
  progress: number;
  tags: string[];
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/admin/projets');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
            {t('common.loading')}
          </p>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            {error}
          </p>
        </div>
      </Section>
    );
  }

  // Calculer les statistiques à partir des données réelles
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalVolunteers = projects.reduce((sum, p) => sum + p.volunteers, 0);
  const totalBeneficiaries = projects.reduce((sum, p) => sum + p.beneficiaries, 0);
  const yearsExperience = Math.max(1, Math.floor((Date.now() - new Date(projects[0]?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24 * 365)));

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>
      </Section>

      {/* Statistiques */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{activeProjects}</div>
            <div className="text-neutral-600 dark:text-neutral-400">{t('projects.stats.active_projects')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{totalVolunteers}</div>
            <div className="text-neutral-600 dark:text-neutral-400">{t('projects.stats.volunteers')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{totalBeneficiaries}+</div>
            <div className="text-neutral-600 dark:text-neutral-400">{t('projects.stats.beneficiaries')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{yearsExperience}</div>
            <div className="text-neutral-600 dark:text-neutral-400">{t('projects.stats.years_experience')}</div>
          </div>
        </div>
      </Section>

      {/* Liste des projets */}
      <Section className="bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
        <SectionHeader 
          title={t('projects.list.title')} 
          subtitle={t('projects.list.subtitle')}
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="h-full flex flex-col group hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {project.status === 'active' ? t('projects.status.active') : t('projects.status.paused')}
                  </span>
                </div>
              </div>
              <CardContent className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-1">
                  {project.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                    </svg>
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12L10 14L16 8"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
                    </svg>
                    {t('projects.since')} {new Date(project.startDate).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{project.volunteers}</div>
                    <div className="text-xs text-gray-600">{t('projects.info.volunteers')}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{project.beneficiaries}</div>
                    <div className="text-xs text-gray-600">{t('projects.info.beneficiaries')}</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" href={`/projets/${project.slug}`}>
                  {t('common.learn_more')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Domaines d'action */}
      <Section className="bg-white">
        <SectionHeader 
          title={t('projects.domains.title')} 
          subtitle={t('projects.domains.subtitle')}
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('projects.domains.solidarity.title')}</h3>
            <p className="text-gray-600">
              {t('projects.domains.solidarity.description')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                <path d="M2 17L12 22L22 17"/>
                <path d="M2 12L12 17L22 12"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('projects.domains.education.title')}</h3>
            <p className="text-gray-600">
              {t('projects.domains.education.description')}
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6.5L12 8L9 6.5V4L3 7V9L12 13L21 9Z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('projects.domains.environment.title')}</h3>
            <p className="text-gray-600">
              {t('projects.domains.environment.description')}
            </p>
          </div>
        </div>
      </Section>

      {/* Comment nous soutenir */}
      <Section className="bg-blue-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('projects.support.title')}
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            {t('projects.support.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" href="/contact">
              {t('projects.support.become_volunteer')}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600" href="/don">
              {t('projects.support.make_donation')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
} 