'use client';

import { useEffect, useRef, useState } from 'react';

interface SmoothAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up-smooth' | 'fade-down-smooth' | 'fade-left-smooth' | 'fade-right-smooth' | 'scale-smooth' | 'slide-smooth' | 'zoom-smooth' | 'bounce-smooth';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  stagger?: boolean;
  easing?: 'ease-out' | 'ease-in-out' | 'bounce' | 'elastic';
}

export default function SmoothAnimatedSection({ 
  children, 
  className = '', 
  animation = 'fade-up-smooth',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  triggerOnce = true,
  stagger = false,
  easing = 'ease-in-out'
}: SmoothAnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true);
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '150px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold, triggerOnce, hasTriggered]);

  const getEasingFunction = () => {
    switch (easing) {
      case 'ease-out':
        return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      case 'ease-in-out':
        return 'cubic-bezier(0.4, 0, 0.2, 1)';
      case 'bounce':
        return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
      case 'elastic':
        return 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      default:
        return 'cubic-bezier(0.4, 0, 0.2, 1)';
    }
  };

  const getInitialState = () => {
    switch (animation) {
      case 'fade-up-smooth':
        return 'opacity-0 translate-y-20 scale-95';
      case 'fade-down-smooth':
        return 'opacity-0 -translate-y-20 scale-95';
      case 'fade-left-smooth':
        return 'opacity-0 translate-x-20 scale-95';
      case 'fade-right-smooth':
        return 'opacity-0 -translate-x-20 scale-95';
      case 'scale-smooth':
        return 'opacity-0 scale-75';
      case 'zoom-smooth':
        return 'opacity-0 scale-110';
      case 'bounce-smooth':
        return 'opacity-0 scale-50 rotate-3';
      case 'slide-smooth':
        return 'opacity-0 translate-y-16 skew-y-2';
      default:
        return 'opacity-0 translate-y-20 scale-95';
    }
  };

  const getVisibleState = () => {
    return 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0 skew-y-0';
  };

  const animationState = isVisible ? getVisibleState() : getInitialState();

  return (
    <div
      ref={ref}
      className={`transform ${animationState} ${className}`}
      style={{
        transition: `all ${duration}ms ${getEasingFunction()}`,
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
} 