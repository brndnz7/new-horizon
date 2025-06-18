'use client'

import Link from 'next/link';
import Newsletter from './Newsletter';
import { useLanguage } from '@/hooks/useLanguage';
import TranslationIndicator from './TranslationIndicator';
import { useTranslatedStaticContent } from '@/hooks/useAutoTranslate';

export default function Footer() {
  const { t, language } = useLanguage();
  
  // Contenu statique à traduire pour le newsletter - TEMPORAIREMENT DÉSACTIVÉ POUR PERFORMANCE
  const staticContent = {
    newsletterTitle: 'Restez informés',
    newsletterDescription: 'Recevez nos dernières actualités et opportunités de mobilité européenne',
  };
  
  // DÉSACTIVÉ: const { translatedContent, isTranslating } = useTranslatedStaticContent(staticContent, language);
  const translatedContent = staticContent; // Utiliser le contenu français directement
  const isTranslating = false;
  
  return (
    <>
      <TranslationIndicator isTranslating={isTranslating} />
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 border-t-4 border-gray-300 dark:border-gray-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo New Horizon (PNG unique) */}
          <div className="flex items-center">
            <img src="/logos/logo-clair.png" alt="New Horizon" className="h-20 w-auto dark:hidden" />
            <img src="/logos/logo-sombre.png" alt="New Horizon" className="h-16 w-auto hidden dark:block" />
          </div>

          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold text-gray-800 dark:text-gray-100">New Horizon</span>
            </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {t('footer.about.description')}
            </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
              <p>{t('contact.info.address_value')}</p>
              <p>{t('contact.info.phone')}: {t('contact.info.phone_value')}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-300 dark:border-gray-600 pb-2">
                {t('footer.links.title')}
              </h3>
              <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/a-propos" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/projets" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/equipe" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('nav.team')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

            {/* Programmes */}
          <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-300 dark:border-gray-600 pb-2">
                {t('footer.programs.title')}
              </h3>
              <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/projets" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('footer.programs.erasmus')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/projets" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('footer.programs.esc')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/projets" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('footer.programs.training')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/mentions-legales" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 rounded-md px-1 py-1"
                >
                  {t('footer.legal')}
                </Link>
              </li>
            </ul>
            </div>
          </div>

          {/* Newsletter Section - Ligne séparée avec traduction */}
          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {translatedContent.newsletterTitle || 'Newsletter'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                {translatedContent.newsletterDescription || 'Restez informés de nos actualités'}
              </p>
            <Newsletter 
              variant="footer"
              title=""
              description=""
              className="w-full"
            />
          </div>
        </div>

        {/* Copyright */}
          <div className="border-t border-gray-300 dark:border-gray-600 mt-8 pt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} New Horizon. {t('footer.copyright')} 
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {t('footer.legal_info')}
          </p>
        </div>
      </div>
    </footer>
    </>
  );
} 