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

### 🐳 Docker (Consigliato per Sviluppo/Produzione)

Il metodo più veloce per avviare la landing page localmente o su server.

#### Requisiti
- Docker installato ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose installato (incluso in Docker Desktop)

#### Avvio Rapido

```bash
# 1. Clone repository
git clone https://github.com/ungattocinereo/landing-cinereo.git
cd landing-cinereo

# 2. Avvia con Docker Compose
docker-compose up -d

# 3. Apri il browser
# http://localhost:3003
```

La landing page sarà disponibile su **http://localhost:3003** 🚀

#### Comandi Docker Utili

```bash
# Avvia i container
docker-compose up -d

# Ferma i container
docker-compose down

# Visualizza logs
docker-compose logs -f

# Ricostruisci dopo modifiche
docker-compose up -d --build

# Verifica stato container
docker-compose ps

# Riavvia container
docker-compose restart
```

#### Build Manuale Docker

```bash
# Build immagine
docker build -t cinereo-landing:latest .

# Run container sulla porta 3003
docker run -d \
  --name cinereo-landing \
  -p 3003:80 \
  --restart unless-stopped \
  cinereo-landing:latest

# Ferma container
docker stop cinereo-landing

# Rimuovi container
docker rm cinereo-landing
```

#### Configurazione Porta

Per cambiare la porta (esempio 8080), modifica `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Cambia 3003 in 8080
```

#### Deploy Docker in Produzione

**VPS/Server Linux:**
```bash
# 1. Installa Docker sul server
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 2. Clone repository
git clone https://github.com/ungattocinereo/landing-cinereo.git
cd landing-cinereo

# 3. (Opzionale) Verifica contatti in script.js
# Il numero WhatsApp è già configurato (+39 327 097 2329)
# Se necessario, modifica linea 76

# 4. Avvia con Docker Compose
docker-compose up -d

# 5. Configura reverse proxy (Nginx/Traefik) per SSL
```

**Con Nginx Reverse Proxy:**
```nginx
server {
    listen 80;
    server_name landing.cinereo.it;

    location / {
        proxy_pass http://localhost:3003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### ☁️ Hosting Cloud (Alternative)

#### Netlify
- Connetti repository GitHub
- Build command: (none - static site)
- Publish directory: `/`
- Deploy automatico ad ogni push

#### Vercel
```bash
npm i -g vercel
vercel --prod
```

#### GitHub Pages
```bash
# Abilita GitHub Pages nelle impostazioni repository
# Branch: main, Folder: / (root)
```

### 🖥️ Server Tradizionale
- Upload via FTP/SSH
- Webserver: Apache/Nginx
- SSL: Let's Encrypt (certbot)

## ⚙️ Configurazione

### WhatsApp Integration

Il numero WhatsApp è già configurato in `script.js` (linea 76):

```javascript
// Cinereo WhatsApp number
const cinereoWhatsApp = '393270972329';
```

Se necessario modificare, aggiorna questa linea con il nuovo numero.

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
├── robots.txt          # SEO crawler rules
├── sitemap.xml         # XML sitemap for search engines
├── README.md           # Documentation
├── .gitignore          # Git ignore patterns
├── Dockerfile          # Docker image configuration
├── docker-compose.yml  # Docker Compose orchestration
├── .dockerignore       # Docker build ignore patterns
└── nginx.conf          # Nginx web server configuration
```

## 🔄 Updates & Maintenance

- Aggiornare prezzi se necessario
- Testare form WhatsApp regolarmente
- Monitorare performance con Lighthouse
- Controllare broken links mensilmente

## 📞 Support

Per domande o supporto:
- **Website**: www.cinereo.it
- **Email**: greg@cinereo.it
- **WhatsApp**: +39 327 097 2329
- **Telegram**: @cinereo

## 📄 License

© 2024 Cinereo. Tutti i diritti riservati.

---

**Built with ❤️ by Cinereo Team**
*Digital presence for the AI era*
