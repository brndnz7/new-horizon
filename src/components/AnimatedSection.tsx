'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-in' | 'slide-bottom' | 'zoom-in' | 'bounce-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fade-up',
  delay = 0,
  duration = 500,
  threshold = 0.2,
  triggerOnce = true
}: AnimatedSectionProps) {
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
        rootMargin: '50px 0px -100px 0px'
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

  const getInitialState = () => {
    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-8';
      case 'fade-down':
        return 'opacity-0 -translate-y-8';
      case 'fade-left':
        return 'opacity-0 translate-x-8';
      case 'fade-right':
        return 'opacity-0 -translate-x-8';
      case 'scale-in':
        return 'opacity-0 scale-95';
      case 'zoom-in':
        return 'opacity-0 scale-105';
      case 'bounce-in':
        return 'opacity-0 scale-90';
      case 'slide-bottom':
        return 'opacity-0 translate-y-6';
      default:
        return 'opacity-0 translate-y-8';
    }
  };

  const getVisibleState = () => {
    switch (animation) {
      case 'bounce-in':
        return 'opacity-100 scale-100';
      default:
        return 'opacity-100 translate-y-0 translate-x-0 scale-100';
    }
  };

  const animationState = isVisible ? getVisibleState() : getInitialState();

  return (
    <div
      ref={ref}
      className={`transform ${animationState} ${className}`}
      style={{
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  );
} 