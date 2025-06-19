'use client';

import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent' | 'success';
  image?: string;
}

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export default function InteractiveTimeline({ events, className = '' }: InteractiveTimelineProps) {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  const colorClasses = {
    primary: {
      bg: 'bg-primary-500',
      border: 'border-primary-500',
      text: 'text-primary-500',
      glow: 'shadow-primary-500/50'
    },
    secondary: {
      bg: 'bg-secondary-400',
      border: 'border-secondary-400',
      text: 'text-secondary-400',
      glow: 'shadow-secondary-400/50'
    },
    accent: {
      bg: 'bg-accent-500',
      border: 'border-accent-500',
      text: 'text-accent-500',
      glow: 'shadow-accent-500/50'
    },
    success: {
      bg: 'bg-success-500',
      border: 'border-success-500',
      text: 'text-success-500',
      glow: 'shadow-success-500/50'
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Ligne centrale - responsive */}
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-primary-200 via-secondary-200 to-accent-200 h-full"></div>
      
      <div className="space-y-8 lg:space-y-12">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          const colors = colorClasses[event.color];
          const isActive = activeEvent === index;
          
          return (
            <AnimatedSection
              key={index}
              animation="fade-up"
              delay={index * 150}
            >
              <div className="relative flex items-start md:items-center">
                {/* Point sur la timeline - responsive */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <button
                    onClick={() => setActiveEvent(isActive ? null : index)}
                    className={`
                      w-8 h-8 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-white shadow-lg transition-all duration-300 flex items-center justify-center
                      ${colors.bg} ${isActive ? `scale-125 ${colors.glow} shadow-xl` : 'hover:scale-110'}
                    `}
                  >
                    <div className="text-white text-sm md:text-lg">
                      {event.icon}
                    </div>
                  </button>
                </div>

                {/* Contenu - Layout mobile et desktop */}
                <div className={`
                  w-full pl-16 md:pl-0 md:w-5/12 
                  ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
                  ${isLeft ? 'md:text-right' : 'md:text-left'}
                  text-left
                `}>
                  <div className={`
                    bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 md:p-6 border-l-4 ${colors.border}
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                    ${isActive ? `${colors.glow} shadow-xl scale-105` : ''}
                  `}>
                    <div className={`text-lg md:text-2xl font-bold ${colors.text} mb-2`}>
                      {event.year}
                    </div>
                    <h3 className="text-base md:text-xl font-semibold text-neutral-900 dark:text-white mb-2 md:mb-3">
                      {event.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {/* Raccourcir le texte sur mobile */}
                      <span className="md:hidden">
                        {event.description.length > 100 
                          ? `${event.description.substring(0, 100)}...` 
                          : event.description
                        }
                      </span>
                      <span className="hidden md:block">
                        {event.description}
                      </span>
                    </p>
                    
                    {/* Bouton pour voir plus sur mobile */}
                    {event.description.length > 100 && (
                      <button
                        onClick={() => setActiveEvent(isActive ? null : index)}
                        className="md:hidden mt-2 text-sm text-primary-500 hover:text-primary-600 font-medium"
                      >
                        {isActive ? 'Voir moins' : 'Voir plus'}
                      </button>
                    )}
                    
                    {/* Détails supplémentaires quand actif */}
                    {isActive && (
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-neutral-200 dark:border-neutral-700 animate-fade-in-up">
                        {/* Sur mobile, afficher le texte complet */}
                        <div className="md:hidden">
                          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                            {event.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Étape importante de notre développement</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Année flottante - masquée sur mobile car déjà dans le contenu */}
                <div className={`
                  hidden md:block absolute ${isLeft ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2
                  ${isLeft ? 'translate-x-4' : '-translate-x-4'}
                  bg-gradient-to-r ${colors.bg} text-white px-3 py-1 rounded-full text-sm font-bold
                  opacity-75 hover:opacity-100 transition-opacity duration-300
                `}>
                  {event.year}
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
} 