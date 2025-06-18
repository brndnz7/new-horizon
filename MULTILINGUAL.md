# Système Multilingue - New Horizon

Ce document explique comment utiliser et étendre le système multilingue du site New Horizon.

## 🌍 Langues Supportées

- **Français (FR)** - Langue par défaut
- **Anglais (EN)** - English
- **Turc (TR)** - Türkçe

## 🔧 Comment ça fonctionne

### 1. Hook useLanguage

Le système utilise un Context React pour gérer l'état de la langue :

```typescript
import { useLanguage } from '@/hooks/useLanguage';

function MonComposant() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('mon.cle.de.traduction')}</h1>
      <p>Langue actuelle : {language}</p>
    </div>
  );
}
```

### 2. Sélecteur de langue

Le composant `LanguageSelector` dans la navbar permet de changer de langue. La préférence est sauvegardée dans `localStorage`.

### 3. Traductions

Les traductions sont stockées dans `/src/hooks/useLanguage.ts` dans l'objet `translations`. Format :

```typescript
const translations = {
  'ma.cle': {
    fr: 'Mon texte en français',
    en: 'My text in English',
    tr: 'Türkçe metnim'
  }
};
```

## 📝 Ajouter de nouvelles traductions

### 1. Ajouter une clé de traduction

Dans `useLanguage.ts`, ajoutez votre nouvelle clé :

```typescript
'nouvelle.cle': {
  fr: 'Texte français',
  en: 'English text',
  tr: 'Türkçe metin'
}
```

### 2. Utiliser la traduction

Dans votre composant :

```typescript
const { t } = useLanguage();

return <h1>{t('nouvelle.cle')}</h1>;
```

## 🎨 Conventions de nommage

### Structure des clés
- `nav.*` - Navigation
- `home.*` - Page d'accueil
- `about.*` - Page à propos
- `common.*` - Éléments communs
- `form.*` - Formulaires
- `error.*` - Messages d'erreur

### Exemples
```
nav.home = Navigation > Accueil
home.hero.title = Page d'accueil > Section Hero > Titre
common.contact_us = Commun > Nous contacter
```

## 🔄 Étendre à d'autres pages

### 1. Rendre la page "client"

Ajoutez `'use client';` en haut du fichier :

```typescript
'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function MaPage() {
  const { t } = useLanguage();
  // ... rest of component
}
```

### 2. Remplacer les textes

Remplacez les textes statiques par des appels à `t()` :

```typescript
// Avant
<h1>Mon titre</h1>

// Après
<h1>{t('ma.page.titre')}</h1>
```

## 🌐 Ajouter une nouvelle langue

### 1. Mettre à jour le type Language

Dans `useLanguage.ts` :

```typescript
export type Language = 'fr' | 'en' | 'tr' | 'de'; // Ajouter 'de' pour allemand
```

### 2. Ajouter la langue au sélecteur

Dans `LanguageSelector.tsx` :

```typescript
const languages = [
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' } // Nouvelle langue
];
```

### 3. Ajouter les traductions

Pour chaque clé existante, ajoutez la nouvelle langue :

```typescript
'nav.home': {
  fr: 'Accueil',
  en: 'Home',
  tr: 'Ana Sayfa',
  de: 'Startseite' // Nouvelle traduction
}
```

## 📱 Responsive et Accessibilité

- Le sélecteur de langue s'adapte automatiquement sur mobile
- Les drapeaux emoji sont utilisés pour une meilleure reconnaissance visuelle
- Support complet du clavier et des lecteurs d'écran
- Fermeture automatique du dropdown au clic extérieur

## 🎯 Pages traduites actuellement

### ✅ Complètement traduites
- **Navbar** - Navigation principale
- **Page d'accueil** - Sections principales (hero, impact, histoire, projets, CTA)

### 🔄 À traduire
- Page À propos
- Page Projets
- Page Équipe
- Page Blog
- Page Contact
- Footer
- Newsletter

## 🚀 Conseils de développement

### 1. Utilisez des clés descriptives
```typescript
// ✅ Bon
'home.hero.cta.join_adventure'

// ❌ Éviter
'btn1' ou 'text_here'
```

### 2. Groupez logiquement
```typescript
// ✅ Bon - regroupement par section
'contact.form.name'
'contact.form.email' 
'contact.form.message'

// ❌ Éviter - clés dispersées
'name_field'
'email_input'
'msg_area'
```

### 3. Gérez les contenus longs
Pour les textes longs, utilisez des chaînes multi-lignes :

```typescript
'about.mission.description': {
  fr: `New Horizon est une association à but non lucratif, basée à Strasbourg, 
       qui œuvre pour une société plus inclusive...`,
  en: `New Horizon is a non-profit organization based in Strasbourg, 
       working for a more inclusive society...`,
  tr: `New Horizon, Strasbourg merkezli kar amacı gütmeyen bir kuruluş olup, 
       daha kapsayıcı bir toplum için...`
}
```

## ⚡ Performance

- Les traductions sont chargées une seule fois au démarrage
- Pas de requêtes réseau pour changer de langue
- Persistance automatique dans localStorage
- Bundle JS optimisé (toutes les langues incluses)

## 🔧 Maintenance

### Ajouter des traductions manquantes
Si une clé n'existe pas, elle sera affichée telle quelle. Surveillez la console pour les clés manquantes.

### Vérifier la cohérence
Assurez-vous que toutes les langues ont les mêmes clés :

```bash
# Script de vérification (à créer)
npm run check-translations
```

## 📞 Support

Pour toute question sur le système multilingue :
- Consultez ce fichier MULTILINGUAL.md
- Vérifiez les exemples dans `/src/app/page.tsx`
- Regardez l'implémentation dans `/src/hooks/useLanguage.ts` 