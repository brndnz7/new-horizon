'use client';

import { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: 'primary' | 'secondary' | 'accent' | 'success';
  icon?: React.ReactNode;
  suffix?: string;
  className?: string;
}

export default function ProgressBar({
  label,
  value,
  maxValue,
  color = 'primary',
  icon,
  suffix = '',
  className = ''
}: ProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const percentage = Math.min((value / maxValue) * 100, 100);

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-400',
    accent: 'bg-accent-500',
    success: 'bg-success-500'
  };

  const colorGradients = {
    primary: 'from-primary-400 to-primary-600',
    secondary: 'from-secondary-300 to-secondary-500',
    accent: 'from-accent-400 to-accent-600',
    success: 'from-success-400 to-success-600'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setAnimatedValue(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, value]);

  return (
    <div ref={ref} className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon && <div className="text-neutral-600">{icon}</div>}
          <span className="text-sm font-medium text-neutral-700">{label}</span>
        </div>
        <span className="text-sm font-bold text-neutral-900">
          {animatedValue.toLocaleString()}{suffix}
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colorGradients[color]} rounded-full transition-all duration-2000 ease-out relative overflow-hidden`}
            style={{ width: isVisible ? `${percentage}%` : '0%' }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Indicateur de pourcentage */}
        <div 
          className="absolute top-0 h-3 w-1 bg-white rounded-full shadow-lg transition-all duration-2000 ease-out"
          style={{ left: isVisible ? `calc(${percentage}% - 2px)` : '0%' }}
        ></div>
      </div>
      
      <div className="text-xs text-neutral-500">
        Objectif: {maxValue.toLocaleString()}{suffix}
      </div>
    </div>
  );
} 