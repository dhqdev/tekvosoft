#!/bin/bash

echo "=== Deploy Tekvosoft ==="
echo "Iniciando deploy em $(date)"

# Parar aplicação
echo "Parando backend..."
pm2 stop tekvosoft-backend

# Backup do banco de dados
echo "Fazendo backup do banco de dados..."
sudo -u postgres pg_dump tekvosoft > /home/backups/tekvosoft_$(date +%Y%m%d_%H%M%S).sql

# Atualizar código
echo "Atualizando código..."
cd /home/codatendechat-main
git pull

# Backend
echo "Atualizando backend..."
cd /home/codatendechat-main/backend
npm install --force
npm run build
npx sequelize db:migrate
npx sequelize db:seed:all

# Frontend  
echo "Atualizando frontend..."
cd /home/codatendechat-main/frontend
npm install --force
npm run build

# Reiniciar serviços
echo "Reiniciando serviços..."
pm2 start tekvosoft-backend
sudo systemctl reload nginx

echo "Deploy concluído em $(date)"

# Verificar status
pm2 status
