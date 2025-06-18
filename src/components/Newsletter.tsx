'use client';

import { useState } from 'react';
import { useNewsletter } from '@/hooks/useNewsletter';
import Button from './Button';

interface NewsletterProps {
  variant?: 'inline' | 'card' | 'minimal' | 'footer';
  title?: string;
  description?: string;
  className?: string;
}

export default function Newsletter({ 
  variant = 'card',
  title = 'Newsletter',
  description = 'Restez informé de nos dernières actualités',
  className = ''
}: NewsletterProps) {
  const { isSubscribed, email, subscribe, unsubscribe, reopenPopup, isLoading } = useNewsletter();
  const [localEmail, setLocalEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({
    type: null,
    text: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!localEmail.trim()) {
      setMessage({ type: 'error', text: 'Veuillez saisir votre adresse email' });
      return;
    }

    const result = await subscribe(localEmail);
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });

    if (result.success) {
      setLocalEmail('');
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    }
  };

  const handleUnsubscribe = async () => {
    const result = await unsubscribe();
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });

    if (result.success) {
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    }
  };

  // Variant footer - version compacte pour le footer
  if (variant === 'footer') {
    if (isSubscribed) {
      return (
        <div className={`space-y-3 ${className}`}>
          <div className="flex items-center space-x-2 text-green-400">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Inscrit à la newsletter</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Vous recevez nos actualités sur <br className="sm:hidden" />
            <span className="text-neutral-300">{email}</span>
          </p>
          <button
            onClick={handleUnsubscribe}
            disabled={isLoading}
            className="text-xs text-neutral-400 hover:text-accent-400 transition-colors underline"
          >
            {isLoading ? 'Désinscription...' : 'Se désinscrire'}
          </button>
          {message.text && (
            <div className={`text-xs p-2 rounded ${
              message.type === 'success' 
                ? 'bg-green-900/30 text-green-400 border border-green-800' 
                : 'bg-red-900/30 text-red-400 border border-red-800'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={`space-y-3 ${className}`}>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Recevez nos actualités et ne ratez aucun événement
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="footer-email" className="sr-only">Adresse email</label>
            <input
              id="footer-email"
              type="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              className="w-full px-3 py-2 text-sm border border-neutral-600 rounded-md focus:ring-2 focus:ring-secondary-400 focus:border-secondary-400 bg-neutral-800 text-white placeholder-neutral-400 transition-colors"
              disabled={isLoading}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-sm py-2 bg-secondary-500 hover:bg-secondary-600 text-white"
            >
              {isLoading ? 'Inscription...' : 'S\'inscrire'}
            </Button>
            <Button
              type="button"
              onClick={reopenPopup}
              variant="outline"
              className="text-sm py-2 border-neutral-600 text-neutral-300 hover:text-white hover:border-neutral-500"
            >
              Plus d'infos
            </Button>
          </div>
        </form>
        
        {message.text && (
          <div className={`text-xs p-2 rounded ${
            message.type === 'success' 
              ? 'bg-green-900/30 text-green-400 border border-green-800' 
              : 'bg-red-900/30 text-red-400 border border-red-800'
          }`}>
            {message.text}
          </div>
        )}
        
        <p className="text-xs text-neutral-500 leading-relaxed">
          Pas de spam. Désinscription possible à tout moment.
        </p>
      </div>
    );
  }

  // Variant minimal - juste le bouton pour rouvrir le popup
  if (variant === 'minimal') {
    if (isSubscribed) {
      return (
        <div className={`text-center ${className}`}>
          <div className="inline-flex items-center space-x-2 text-green-600 dark:text-green-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Inscrit à la newsletter</span>
          </div>
          <button
            onClick={handleUnsubscribe}
            disabled={isLoading}
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 mt-1 transition-colors"
          >
            Se désinscrire
          </button>
        </div>
      );
    }

    return (
      <div className={className}>
        <Button 
          onClick={reopenPopup}
          variant="outline"
          className="text-sm"
        >
          Newsletter
        </Button>
      </div>
    );
  }

  // Variant inline - formulaire horizontal
  if (variant === 'inline') {
    if (isSubscribed) {
      return (
        <div className={`bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 ${className}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Inscription confirmée !
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {email}
                </p>
              </div>
            </div>
            <button
              onClick={handleUnsubscribe}
              disabled={isLoading}
              className="text-xs text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-colors"
            >
              Se désinscrire
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 ${className}`}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="inline-email" className="sr-only">Adresse email</label>
            <input
              id="inline-email"
              type="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 transition-colors"
              disabled={isLoading}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="text-sm px-4 py-2 whitespace-nowrap"
          >
            {isLoading ? 'Inscription...' : 'S\'inscrire'}
          </Button>
          <Button
            type="button"
            onClick={reopenPopup}
            variant="outline"
            className="text-sm px-4 py-2 whitespace-nowrap"
          >
            Voir plus
          </Button>
        </form>
        
        {message.text && (
          <div className={`mt-3 text-xs p-2 rounded ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    );
  }

  // Variant card - formulaire vertical avec style carte
  if (isSubscribed) {
    return (
      <div className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 text-center ${className}`}>
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Merci pour votre inscription !
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
          Vous recevrez bientôt nos actualités sur {email}
        </p>
        <div className="space-y-2">
          <Button
            onClick={handleUnsubscribe}
            disabled={isLoading}
            variant="outline"
            className="text-sm"
          >
            {isLoading ? 'Désinscription...' : 'Se désinscrire'}
          </Button>
        </div>
        
        {message.text && (
          <div className={`mt-4 text-sm p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="card-email" className="sr-only">Adresse email</label>
          <input
            id="card-email"
            type="email"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            placeholder="votre.email@exemple.com"
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 transition-colors"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Inscription...' : 'S\'inscrire à la newsletter'}
          </Button>
          
          <Button
            type="button"
            onClick={reopenPopup}
            variant="outline"
            className="w-full text-sm"
          >
            Voir les avantages
          </Button>
        </div>
      </form>

      {message.text && (
        <div className={`mt-4 text-sm p-3 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <p className="mt-4 text-xs text-center text-neutral-500 dark:text-neutral-400">
        Pas de spam. Désinscription possible à tout moment.
      </p>
    </div>
  );
} 