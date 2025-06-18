'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language } from './useLanguage';

// Cache des traductions pour éviter les appels répétés
const translationCache = new Map<string, string>();

// Fonction pour détecter le contenu qui ne doit pas être traduit
function isNonTranslatableContent(text: string): boolean {
  if (!text || typeof text !== 'string') return true;
  
  // Patterns à ne pas traduire
  const nonTranslatablePatterns = [
    // Emails
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
    // URLs
    /https?:\/\/[^\s]+/,
    // Numéros de téléphone français
    /^\+?33[0-9\s.-]{8,14}$|^0[1-9][0-9\s.-]{8}$/,
    // Adresses (commence par un numéro)
    /^\d+\s+[A-Za-z\s]+/,
    // Codes postaux français
    /\b\d{5}\b/,
    // Noms de ville avec code postal
    /\d{5}\s+[A-Za-z\s-]+,?\s*France/i
  ];
  
  return nonTranslatablePatterns.some(pattern => pattern.test(text));
}

interface TranslationOptions {
  fromLanguage?: Language;
  toLanguage: Language;
  cacheKey?: string;
}

// Fonction de traduction via Google Translate API (gratuite)
async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  try {
    // URL de l'API Google Translate gratuite (via mymemory.translated.net)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData) {
      return data.responseData.translatedText;
    }
    
    // Fallback: retourner le texte original si la traduction échoue
    return text;
  } catch (error) {
    console.warn('Erreur de traduction automatique:', error);
    return text;
  }
}

// Fonction de traduction offline simple (fallback)
function simpleTranslate(text: string, fromLang: string, toLang: string): string {
  // Dictionnaire étendu pour les mots courants (évite les appels API)
  const commonWords: { [key: string]: { [lang: string]: string } } = {
    'président': { en: 'President', tr: 'Başkan' },
    'directeur': { en: 'Director', tr: 'Direktör' },
    'coordinateur': { en: 'Coordinator', tr: 'Koordinatör' },
    'bénévole': { en: 'Volunteer', tr: 'Gönüllü' },
    'membre': { en: 'Member', tr: 'Üye' },
    'membres': { en: 'Members', tr: 'Üyeler' },
    'équipe': { en: 'Team', tr: 'Ekip' },
    'association': { en: 'Association', tr: 'Dernek' },
    'projet': { en: 'Project', tr: 'Proje' },
    'projets': { en: 'Projects', tr: 'Projeler' },
    'formation': { en: 'Training', tr: 'Eğitim' },
    'formations': { en: 'Training', tr: 'Eğitimler' },
    'éducation': { en: 'Education', tr: 'Eğitim' },
    'mobilité': { en: 'Mobility', tr: 'Hareketlilik' },
    'erasmus': { en: 'Erasmus', tr: 'Erasmus' },
    'europe': { en: 'Europe', tr: 'Avrupa' },
    'européenne': { en: 'European', tr: 'Avrupa' },
    'strasbourg': { en: 'Strasbourg', tr: 'Strasbourg' },
    'jeune': { en: 'Young', tr: 'Genç' },
    'jeunes': { en: 'Young people', tr: 'Gençler' },
    'restez informés': { en: 'Stay informed', tr: 'Bilgilendirilmeye devam edin' },
    'recevez nos dernières actualités': { en: 'Receive our latest news', tr: 'En son haberlerimizi alın' },
    'opportunités': { en: 'opportunities', tr: 'fırsatlar' },
    'newsletter': { en: 'Newsletter', tr: 'Haber bülteni' },
    'actualités': { en: 'news', tr: 'haberler' },
    'contact': { en: 'Contact', tr: 'İletişim' },
    'blog': { en: 'Blog', tr: 'Blog' },
    'accueil': { en: 'Home', tr: 'Ana sayfa' },
    'à propos': { en: 'About', tr: 'Hakkında' }
  };

  let translatedText = text;
  
  // Remplacer les mots courants
  Object.keys(commonWords).forEach(frenchWord => {
    if (fromLang === 'fr' && commonWords[frenchWord][toLang]) {
      const regex = new RegExp(`\\b${frenchWord}\\b`, 'gi');
      translatedText = translatedText.replace(regex, commonWords[frenchWord][toLang]);
    }
  });
  
  return translatedText;
}

export function useAutoTranslate() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translations, setTranslations] = useState<Map<string, string>>(new Map());

  // Fonction principale de traduction
  const translateContent = useCallback(async (
    content: string, 
    options: TranslationOptions
  ): Promise<string> => {
    const { fromLanguage = 'fr', toLanguage, cacheKey } = options;
    
    // Si même langue, retourner le contenu original
    if (fromLanguage === toLanguage) {
      return content;
    }
    
    // Vérifier le cache
    const cacheKeyFinal = cacheKey || `${content.slice(0, 100)}_${fromLanguage}_${toLanguage}`;
    if (translationCache.has(cacheKeyFinal)) {
      return translationCache.get(cacheKeyFinal)!;
    }
    
    setIsTranslating(true);
    
    try {
      let translatedContent = content;
      
      // OPTIMISATION: Privilégier la traduction locale pour éviter la lenteur
      // Essayer d'abord la traduction simple (locale)
      translatedContent = simpleTranslate(content, fromLanguage, toLanguage);
      
      // Si aucune traduction locale trouvée ET texte court, utiliser l'API
      if (translatedContent === content && content.length < 50) {
        try {
          translatedContent = await translateText(content, fromLanguage, toLanguage);
        } catch (error) {
          // Si l'API échoue, garder la traduction locale
          console.warn('API translation failed, using simple translate');
        }
      }
      
      // Mettre en cache
      translationCache.set(cacheKeyFinal, translatedContent);
      
      return translatedContent;
    } catch (error) {
      console.warn('Erreur de traduction:', error);
      return content; // Retourner le contenu original en cas d'erreur
    } finally {
      setIsTranslating(false);
    }
  }, []);

  // Fonction pour traduire un objet complet (membre, article, projet)
  const translateObject = useCallback(async (
    obj: any, 
    fieldsToTranslate: string[], 
    targetLanguage: Language,
    excludeFields: string[] = [] // Nouveaux champs à exclure
  ) => {
    if (targetLanguage === 'fr') {
      return obj; // Pas de traduction nécessaire pour le français
    }
    
    const translatedObj = { ...obj };
    
    // Filtrer les champs à exclure
    const fieldsToActuallyTranslate = fieldsToTranslate.filter(field => !excludeFields.includes(field));
    
    await Promise.all(
      fieldsToActuallyTranslate.map(async (field) => {
        if (obj[field] && typeof obj[field] === 'string') {
          // Vérifications supplémentaires pour éviter de traduire certains contenus
          const fieldValue = obj[field];
          
          // Ne pas traduire les emails, URLs, numéros de téléphone, adresses
          if (isNonTranslatableContent(fieldValue)) {
            translatedObj[field] = fieldValue; // Garder original
          } else {
            translatedObj[field] = await translateContent(fieldValue, {
              toLanguage: targetLanguage,
              cacheKey: `${obj.id || 'unknown'}_${field}_${targetLanguage}`
            });
          }
        }
      })
    );
    
    return translatedObj;
  }, [translateContent]);

  return {
    translateContent,
    translateObject,
    isTranslating,
    clearCache: () => translationCache.clear()
  };
}

// Hook spécialisé pour les membres de l'équipe
export function useTranslatedTeamMembers(members: any[], currentLanguage: Language) {
  const [translatedMembers, setTranslatedMembers] = useState(members);
  const { translateObject, isTranslating } = useAutoTranslate();

  useEffect(() => {
    const translateMembers = async () => {
      if (currentLanguage === 'fr') {
        setTranslatedMembers(members);
        return;
      }

      const translated = await Promise.all(
        members.map(member => 
          translateObject(member, ['name', 'role', 'description'], currentLanguage)
        )
      );
      
      setTranslatedMembers(translated);
    };

    if (members.length > 0) {
      translateMembers();
    }
  }, [members, currentLanguage, translateObject]);

  return { translatedMembers, isTranslating };
}

// Hook spécialisé pour les articles de blog
export function useTranslatedBlogPosts(posts: any[], currentLanguage: Language) {
  const [translatedPosts, setTranslatedPosts] = useState(posts);
  const { translateObject, isTranslating } = useAutoTranslate();

  useEffect(() => {
    const translatePosts = async () => {
      if (currentLanguage === 'fr') {
        setTranslatedPosts(posts);
        return;
      }

      const translated = await Promise.all(
        posts.map(post => 
          translateObject(post, ['title', 'excerpt', 'content', 'category'], currentLanguage)
        )
      );
      
      setTranslatedPosts(translated);
    };

    if (posts.length > 0) {
      translatePosts();
    }
  }, [posts, currentLanguage, translateObject]);

  return { translatedPosts, isTranslating };
}

// Hook spécialisé pour les projets
export function useTranslatedProjects(projects: any[], currentLanguage: Language) {
  const [translatedProjects, setTranslatedProjects] = useState(projects);
  const { translateObject, isTranslating } = useAutoTranslate();

  useEffect(() => {
    const translateProjects = async () => {
      if (currentLanguage === 'fr') {
        setTranslatedProjects(projects);
        return;
      }

      const translated = await Promise.all(
        projects.map(project => 
          translateObject(project, ['title', 'description', 'content', 'category'], currentLanguage)
        )
      );
      
      setTranslatedProjects(translated);
    };

    if (projects.length > 0) {
      translateProjects();
    }
  }, [projects, currentLanguage, translateObject]);

  return { translatedProjects, isTranslating };
}

// Hook spécialisé pour le newsletter et footer
export function useTranslatedStaticContent(content: any, currentLanguage: Language) {
  const [translatedContent, setTranslatedContent] = useState(content);
  const { translateObject, isTranslating } = useAutoTranslate();

  useEffect(() => {
    const translateStaticContent = async () => {
      if (currentLanguage === 'fr') {
        setTranslatedContent(content);
        return;
      }

      // Champs à traduire et à exclure pour le contenu statique
      const fieldsToTranslate = ['title', 'description', 'placeholder', 'buttonText', 'successMessage', 'errorMessage'];
      const excludeFields = ['email', 'phone', 'address', 'url']; // Exclure adresses, emails, etc.

      const translated = await translateObject(content, fieldsToTranslate, currentLanguage, excludeFields);
      setTranslatedContent(translated);
    };

    if (content && Object.keys(content).length > 0) {
      translateStaticContent();
    }
  }, [content, currentLanguage, translateObject]);

  return { translatedContent, isTranslating };
} 