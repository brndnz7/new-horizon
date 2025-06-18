'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  volunteers: number;
  beneficiaries: number;
  progress: number;
  budget: number;
  raised: number;
  slug: string;
  tags: string[];
  className?: string;
}

export default function InteractiveProjectCard({
  id,
  title,
  description,
  image,
  category,
  volunteers,
  beneficiaries,
  progress,
  budget,
  raised,
  slug,
  tags,
  className = ''
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const progressPercentage = (progress / 100) * 100;
  const fundingPercentage = (raised / budget) * 100;

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image avec overlay */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badge catégorie */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {category}
          </span>
        </div>
        
        {/* Indicateur de progression */}
        <div className="absolute top-4 right-4">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray={`${progressPercentage}, 100`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Bouton détails */}
        <div className={`absolute bottom-4 left-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
          >
            Plus de détails
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-500 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-neutral-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-md text-xs hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-neutral-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-500">{volunteers}</div>
            <div className="text-xs text-neutral-600">Bénévoles</div>
          </div>
          <div className="text-center p-3 bg-neutral-50 rounded-lg">
            <div className="text-2xl font-bold text-success-500">{beneficiaries}</div>
            <div className="text-xs text-neutral-600">Bénéficiaires</div>
          </div>
        </div>

        {/* Barre de financement */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-600">Financement</span>
            <span className="font-semibold text-neutral-900">
              {raised.toLocaleString()}€ / {budget.toLocaleString()}€
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-accent-400 to-accent-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            href={`/projets/${slug}`}
            className="flex-1 hover-scale"
          >
            Découvrir
          </Button>
          <Button
            variant="outline"
            size="sm"
            href="/contact"
            className="hover-scale"
          >
            Soutenir
          </Button>
        </div>
      </div>

      {/* Overlay détails */}
      {showDetails && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col justify-center animate-fade-in-up z-20">
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h4 className="text-lg font-bold text-neutral-900 mb-4">Détails du projet</h4>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Statut:</span>
              <span className="font-semibold text-primary-500">En cours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Durée:</span>
              <span className="font-semibold">12 mois</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Localisation:</span>
              <span className="font-semibold">Paris 15ème</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Partenaires:</span>
              <span className="font-semibold">3 organisations</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button
              variant="primary"
              href={`/projets/${slug}`}
              className="w-full hover-scale"
            >
              Voir le projet complet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 