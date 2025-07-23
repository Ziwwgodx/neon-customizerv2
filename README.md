# LumiNéon Studio - Personnalisateur de Néons LED

Une application complète pour la personnalisation de néons LED en temps réel avec rendu visuel réaliste.

## 🌟 Fonctionnalités

### Frontend React
- **Interface premium** avec design dark mode et palette néon vibrante
- **Customizer temps réel** avec aperçu instantané
- **Effets de glow réalistes** simulant des vrais néons LED
- **Sélecteurs avancés** : couleurs (18 options), effets, tailles, supports, montage
- **Export PNG haute résolution** avec qualité professionnelle
- **Sauvegarde locale** des designs personnalisés
- **Animations fluides** avec Framer Motion
- **Design responsive** adapté mobile/tablet/desktop

### Backend Mock (Netlify Functions)
- **mockAuth.js** : Simulation authentification OAuth Shopify
- **createProduct.js** : Création de produits Shopify simulée
- **uploadImage.js** : Upload et sauvegarde d'images PNG
- **Testable en local** avec `netlify dev`

## 🚀 Installation & Lancement

```bash
# Installation des dépendances
npm install

# Lancement du frontend (dev)
npm run dev

# Lancement du backend mock (dans un autre terminal)
npx netlify dev
```

## 🎨 Technologies Utilisées

- **React 18** + TypeScript
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **Konva.js** pour le canvas de rendu
- **Netlify Functions** pour le backend mock
- **Local Storage** pour la persistance temporaire

## 🖼️ Rendu Néon Réaliste

L'application génère des effets de glow néon authentiques :
- **Lueur diffuse multi-couches** avec opacité dégradée
- **Couleurs dynamiques** selon la sélection utilisateur
- **Effets d'éclairage** : statique, clignotant, dégradé, fade
- **Backgrounds réalistes** : brique, béton, intérieur
- **Shadow mapping** et inner glow pour plus de réalisme

## 🛠️ Architecture

```
/
├── src/
│   ├── components/
│   │   ├── Customizer.tsx (composant principal)
│   │   ├── TextInput.tsx
│   │   ├── ColorPicker.tsx (18 couleurs LED)
│   │   ├── EffectSelector.tsx (4 effets)
│   │   ├── SizeSelector.tsx
│   │   ├── SupportSelector.tsx (acrylique)
│   │   ├── MountingSelector.tsx (5 options)
│   │   ├── PreviewCanvas.tsx (rendu temps réel)
│   │   ├── ExportButton.tsx (PNG export)
│   │   └── SaveDesign.tsx (localStorage)
│   └── App.tsx
├── netlify/functions/
│   ├── mockAuth.js
│   ├── createProduct.js
│   └── uploadImage.js
├── .env.example
└── netlify.toml
```

## 🎯 API Mock Endpoints

### Authentification
```
GET /.netlify/functions/mockAuth
→ Retourne un token Shopify fictif
```

### Création Produit
```
POST /.netlify/functions/createProduct
Body: { text, color, effect, width, height, support, mounting }
→ Retourne un produit Shopify simulé avec prix calculé
```

### Upload Image
```
POST /.netlify/functions/uploadImage
Body: { image: "data:image/png;base64,...", filename, designId }
→ Sauvegarde l'image PNG localement
```

## 🎨 Palette de Couleurs

- **Pink Néon** : #FF006E
- **Purple Néon** : #8338EC  
- **Blue Néon** : #3A86FF
- **Green Néon** : #06FFA5
- **Yellow Néon** : #FFD60A
- **Orange Néon** : #FF4500
- + 12 couleurs supplémentaires

## 📱 Responsive Design

- **Mobile** : 320px+ (design adapté tactile)
- **Tablet** : 768px+ (interface optimisée)
- **Desktop** : 1024px+ (expérience complète)

## 🔧 Configuration

Copiez `.env.example` vers `.env` et renseignez vos clés :
- Shopify API credentials
- Supabase (optionnel)
- SMTP settings (optionnel)

## 🎪 Démo

L'application offre une expérience immersive de personnalisation de néons LED avec :
- Prévisualisation temps réel haute fidélité
- Interface intuitive et professionnelle
- Export prêt pour production
- Intégration e-commerce simulée

---

**Inspiré par** : lumineonshop.com et autres leaders du néon LED personnalisé.
**Objectif** : Démonstration d'une application e-commerce premium pour néons LED.