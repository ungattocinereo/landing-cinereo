# ⚡ Quick Start Guide - Cinereo Landing Page

Guida rapida per deploy immediato su Ubuntu 22.04.5 LTS

---

## 🚀 Deploy in 5 Minuti

### 1. Installa Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Clone Repository

```bash
cd ~
git clone https://github.com/ungattocinereo/landing-cinereo.git
cd landing-cinereo
```

### 3. Avvia

```bash
./start.sh
# oppure
docker compose up -d
```

### 4. Configura Firewall

```bash
sudo ufw allow 3003/tcp
```

### 5. Test

```bash
# Dal server
curl http://localhost:3003

# Dal browser
http://YOUR_SERVER_IP:3003
```

---

## 📋 Comandi Essenziali

```bash
# Avvia
docker compose up -d

# Ferma
docker compose down

# Riavvia
docker compose restart

# Logs
docker compose logs -f

# Stato
docker compose ps

# Rebuild dopo modifiche
docker compose up -d --build
```

---

## 🔧 Configurazione Rapida

### Cambia Porta

```bash
nano docker-compose.yml
# Modifica: "3003:80" in "8080:80"
docker compose up -d
```

### Verifica Contatti

```bash
grep "cinereoWhatsApp" script.js
# Output: const cinereoWhatsApp = '393270972329';
```

---

## 🌐 HTTPS con Dominio

```bash
# Installa nginx e certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# Configura reverse proxy
sudo nano /etc/nginx/sites-available/cinereo-landing
```

Aggiungi:
```nginx
server {
    listen 80;
    server_name landing.cinereo.it;
    location / {
        proxy_pass http://localhost:3003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/cinereo-landing /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL
sudo certbot --nginx -d landing.cinereo.it
```

---

## 🆘 Troubleshooting Rapido

**Container non parte?**
```bash
docker compose logs
docker compose down && docker compose up -d --build
```

**Porta occupata?**
```bash
sudo lsof -i :3003
# Cambia porta o uccidi processo
```

**Non accessibile dall'esterno?**
```bash
sudo ufw allow 3003/tcp
sudo ufw status
```

**Permission denied su Docker?**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

---

## 📞 Contatti

- Email: greg@cinereo.it
- WhatsApp: +39 327 097 2329
- Telegram: @cinereo

---

## 📖 Documentazione Completa

Per guida dettagliata step-by-step: [DEPLOYMENT.md](./DEPLOYMENT.md)
