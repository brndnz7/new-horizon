'use client';

import Image from "next/image";
import Link from 'next/link';
import Section, { SectionHeader } from '@/components/Section';
import Card, { CardContent } from '@/components/Card';
import Button from '@/components/Button';
import AnimatedSection from '@/components/AnimatedSection';
import SmoothAnimatedSection from '@/components/SmoothAnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import FloatingParticles from '@/components/FloatingParticles';
import TypewriterEffect from '@/components/TypewriterEffect';
import ProgressBar from '@/components/ProgressBar';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import InteractiveProjectCard from '@/components/InteractiveProjectCard';
import Newsletter from '@/components/Newsletter';
import { useLanguage } from '@/hooks/useLanguage';
import projetsData from '../../data/projets.json';

export default function Home() {
  const { t } = useLanguage();
  // Icônes SVG personnalisées
  const EuropeanIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );

  const ErasmusIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

  const InclusionIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const HorizonIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const EducationIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

  const MobilityIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ProjectIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );

  const HandshakeIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  // Données pour la timeline New Horizon
  const timelineEvents = [
    {
      year: "2018",
      title: "Création de New Horizon",
      description: "Fondation de l'association à Strasbourg par un groupe de jeunes européens passionnés par la mobilité et l'inclusion sociale.",
      icon: <HorizonIcon />,
      color: "primary" as const
    },
    {
      year: "2019",
      title: "Premier programme Erasmus+",
      description: "Lancement de notre premier projet Erasmus+ permettant à 20 jeunes de quartiers prioritaires de vivre une expérience européenne.",
      icon: <ErasmusIcon />,
      color: "secondary" as const
    },
    {
      year: "2020",
      title: "Adaptation et innovation",
      description: "Développement de formats hybrides pendant la pandémie, maintenant le lien avec nos bénéficiaires grâce au numérique.",
      icon: <EducationIcon />,
      color: "accent" as const
    },
    {
      year: "2021",
      title: "Corps Européen de Solidarité",
      description: "Devenir organisation d'accueil CES, accueillant nos premiers volontaires européens pour renforcer nos actions locales.",
      icon: <EuropeanIcon />,
      color: "success" as const
    },
    {
      year: "2022",
      title: "Expansion des services",
      description: "Ouverture du programme d'insertion professionnelle et des formations non formelles pour diversifier notre offre.",
      icon: <InclusionIcon />,
      color: "primary" as const
    },
    {
      year: "2024",
      title: "Nouveaux horizons",
      description: "Lancement de nos programmes d'autonomisation des femmes et d'échanges interculturels renforcés.",
      icon: <MobilityIcon />,
      color: "secondary" as const
    }
  ];

  const typewriterWords = t('home.hero.typewriter.words').split(',');

  return (
    <>
      {/* Hero Section New Horizon */}
      <Section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden transition-colors duration-200" container={false}>
        <FloatingParticles count={40} />
        
        {/* Formes géométriques décoratives - cachées sur mobile */}
        <div className="absolute top-20 right-10 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-accent-200 to-accent-300 rounded-lg opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            <AnimatedSection animation="fade-right" className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-success-500 rounded-full mr-2 sm:mr-3 animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200">{t('home.hero.badge')}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 dark:text-white leading-tight">
                  {t('home.hero.title.new')}{' '}
                  <span className="relative block sm:inline">
                    <TypewriterEffect 
                      words={typewriterWords}
                      className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-400 bg-clip-text text-transparent"
                    />
                  </span>
                  {' '}{t('home.hero.title.for_all')}
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                  {t('home.hero.description')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button 
                  size="lg" 
                  href="/contact" 
                  className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                >
                  <HandshakeIcon />
                  {t('home.hero.cta.join')}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  href="/projets" 
                  className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2"
                >
                  <ProjectIcon />
                  {t('home.hero.cta.discover')}
                </Button>
              </div>

              {/* Statistiques New Horizon */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                <AnimatedSection animation="fade-up" delay={100} className="text-center">
                  <AnimatedCounter end={85} suffix="+" className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-500" />
                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">{t('home.stats.young_people')}</div>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={150} className="text-center">
                  <AnimatedCounter end={650} className="text-xl sm:text-2xl lg:text-3xl font-bold text-success-500" />
                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">{t('home.stats.beneficiaries')}</div>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={200} className="text-center">
                  <AnimatedCounter end={6} className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent-500" />
                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">{t('home.stats.years')}</div>
                </AnimatedSection>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200} className="relative mt-8 lg:mt-0">
              <div className="relative">
                {/* Image principale avec effets */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800"
                    alt="Jeunes européens en échange interculturel"
                    width={600}
                    height={500}
                    className="object-cover w-full h-64 sm:h-80 lg:h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Cards flottantes - Réduites sur mobile */}
                <AnimatedSection animation="zoom-in" delay={600} className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-3 sm:p-4 border-gradient">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <ErasmusIcon />
                    </div>
                    <div>
                      <div className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">Erasmus+</div>
                      <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">Mobilité européenne</div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="zoom-in" delay={800} className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-3 sm:p-4 border-gradient">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-success-100 dark:bg-success-800 rounded-full flex items-center justify-center text-success-600 dark:text-success-400">
                      <InclusionIcon />
                    </div>
                    <div>
                      <div className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">Inclusion</div>
                      <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">Sociale & Solidaire</div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Section>

      {/* Section Impact New Horizon */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <AnimatedSection>
          <SectionHeader 
            title={t('home.impact.title')} 
            subtitle={t('home.impact.subtitle')}
            centered
          />
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AnimatedSection animation="fade-right">
            <div className="space-y-6 lg:space-y-8">
              <ProgressBar
                label={t('home.impact.european_mobility')}
                value={120}
                maxValue={150}
                color="primary"
                icon={<MobilityIcon />}
              />
              <ProgressBar
                label={t('home.impact.training_participants')}
                value={200}
                maxValue={250}
                color="success"
                icon={<EducationIcon />}
              />
              <ProgressBar
                label={t('home.impact.successful_insertions')}
                value={65}
                maxValue={85}
                color="accent"
                icon={<HorizonIcon />}
              />
              <ProgressBar
                label={t('home.impact.satisfaction')}
                value={94}
                maxValue={100}
                color="secondary"
                icon={<HeartIcon />}
                suffix="%"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-left" delay={200}>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white mb-4 lg:mb-6">
                {t('home.impact.why_choose.title')}
              </h3>
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start space-x-3 lg:space-x-4">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base text-neutral-900 dark:text-white">{t('home.impact.why_choose.support')}</h4>
                    <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-300">{t('home.impact.why_choose.support_desc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 lg:space-x-4">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base text-neutral-900 dark:text-white">{t('home.impact.why_choose.programs')}</h4>
                    <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-300">{t('home.impact.why_choose.programs_desc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 lg:space-x-4">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base text-neutral-900 dark:text-white">{t('home.impact.why_choose.inclusion')}</h4>
                    <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-300">{t('home.impact.why_choose.inclusion_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Timeline New Horizon */}
      <Section className="bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
        <AnimatedSection>
          <SectionHeader 
            title={t('home.history.title')} 
            subtitle={t('home.history.subtitle')}
            centered
          />
        </AnimatedSection>
        <InteractiveTimeline events={timelineEvents} className="max-w-6xl mx-auto" />
      </Section>

      {/* Projets avec cartes interactives */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <AnimatedSection>
          <SectionHeader 
            title={t('home.projects.title')} 
            subtitle={t('home.projects.subtitle')}
            centered
          />
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projetsData.slice(0, 6).map((project, index) => (
            <AnimatedSection key={project.id} animation="fade-up" delay={index * 100}>
              <InteractiveProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                volunteers={project.volunteers}
                beneficiaries={project.beneficiaries}
                progress={project.progress}
                budget={project.budget}
                raised={project.raised}
                slug={project.slug}
                tags={project.tags}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500}>
          <div className="text-center mt-8 lg:mt-12">
            <Button 
              size="lg" 
              href="/projets" 
              className="bg-gradient-to-r from-primary-500 to-secondary-400"
            >
              {t('home.projects.discover_all')}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </AnimatedSection>
      </Section>

      {/* Section témoignages adaptée */}
      <Section className="bg-gradient-to-br from-primary-500 to-secondary-400 text-white relative overflow-hidden">
        <FloatingParticles count={25} className="opacity-20" />
        
        <AnimatedSection>
          <SectionHeader 
            title={t('home.testimonials.title')} 
            subtitle={t('home.testimonials.subtitle')}
            centered
            className="text-white"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {[
            {
              name: "Amina Kada",
              role: "Participant Erasmus+ - Séjour en Allemagne",
              image: "https://images.unsplash.com/photo-1494790108755-2616b612b890?q=80&w=200",
              quote: "Grâce à New Horizon, j'ai pu faire un stage en Allemagne. Cette expérience a complètement changé ma vision de l'Europe et m'a aidée à trouver ma voie professionnelle.",
              rating: 5
            },
            {
              name: "Karim Belmokhtar",
              role: "Volontaire CES en Italie",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
              quote: "Mon volontariat européen m'a permis de développer ma confiance en moi et mes compétences. Aujourd'hui, je travaille dans une ONG européenne.",
              rating: 5
            },
            {
              name: "Sophie Muller",
              role: "Bénéficiaire programme insertion",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
              quote: "L'accompagnement personnalisé de New Horizon m'a permis de retrouver confiance et de créer ma propre entreprise. Une expérience transformatrice.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 150}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 hover-card">
                <div className="flex items-center mb-3 lg:mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-3 lg:mr-4 w-12 h-12 lg:w-15 lg:h-15"
                  />
                  <div>
                    <h4 className="font-semibold text-white text-sm lg:text-base">{testimonial.name}</h4>
                    <p className="text-white/80 text-xs lg:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-white/90 italic mb-3 lg:mb-4 text-sm lg:text-base">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Call to Action final adapté */}
      <Section className="bg-neutral-900 text-white relative overflow-hidden">
        <FloatingParticles count={30} className="opacity-30" />
        
        <div className="text-center relative z-10">
          <AnimatedSection animation="scale-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6">
                {t('home.cta.title')}
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 text-neutral-300 leading-relaxed">
                {t('home.cta.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-8 lg:mb-12">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  href="/contact" 
                  className="text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4"
                >
                  <HandshakeIcon />
                  {t('home.cta.join_us')}
                </Button>
                <Button 
                  variant="accent" 
                  size="lg" 
                  href="/projets" 
                  className="text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4"
                >
                  <ProjectIcon />
                  {t('home.hero.cta.discover')}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 text-center">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-secondary-400 mb-1 lg:mb-2">650+</div>
                  <div className="text-neutral-400 text-sm lg:text-base">Bénéficiaires</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-accent-400 mb-1 lg:mb-2">85+</div>
                  <div className="text-neutral-400 text-sm lg:text-base">Jeunes accompagnés</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-success-400 mb-1 lg:mb-2">15</div>
                  <div className="text-neutral-400 text-sm lg:text-base">Pays partenaires</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-primary-400 mb-1 lg:mb-2">6</div>
                  <div className="text-neutral-400 text-sm lg:text-base">Années d'expérience</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
