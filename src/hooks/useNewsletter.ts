'use client';

import { useState, useEffect } from 'react';

interface NewsletterState {
  isSubscribed: boolean;
  hasSeenPopup: boolean;
  hasClosedPopup: boolean;
  email: string;
}

const STORAGE_KEY = 'newsletter-state';
const POPUP_DELAY = 30000; // 30 secondes
const POPUP_RETRY_DELAY = 7 * 24 * 60 * 60 * 1000; // 7 jours

export function useNewsletter() {
  const [state, setState] = useState<NewsletterState>({
    isSubscribed: false,
    hasSeenPopup: false,
    hasClosedPopup: false,
    email: '',
  });
  
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydratation
  useEffect(() => {
    setMounted(true);
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedState = JSON.parse(stored);
        setState(parsedState);
      } catch (error) {
        console.error('Erreur lors du parsing de l\'état newsletter:', error);
      }
    }
  }, []);

  // Logique d'affichage du popup
  useEffect(() => {
    if (!mounted) return;

    const shouldShowPopup = () => {
      // Ne pas afficher si déjà inscrit
      if (state.isSubscribed) return false;
      
      // Ne pas afficher si fermé récemment
      if (state.hasClosedPopup) {
        const lastClosed = localStorage.getItem('newsletter-last-closed');
        if (lastClosed) {
          const lastClosedTime = parseInt(lastClosed);
          const now = Date.now();
          if (now - lastClosedTime < POPUP_RETRY_DELAY) {
            return false;
          }
        }
      }
      
      // Ne pas afficher si déjà vu dans cette session
      if (state.hasSeenPopup) return false;
      
      return true;
    };

    if (shouldShowPopup()) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setState(prev => ({ ...prev, hasSeenPopup: true }));
      }, POPUP_DELAY);

      return () => clearTimeout(timer);
    }
  }, [mounted, state.isSubscribed, state.hasClosedPopup, state.hasSeenPopup]);

  // Sauvegarder l'état dans localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, mounted]);

  const subscribe = async (email: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation basique de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Adresse email invalide');
      }

      setState(prev => ({
        ...prev,
        isSubscribed: true,
        email: email,
      }));
      
      setShowPopup(false);
      
      return {
        success: true,
        message: 'Merci ! Vous êtes maintenant inscrit(e) à notre newsletter.',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Une erreur s\'est produite',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async (): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({
        ...prev,
        isSubscribed: false,
        email: '',
      }));
      
      return {
        success: true,
        message: 'Vous avez été désinscrit(e) de la newsletter.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Une erreur s\'est produite lors de la désinscription',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setState(prev => ({ ...prev, hasClosedPopup: true }));
    localStorage.setItem('newsletter-last-closed', Date.now().toString());
  };

  const reopenPopup = () => {
    if (!state.isSubscribed) {
      setShowPopup(true);
      setState(prev => ({ ...prev, hasClosedPopup: false }));
      localStorage.removeItem('newsletter-last-closed');
    }
  };

  const resetPopupState = () => {
    setState(prev => ({
      ...prev,
      hasSeenPopup: false,
      hasClosedPopup: false,
    }));
    localStorage.removeItem('newsletter-last-closed');
  };

  return {
    // État
    isSubscribed: state.isSubscribed,
    email: state.email,
    showPopup: mounted && showPopup,
    isLoading,
    mounted,
    
    // Actions
    subscribe,
    unsubscribe,
    closePopup,
    reopenPopup,
    resetPopupState,
  };
} 