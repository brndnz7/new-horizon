import Image from "next/image";
import Link from 'next/link';
import Section, { SectionHeader } from '@/components/Section';
import Card, { CardContent } from '@/components/Card';
import Button from '@/components/Button';
import AnimatedSection from '@/components/AnimatedSection';
import SimpleAnimatedSection from '@/components/SimpleAnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import FloatingParticles from '@/components/FloatingParticles';
import TypewriterEffect from '@/components/TypewriterEffect';
import ProgressBar from '@/components/ProgressBar';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import InteractiveProjectCard from '@/components/InteractiveProjectCard';
import Newsletter from '@/components/Newsletter';
import projetsData from '../../data/projets.json';

export default function Home() {
  // Icônes SVG personnalisées
  const SeedIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m6.364-13.636L5.636 20.364M21 12H3m13.636-6.364L3.636 18.364" />
    </svg>
  );

  const HomeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const TrophyIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );

  const RocketIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const ComputerIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const TargetIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const HandshakeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  );

  const ProjectIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );

  const FamilyIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  // Données pour la timeline
  const timelineEvents = [
    {
      year: "2009",
      title: "Création de l'association",
      description: "Fondation de Mon Association par un groupe de citoyens engagés pour répondre aux besoins sociaux du quartier.",
      icon: <SeedIcon />,
      color: "primary" as const
    },
    {
      year: "2012",
      title: "Premier local associatif",
      description: "Ouverture de notre premier local permanent, permettant d'accueillir nos activités et nos bénéficiaires dans de meilleures conditions.",
      icon: <HomeIcon />,
      color: "secondary" as const
    },
    {
      year: "2015",
      title: "Reconnaissance d'utilité publique",
      description: "Obtention du statut d'utilité publique, reconnaissant notre impact positif sur la communauté locale.",
      icon: <TrophyIcon />,
      color: "success" as const
    },
    {
      year: "2018",
      title: "Expansion des services",
      description: "Lancement de nouveaux programmes : aide alimentaire, ateliers numériques et jardins partagés.",
      icon: <RocketIcon />,
      color: "accent" as const
    },
    {
      year: "2021",
      title: "Digitalisation",
      description: "Modernisation de nos services avec une plateforme numérique pour mieux accompagner nos bénéficiaires.",
      icon: <ComputerIcon />,
      color: "primary" as const
    },
    {
      year: "2024",
      title: "Nouveau projet",
      description: "Lancement de notre programme d'insertion professionnelle pour les jeunes du quartier.",
      icon: <TargetIcon />,
      color: "secondary" as const
    }
  ];

  const typewriterWords = ["solidarité", "entraide", "communauté", "espoir", "changement"];

  return (
    <>
      {/* Hero Section Révolutionné */}
      <Section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden transition-colors duration-200" container={false}>
        <FloatingParticles count={40} />
        
        {/* Formes géométriques décoratives */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-accent-200 to-accent-300 rounded-lg opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            <SimpleAnimatedSection animation="fade-in-right" className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                  <span className="w-3 h-3 bg-success-500 rounded-full mr-3 animate-pulse"></span>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">15 ans d'engagement communautaire</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white leading-tight">
                  Ensemble pour la{' '}
                  <span className="relative">
                    <TypewriterEffect 
                      words={typewriterWords}
                      className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-400 bg-clip-text text-transparent"
                    />
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                  Mon Association transforme les défis en opportunités, créant un impact durable 
                  dans notre communauté grâce à l'engagement de nos bénévoles passionnés.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  href="/contact" 
                  className="text-lg px-8 py-4"
                >
                  <HandshakeIcon />
                  Rejoindre l'aventure
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  href="/projets" 
                  className="text-lg px-8 py-4 border-2"
                >
                  <ProjectIcon />
                  Découvrir nos projets
                </Button>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <AnimatedSection animation="fade-up" delay={100} className="text-center">
                  <AnimatedCounter end={150} suffix="+" className="text-3xl font-bold text-primary-500" />
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Bénévoles actifs</div>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={150} className="text-center">
                  <AnimatedCounter end={1200} className="text-3xl font-bold text-success-500" />
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Vies transformées</div>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={200} className="text-center">
                  <AnimatedCounter end={15} className="text-3xl font-bold text-accent-500" />
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Années d'impact</div>
                </AnimatedSection>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200} className="relative">
              <div className="relative">
                {/* Image principale avec effets */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800"
                    alt="Équipe de bénévoles en action"
                    width={600}
                    height={500}
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Cards flottantes */}
                <AnimatedSection animation="zoom-in" delay={600} className="absolute -top-6 -left-6 bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-4 border-gradient">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <TargetIcon />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-white">Mission</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-300">Impact social</div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="zoom-in" delay={800} className="absolute -bottom-6 -right-6 bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-4 border-gradient">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success-100 dark:bg-success-800 rounded-full flex items-center justify-center text-success-600 dark:text-success-400">
                      <HeartIcon />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-white">Engagement</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-300">Communautaire</div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Section>

      {/* Section Impact avec barres de progression */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <AnimatedSection>
          <SectionHeader 
            title="Notre impact en temps réel" 
            subtitle="Des résultats concrets qui transforment notre communauté"
            centered
          />
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fade-right">
            <div className="space-y-8">
              <ProgressBar
                label="Familles accompagnées cette année"
                value={1200}
                maxValue={1500}
                color="primary"
                icon={<FamilyIcon />}
              />
              <ProgressBar
                label="Bénévoles mobilisés"
                value={150}
                maxValue={200}
                color="success"
                icon={<HandshakeIcon />}
              />
              <ProgressBar
                label="Projets en cours"
                value={8}
                maxValue={10}
                color="accent"
                icon={<RocketIcon />}
              />
              <ProgressBar
                label="Satisfaction bénéficiaires"
                value={96}
                maxValue={100}
                color="secondary"
                icon={<HeartIcon />}
                suffix="%"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-left" delay={200}>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Pourquoi nous choisir ?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Transparence totale</h4>
                    <p className="text-neutral-600 dark:text-neutral-300">Tous nos comptes et actions sont publics et vérifiables</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Impact mesurable</h4>
                    <p className="text-neutral-600 dark:text-neutral-300">Chaque action est évaluée et son impact quantifié</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Proximité locale</h4>
                    <p className="text-neutral-600 dark:text-neutral-300">Ancrage fort dans le quartier et connaissance du terrain</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Timeline interactive */}
      <Section className="bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
        <AnimatedSection>
          <SectionHeader 
            title="Notre histoire" 
            subtitle="15 années d'engagement et d'évolution au service de la communauté"
            centered
          />
        </AnimatedSection>
        <InteractiveTimeline events={timelineEvents} className="max-w-6xl mx-auto" />
      </Section>

      {/* Projets avec cartes interactives */}
      <Section className="bg-white dark:bg-neutral-900 transition-colors duration-200">
        <AnimatedSection>
          <SectionHeader 
            title="Nos projets phares" 
            subtitle="Découvrez nos initiatives qui transforment concrètement la vie de notre quartier"
            centered
          />
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetsData.map((project, index) => (
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
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              href="/projets" 
              className="bg-gradient-to-r from-primary-500 to-secondary-400"
            >
              Découvrir tous nos projets
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </AnimatedSection>
      </Section>

      {/* Section témoignages améliorée */}
      <Section className="bg-gradient-to-br from-primary-500 to-secondary-400 text-white relative overflow-hidden">
        <FloatingParticles count={25} className="opacity-20" />
        
        <AnimatedSection>
          <SectionHeader 
            title="Ils témoignent de notre impact" 
            subtitle="Les mots de ceux qui vivent notre mission au quotidien"
            centered
            className="text-white"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              name: "Sarah Martin",
              role: "Bénéficiaire des ateliers numériques",
              image: "https://images.unsplash.com/photo-1494790108755-2616b612b890?q=80&w=200",
              quote: "Grâce aux ateliers numériques, j'ai pu me reconnecter avec ma famille à l'étranger. Cette association a vraiment changé ma vie.",
              rating: 5
            },
            {
              name: "Pierre Durand",
              role: "Bénévole depuis 3 ans",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
              quote: "Être bénévole ici m'a permis de donner du sens à ma retraite. L'entraide et la convivialité sont extraordinaires.",
              rating: 5
            },
            {
              name: "Marie Leblanc",
              role: "Résidente du quartier",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
              quote: "Les jardins partagés ont créé une vraie dynamique dans notre quartier. Mes enfants adorent y participer.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 150}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover-card">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-white/80 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-white/90 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Call to Action final */}
      <Section className="bg-neutral-900 text-white relative overflow-hidden">
        <FloatingParticles count={30} className="opacity-30" />
        
        <div className="text-center relative z-10">
          <AnimatedSection animation="scale-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Prêt à faire la différence ?
              </h2>
              <p className="text-xl md:text-2xl mb-12 text-neutral-300 leading-relaxed">
                Rejoignez une communauté de bénévoles passionnés et participez à des projets 
                qui ont un impact réel et mesurable sur la vie de nos concitoyens.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  href="/contact" 
                  className="text-lg px-8 py-4"
                >
                  <HandshakeIcon />
                  Devenir bénévole
                </Button>
                <Button 
                  variant="accent" 
                  size="lg" 
                  href="/don" 
                  className="text-lg px-8 py-4"
                >
                  <HeartIcon />
                  Faire un don
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <AnimatedSection animation="bounce-in" delay={600}>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-accent-500 rounded-full text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Action immédiate</h3>
                  <p className="text-neutral-400 text-sm">Votre engagement a un impact dès le premier jour</p>
                </AnimatedSection>
                <AnimatedSection animation="bounce-in" delay={700}>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-success-500 rounded-full text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Impact local</h3>
                  <p className="text-neutral-400 text-sm">Transformez concrètement votre quartier</p>
                </AnimatedSection>
                <AnimatedSection animation="bounce-in" delay={800}>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary-500 rounded-full text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Communauté forte</h3>
                  <p className="text-neutral-400 text-sm">Rejoignez 150+ bénévoles engagés</p>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}
