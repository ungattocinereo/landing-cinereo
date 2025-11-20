# 🚀 Cinereo Landing Page - Deployment Guide

Guida completa per deploy su **Ubuntu 22.04.5 LTS** (testato su kernel 5.15.0-131-generic x86_64)

## ✅ Prerequisiti Verificati

Il progetto è stato testato e verificato per:
- **OS**: Ubuntu 22.04.5 LTS
- **Kernel**: Linux 5.15.0-131-generic x86_64
- **Docker**: 20.10+ o superiore
- **Docker Compose**: 2.0+ o superiore

---

## 📋 PASSO 1: Preparazione Server

### 1.1 Connessione al Server

```bash
# Connetti via SSH
ssh user@your-server-ip

# Oppure se usi chiave
ssh -i ~/.ssh/your-key.pem user@your-server-ip
```

### 1.2 Aggiorna il Sistema

```bash
# Update package list
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y

# Verifica versione Ubuntu
lsb_release -a
# Output atteso: Ubuntu 22.04.5 LTS

# Verifica kernel
uname -r
# Output atteso: 5.15.0-131-generic o simile
```

---

## 🐳 PASSO 2: Installazione Docker

### 2.1 Rimuovi Vecchie Versioni (se presenti)

```bash
sudo apt remove docker docker-engine docker.io containerd runc 2>/dev/null || true
```

### 2.2 Installa Docker

**Metodo 1: Script Automatico (Consigliato)**

```bash
# Download Docker install script
curl -fsSL https://get.docker.com -o get-docker.sh

# Esegui script
sudo sh get-docker.sh

# Pulisci
rm get-docker.sh
```

**Metodo 2: Repository APT**

```bash
# Install dependencies
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 2.3 Configura Docker per Utente Non-Root

```bash
# Aggiungi utente al gruppo docker
sudo usermod -aG docker $USER

# Applica le modifiche (richiede logout/login)
# Opzione 1: Logout e login nuovamente
exit
# poi riconnetti via SSH

# Opzione 2: Applica subito
newgrp docker
```

### 2.4 Verifica Installazione

```bash
# Verifica Docker
docker --version
# Output atteso: Docker version 24.0.x o superiore

# Verifica Docker Compose
docker compose version
# Output atteso: Docker Compose version v2.x.x o superiore

# Test Docker
docker run hello-world
# Output atteso: "Hello from Docker!"
```

### 2.5 Avvia Docker all'Avvio del Sistema

```bash
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker
```

---

## 📦 PASSO 3: Clone del Progetto

### 3.1 Installa Git (se necessario)

```bash
# Installa git
sudo apt install -y git

# Verifica
git --version
```

### 3.2 Clone Repository

```bash
# Naviga nella directory home o dove preferisci
cd ~

# Clone repository
git clone https://github.com/ungattocinereo/landing-cinereo.git

# Entra nella directory
cd landing-cinereo

# Verifica branch
git branch
# Output: * claude/cinereo-landing-page-01SbJ1Gpb3kYmA63Vi34neUQ

# Lista files
ls -la
```

Output atteso:
```
index.html
styles.css
script.js
robots.txt
sitemap.xml
Dockerfile
docker-compose.yml
nginx.conf
README.md
start.sh
stop.sh
```

---

## 🔧 PASSO 4: Configurazione (Opzionale)

### 4.1 Verifica Contatti WhatsApp

I contatti sono già configurati, ma puoi verificarli:

```bash
# Verifica numero WhatsApp in script.js
grep "cinereoWhatsApp" script.js
# Output: const cinereoWhatsApp = '393270972329';
```

### 4.2 Modifica Porta (se necessario)

Se la porta 3003 è già occupata:

```bash
# Verifica porte occupate
sudo netstat -tulpn | grep :3003

# Se occupata, modifica docker-compose.yml
nano docker-compose.yml

# Cambia la riga:
# ports:
#   - "3003:80"
# in:
# ports:
#   - "8080:80"  # o qualsiasi altra porta libera
```

### 4.3 Rendi Eseguibili gli Script

```bash
chmod +x start.sh stop.sh
```

---

## 🚀 PASSO 5: Build e Avvio

### 5.1 Build dell'Immagine Docker

```bash
# Build immagine
docker compose build

# Verifica immagine creata
docker images | grep cinereo
# Output: cinereo-landing    latest    ...    ~50MB
```

### 5.2 Avvia il Container

**Metodo 1: Con Script (Più Facile)**

```bash
./start.sh
```

**Metodo 2: Con Docker Compose**

```bash
docker compose up -d
```

**Metodo 3: Docker Manuale**

```bash
docker run -d \
  --name cinereo-landing \
  -p 3003:80 \
  --restart unless-stopped \
  cinereo-landing:latest
```

### 5.3 Verifica Avvio

```bash
# Verifica container in esecuzione
docker ps

# Output atteso:
# CONTAINER ID   IMAGE                    STATUS         PORTS                  NAMES
# abc123...      cinereo-landing:latest   Up 10 seconds  0.0.0.0:3003->80/tcp   cinereo-landing

# Verifica logs
docker compose logs -f
# Premi CTRL+C per uscire

# Verifica health
docker ps --format "table {{.Names}}\t{{.Status}}"
# Output: cinereo-landing    Up X minutes (healthy)
```

---

## 🌐 PASSO 6: Test del Sito

### 6.1 Test Locale dal Server

```bash
# Test con curl
curl http://localhost:3003

# Dovrebbe restituire HTML della landing page
# Se vedi <html>...<title>Cinereo</title>... = OK!

# Test con wget
wget -O - http://localhost:3003 | head -20
```

### 6.2 Test dall'Esterno

```bash
# Trova IP pubblico del server
curl ifconfig.me
# Output: 123.456.789.012

# Dal tuo computer locale, apri browser:
# http://123.456.789.012:3003
```

**NOTA**: Se non riesci ad accedere dall'esterno, configura il firewall (Passo 7).

---

## 🔥 PASSO 7: Configurazione Firewall

### 7.1 UFW (Ubuntu Firewall)

```bash
# Verifica stato UFW
sudo ufw status

# Se disattivo, abilita
sudo ufw enable

# Permetti SSH (IMPORTANTE!)
sudo ufw allow ssh
sudo ufw allow 22/tcp

# Permetti porta 3003
sudo ufw allow 3003/tcp

# Verifica regole
sudo ufw status numbered
```

### 7.2 iptables (alternativa)

```bash
# Permetti porta 3003
sudo iptables -A INPUT -p tcp --dport 3003 -j ACCEPT

# Salva regole
sudo netfilter-persistent save
```

### 7.3 Cloud Provider Firewall

Se usi AWS, Google Cloud, DigitalOcean, etc.:

- Vai nella console del provider
- Security Groups / Firewall Rules
- Aggiungi regola:
  - **Tipo**: Custom TCP
  - **Porta**: 3003
  - **Sorgente**: 0.0.0.0/0 (ovunque)

---

## 🔒 PASSO 8: Configurazione HTTPS (con Dominio)

### 8.1 Prerequisiti

- Dominio registrato (es. landing.cinereo.it)
- DNS puntato al tuo server IP

### 8.2 Installa Nginx Reverse Proxy

```bash
# Installa nginx
sudo apt install -y nginx

# Verifica
nginx -v
```

### 8.3 Configura Reverse Proxy

```bash
# Crea configurazione
sudo nano /etc/nginx/sites-available/cinereo-landing

# Incolla questa configurazione:
```

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

```bash
# Abilita sito
sudo ln -s /etc/nginx/sites-available/cinereo-landing /etc/nginx/sites-enabled/

# Test configurazione
sudo nginx -t

# Riavvia nginx
sudo systemctl restart nginx
```

### 8.4 Installa SSL con Let's Encrypt

```bash
# Installa certbot
sudo apt install -y certbot python3-certbot-nginx

# Ottieni certificato SSL
sudo certbot --nginx -d landing.cinereo.it

# Segui le istruzioni interattive
# Email: greg@cinereo.it
# Accetta Terms: Yes
# Redirect HTTP to HTTPS: Yes (opzione 2)

# Verifica SSL
sudo certbot certificates

# Test rinnovo automatico
sudo certbot renew --dry-run
```

### 8.5 Configura Auto-Renewal

```bash
# Certbot aggiunge automaticamente un cron job
# Verifica:
sudo systemctl status certbot.timer

# Manualmente puoi aggiungere:
sudo crontab -e
# Aggiungi:
# 0 3 * * * certbot renew --quiet
```

---

## 📊 PASSO 9: Monitoraggio e Manutenzione

### 9.1 Comandi Utili

```bash
# Verifica stato
docker compose ps

# Visualizza logs in tempo reale
docker compose logs -f

# Visualizza logs ultimi 50 righe
docker compose logs --tail=50

# Riavvia container
docker compose restart

# Ferma container
docker compose down
# oppure
./stop.sh

# Riavvia dopo modifiche
docker compose up -d --build

# Verifica risorse utilizzate
docker stats cinereo-landing

# Pulisci vecchie immagini
docker system prune -a
```

### 9.2 Health Check

```bash
# Verifica health del container
docker inspect --format='{{.State.Health.Status}}' cinereo-landing
# Output: healthy

# Script di monitoring (crea file)
nano /home/user/check-cinereo.sh
```

```bash
#!/bin/bash
if curl -f http://localhost:3003 > /dev/null 2>&1; then
    echo "✅ Cinereo Landing: OK"
else
    echo "❌ Cinereo Landing: DOWN - Restarting..."
    cd /home/user/landing-cinereo
    docker compose restart
fi
```

```bash
# Rendi eseguibile
chmod +x /home/user/check-cinereo.sh

# Aggiungi a cron (ogni 5 minuti)
crontab -e
# Aggiungi:
# */5 * * * * /home/user/check-cinereo.sh >> /var/log/cinereo-check.log 2>&1
```

### 9.3 Backup

```bash
# Backup completo progetto
tar -czf cinereo-landing-backup-$(date +%Y%m%d).tar.gz ~/landing-cinereo

# Lista backups
ls -lh ~/*.tar.gz

# Restore da backup
tar -xzf cinereo-landing-backup-20241120.tar.gz
```

---

## 🔄 PASSO 10: Aggiornamento Progetto

### 10.1 Pull Nuove Modifiche

```bash
cd ~/landing-cinereo

# Ferma container
docker compose down

# Pull modifiche
git pull origin claude/cinereo-landing-page-01SbJ1Gpb3kYmA63Vi34neUQ

# Rebuild e riavvia
docker compose up -d --build

# Verifica
docker compose logs -f
```

### 10.2 Modifica Contenuti

```bash
# Modifica file HTML/CSS/JS
nano index.html

# Rebuild
docker compose up -d --build

# Oppure senza rebuild (se solo HTML/CSS/JS):
docker compose restart
```

---

## ⚠️ Troubleshooting

### Problema: "Permission denied" su Docker

```bash
# Soluzione: Aggiungi utente a gruppo docker
sudo usermod -aG docker $USER
newgrp docker
```

### Problema: Porta 3003 già occupata

```bash
# Trova processo che usa la porta
sudo lsof -i :3003
# oppure
sudo netstat -tulpn | grep :3003

# Uccidi processo (se necessario)
sudo kill -9 PID

# Oppure cambia porta in docker-compose.yml
```

### Problema: Container non parte

```bash
# Verifica logs dettagliati
docker compose logs

# Verifica configurazione
docker compose config

# Rebuild da zero
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Problema: Cannot connect from outside

```bash
# 1. Verifica firewall
sudo ufw status

# 2. Verifica container
docker ps

# 3. Verifica bind address
netstat -tulpn | grep :3003
# Dovrebbe mostrare 0.0.0.0:3003 (non 127.0.0.1:3003)

# 4. Verifica cloud provider security groups
```

### Problema: SSL non funziona

```bash
# Verifica DNS
dig landing.cinereo.it

# Verifica nginx
sudo nginx -t
sudo systemctl status nginx

# Rigenera certificato
sudo certbot delete --cert-name landing.cinereo.it
sudo certbot --nginx -d landing.cinereo.it
```

---

## 📞 Support

In caso di problemi:

- **Email**: greg@cinereo.it
- **WhatsApp**: +39 327 097 2329
- **Telegram**: @cinereo
- **GitHub Issues**: https://github.com/ungattocinereo/landing-cinereo/issues

---

## ✅ Checklist Finale

Dopo il deployment, verifica:

- [ ] Container Docker running (`docker ps`)
- [ ] Health check OK (`docker inspect cinereo-landing`)
- [ ] Sito accessibile da localhost (`curl localhost:3003`)
- [ ] Sito accessibile dall'esterno (`http://your-ip:3003`)
- [ ] Form WhatsApp funzionante
- [ ] Link Telegram funzionanti
- [ ] Email links funzionanti
- [ ] Responsive su mobile (test con browser DevTools)
- [ ] HTTPS configurato (se con dominio)
- [ ] SSL certificate valido (se con dominio)
- [ ] Auto-restart configurato (`docker ps` mostra "restart: unless-stopped")
- [ ] Firewall configurato (`sudo ufw status`)
- [ ] Backup creato

---

## 🎉 Deploy Completato!

Il tuo sito Cinereo Landing Page è ora live e accessibile!

**URL di accesso**:
- HTTP: `http://your-server-ip:3003`
- HTTPS (con dominio): `https://landing.cinereo.it`

**Performance attese**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

Buon lavoro! 🚀
