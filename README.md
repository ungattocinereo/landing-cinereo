# Cinereo Landing Page

**Landing page per One-Pager Business Solutions**
Dominio: [landing.cinereo.it](https://landing.cinereo.it)

## 🎯 Caratteristiche Principali

- **LLM-Native Architecture**: Sito ottimizzato per ChatGPT, Google Gemini, Siri
- **Design Minimalista**: Estetica monochrome, digital brutalism, premium
- **Mobile-First**: Responsive design ottimizzato per dispositivi mobili
- **Performance**: Caricamento veloce, animazioni fluide
- **SEO Ottimizzato**: Meta tags, structured data per AI

## 🎨 Design Philosophy

Il design segue l'estetica di **Cinereo** (www.cinereo.it):
- Monochrome color palette (bianco/nero/grigio)
- Minimalismo e uso dello spazio negativo
- "Digital Brutalism" - linee pulite, tipografia bold
- Animazioni sottili e fluide
- Premium restraint

## 📋 Struttura della Pagina

1. **Hero Section** - Proposta di valore principale
2. **Reality Check** - Confronto con competitors (agenzie, Wix)
3. **LLM-Native Technology** - Spiegazione del vantaggio competitivo
4. **What's Included** - Features del pacchetto All-in-One
5. **Pricing** - Launch Pack (€290 setup)
6. **Use Cases** - Esempi per diversi tipi di business
7. **Contact Form** - Form con integrazione WhatsApp

## 💰 Pricing Strategy

- **Setup**: €290 (prezzo lancio)
- **Manutenzione**: €99/anno (dal 2° anno)
- **Delivery**: 72 ore (3 giorni lavorativi)
- **Garanzia**: Rimborso 100% se non soddisfatti

## 🛠 Stack Tecnologico

- **HTML5** - Struttura semantica
- **CSS3** - Custom styling, CSS Variables, Flexbox/Grid
- **Vanilla JavaScript** - No dependencies, performance-first
- **Google Fonts** - Inter font family
- **Mobile-First** - Responsive breakpoints

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Mobile: ≤ 768px
- Ottimizzato per thumb-zone su mobile

## 🚀 Deployment

### Hosting Consigliato
- Netlify (consigliato)
- Vercel
- GitHub Pages
- Server tradizionale con SSL

### Setup Rapido

1. **Clone repository**
```bash
git clone https://github.com/ungattocinereo/landing-cinereo.git
cd landing-cinereo
```

2. **Deploy su Netlify**
- Connetti repository GitHub
- Build command: (none - static site)
- Publish directory: `/`
- Deploy!

3. **Configurazione Dominio**
- Aggiungi dominio personalizzato: `landing.cinereo.it`
- Configura DNS records
- SSL automatico via Let's Encrypt

## ⚙️ Configurazione

### WhatsApp Integration

Modifica il numero WhatsApp in `script.js`:

```javascript
// Linea 48
const cinereoWhatsApp = '393331234567'; // Sostituisci con numero reale
```

### Meta Tags SEO

Personalizza i meta tags in `index.html`:

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

### Google Analytics (Opzionale)

Aggiungi prima di `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 SEO Keywords Target

- creazione siti web napoli
- sito vetrina economico
- sito web ia
- intelligenza artificiale sito web
- one pager business
- landing page professionale

## 📊 Performance Goals

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: > 90
- **Mobile Friendly**: 100%

## 🔒 Privacy & Legal

- Cookie policy (da implementare se necessario)
- GDPR compliance
- Privacy policy link nel footer

## 📝 Content Strategy

Tutti i testi sono in **italiano professionale**:
- Tono: Professionale ma accessibile
- Focus: Benefici, non features
- CTA: Chiari e diretti
- Social proof: Esempi realistici

## 🎨 Color Palette

```css
--color-black: #0a0a0a
--color-dark: #1a1a1a
--color-grey-dark: #2a2a2a
--color-grey: #666666
--color-grey-light: #a0a0a0
--color-white: #ffffff
--color-off-white: #f5f5f5
```

## 🔤 Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

## 📧 Form Handling

Il form invia i dati direttamente via WhatsApp utilizzando:
- Link `wa.me` con messaggio pre-compilato
- Validazione client-side
- Feedback utente immediato

## 🐛 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome Android

## 📦 File Structure

```
landing-cinereo/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # JavaScript interactions
├── README.md           # This file
├── robots.txt          # SEO crawler rules
└── .gitignore          # Git ignore patterns
```

## 🔄 Updates & Maintenance

- Aggiornare prezzi se necessario
- Testare form WhatsApp regolarmente
- Monitorare performance con Lighthouse
- Controllare broken links mensilmente

## 📞 Support

Per domande o supporto:
- **Website**: www.cinereo.it
- **Email**: info@cinereo.it
- **WhatsApp**: +39 333 123 4567

## 📄 License

© 2024 Cinereo. Tutti i diritti riservati.

---

**Built with ❤️ by Cinereo Team**
*Digital presence for the AI era*
