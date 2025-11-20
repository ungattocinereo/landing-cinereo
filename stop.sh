#!/bin/bash

# Cinereo Landing Page - Stop Script
# Ferma il container Docker

echo "🛑 Cinereo Landing Page - Stopping..."
echo "======================================"
echo ""

# Check if docker compose is available
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    echo "❌ Docker Compose non disponibile"
    exit 1
fi

# Stop container
$DOCKER_COMPOSE_CMD down

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Container fermato con successo!"
    echo ""
else
    echo ""
    echo "❌ Errore nel fermare il container"
    exit 1
fi
