# 🚀 Guide de déploiement sur Vercel

## 📋 Étapes pour configurer la base de données sur Vercel

### 1. Créer une base PostgreSQL

1. **Aller sur [Neon](https://neon.tech)** ou **[Supabase](https://supabase.com)** (gratuit)
2. **Créer un nouveau projet PostgreSQL**
3. **Copier l'URL de connexion** (format : `postgresql://username:password@host:port/database`)

### 2. Configurer les variables d'environnement sur Vercel

Dans les paramètres de votre projet Vercel, ajouter ces variables :

```bash
# Base de données
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth (si utilisé plus tard)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-app.vercel.app"
```

### 3. Préparer le schéma pour production

**Important :** Avant de déployer, vous devez :

1. **Copier le schéma Vercel :**
   ```bash
   # Depuis votre machine locale
   cp prisma/schema.vercel.prisma prisma/schema.prisma
   ```

2. **Pousser le schéma vers Vercel :**
   ```bash
   npx prisma db push
   ```

3. **Exécuter le script de migration :**
   ```bash
   node scripts/migrate-to-cloud.js
   ```

### 4. Configuration automatique pour Vercel

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "vercel-build": "npx prisma generate && npx prisma db push && node scripts/migrate-to-cloud.js && next build"
  }
}
```

## 🔑 Informations de connexion Admin

Une fois déployé, vous pourrez vous connecter avec :

- **Username :** `admin`
- **Password :** `NewHorizon2024!`

## 🐛 Résolution des problèmes

### Erreur 500 sur `/api/auth/login`

1. **Vérifier que DATABASE_URL est configuré** dans Vercel
2. **Vérifier que la base de données contient les tables** (migrations)
3. **Vérifier qu'un utilisateur admin existe** dans la base

### Base de données vide

Exécuter le script de migration :
```bash
# En production (via Vercel Functions)
node scripts/migrate-to-cloud.js
```

### Problème de schéma

S'assurer que le bon schéma est utilisé :
- **Local :** `schema.prisma` (SQLite)
- **Vercel :** `schema.vercel.prisma` (PostgreSQL)

## 📝 Checklist de déploiement

- [ ] Base PostgreSQL créée
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Schéma PostgreSQL copié vers `schema.prisma`
- [ ] Migration exécutée
- [ ] Utilisateur admin créé
- [ ] Test de connexion réussi

## 🆘 Support

Si vous rencontrez des problèmes :

1. **Vérifier les logs Vercel** dans l'onglet Functions
2. **Tester l'API locally** avec PostgreSQL
3. **Vérifier la connexion** à la base de données

---

**Note :** SQLite ne fonctionne pas sur Vercel (serverless), d'où la nécessité d'utiliser PostgreSQL en production. 