#!/bin/bash

echo "=== Status do Sistema Tekvosoft ==="
echo "Data: $(date)"
echo ""

echo "--- Serviços ---"
echo "Nginx:"
sudo systemctl is-active nginx
echo "PostgreSQL:"
sudo systemctl is-active postgresql
echo "Redis:"
sudo systemctl is-active redis-server
echo ""

echo "--- PM2 Processes ---"
pm2 status --no-color
echo ""

echo "--- Docker Containers ---"
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

echo "--- Espaço em Disco ---"
df -h /
echo ""

echo "--- Memoria ---"
free -h
echo ""

echo "--- SSL Certificates ---"
sudo certbot certificates
echo ""

echo "--- Backend Health Check ---"
curl -s -o /dev/null -w "Backend Status: %{http_code}\n" http://localhost:3000 || echo "Backend: OFFLINE"
echo ""

echo "--- Frontend Health Check ---"
curl -s -o /dev/null -w "Frontend Status: %{http_code}\n" http://localhost || echo "Frontend: OFFLINE"
