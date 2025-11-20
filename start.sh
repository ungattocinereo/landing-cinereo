#!/bin/bash

# Cinereo Landing Page - Quick Start Script
# Avvia il container Docker sulla porta 3003

echo "🚀 Cinereo Landing Page - Docker Startup"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker non è installato!"
    echo "   Installa Docker da: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if docker compose is available
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    echo "❌ Docker Compose non è disponibile!"
    echo "   Installa Docker Compose da: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker trovato"
echo "📦 Avvio container sulla porta 3003..."
echo ""

# Stop existing container if running
$DOCKER_COMPOSE_CMD down 2>/dev/null

# Build and start
$DOCKER_COMPOSE_CMD up -d --build

# Check if successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Container avviato con successo!"
    echo ""
    echo "🌐 Apri il browser su:"
    echo "   http://localhost:3003"
    echo ""
    echo "📋 Comandi utili:"
    echo "   $DOCKER_COMPOSE_CMD logs -f     # Visualizza logs"
    echo "   $DOCKER_COMPOSE_CMD ps          # Stato container"
    echo "   $DOCKER_COMPOSE_CMD down        # Ferma container"
    echo "   $DOCKER_COMPOSE_CMD restart     # Riavvia"
    echo ""
else
    echo ""
    echo "❌ Errore nell'avvio del container"
    echo "   Controlla i logs con: $DOCKER_COMPOSE_CMD logs"
    exit 1
fi
