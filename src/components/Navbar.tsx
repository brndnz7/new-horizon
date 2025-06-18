'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  // Effet de scroll pour la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinks = [
    { href: '/', key: 'nav.home' },
    { href: '/a-propos', key: 'nav.about' },
    { href: '/projets', key: 'nav.projects' },
    { href: '/equipe', key: 'nav.team' },
    { href: '/blog', key: 'nav.blog' },
    { href: '/contact', key: 'nav.contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg border-b border-neutral-200/20 dark:border-neutral-700/20' 
        : 'bg-white dark:bg-neutral-900 shadow-sm border-b border-neutral-200 dark:border-neutral-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo New Horizon (PNG unique) */}
          <Link href="/" className="flex items-center group">
            <img src="/logos/logo-clair.png" alt="New Horizon" className="h-14 w-auto transition-transform duration-300 group-hover:scale-105 dark:hidden" />
            <img src="/logos/logo-sombre.png" alt="New Horizon" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105 hidden dark:block" />
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out group ${
                  isActiveLink(link.href)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <span className="relative z-10">{t(link.key)}</span>
                {/* Effet de hover sous la ligne */}
                <div className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 ease-in-out transform -translate-x-1/2 ${
                  isActiveLink(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
            ))}
            
            {/* Bouton Don avec animation */}
            <Link 
              href="/don" 
              className="relative ml-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:from-accent-600 hover:to-accent-700 hover:shadow-lg hover:shadow-accent-500/20 hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 overflow-hidden"
            >
              <span className="relative z-10">Faire un don</span>
            </Link>
            
            <div className="ml-4">
              <LanguageSelector />
            </div>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Menu mobile et bouton thème */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button 
              className={`p-2 rounded-lg text-neutral-400 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-100' : ''
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Menu de navigation"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'top-3 rotate-45' : ''
                }`}></span>
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'top-3 -rotate-45' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Menu mobile avec animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-800 transform hover:translate-x-1 ${
                    isActiveLink(link.href)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
                      : 'text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="flex justify-center my-2">
                <LanguageSelector />
              </div>
              <Link 
                href="/don" 
                className="mx-4 mt-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 ease-in-out hover:from-accent-600 hover:to-accent-700 hover:shadow-lg hover:translate-y-[-2px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Faire un don
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 