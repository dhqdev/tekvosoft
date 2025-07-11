# Tekvosoft - Configuração do Servidor

## Informações do Servidor
- **IP:** 5.189.158.134
- **Domínios:**
  - Backend: https://back.tekvosoft.com
  - Frontend: https://front.tekvosoft.com

## Serviços Instalados
- Node.js 20.19.3
- PostgreSQL 12
- Redis (Docker)
- Nginx
- PM2
- Certbot (Let's Encrypt SSL)

## Estrutura de Diretórios
```
/home/codatendechat-main/
├── backend/          # API Express.js
├── frontend/         # React.js App
├── monitor.sh        # Script de monitoramento
├── deploy.sh         # Script de deploy
└── ecosystem.config.json # Configuração PM2
```

## Configurações do Banco de Dados
- **Database:** tekvosoft
- **Username:** tekvosoft
- **Password:** tekvosoft123
- **Port:** 5432

## Configurações do Redis
- **Container:** redis-tekvosoft
- **Port:** 6380
- **Password:** tekvosoft123

## Comandos Úteis

### Monitoramento
```bash
# Status geral do sistema
/home/codatendechat-main/monitor.sh

# Status PM2
pm2 status

# Logs do backend
pm2 logs tekvosoft-backend

# Status dos serviços
sudo systemctl status nginx postgresql redis-server
```

### Gerenciamento PM2
```bash
# Reiniciar backend
pm2 restart tekvosoft-backend

# Parar backend
pm2 stop tekvosoft-backend

# Iniciar backend
pm2 start tekvosoft-backend

# Salvar configuração PM2
pm2 save
```

### Deploy
```bash
# Deploy automático
/home/codatendechat-main/deploy.sh
```

### SSL
```bash
# Verificar certificados
sudo certbot certificates

# Renovar certificados
sudo certbot renew

# Teste de renovação
sudo certbot renew --dry-run
```

### Backup do Banco
```bash
# Backup manual
sudo -u postgres pg_dump tekvosoft > backup_$(date +%Y%m%d).sql

# Restaurar backup
sudo -u postgres psql tekvosoft < backup_file.sql
```

## URLs de Acesso
- **Frontend:** https://front.tekvosoft.com
- **Backend API:** https://back.tekvosoft.com
- **Admin:** Acesse o frontend para configurar admin

## Configuração DNS
Certifique-se de que os DNS estão apontando para o IP 5.189.158.134:
- back.tekvosoft.com A 5.189.158.134
- front.tekvosoft.com A 5.189.158.134

## Logs
- **PM2 Logs:** /var/log/pm2/
- **Nginx Logs:** /var/log/nginx/
- **SSL Logs:** /var/log/letsencrypt/

## Primeiros Passos
1. Acesse https://front.tekvosoft.com
2. Configure o primeiro usuário administrador
3. Configure as integrações do WhatsApp
4. Configure e-mail SMTP (se necessário)

## Suporte
Para problemas, verifique os logs:
```bash
pm2 logs tekvosoft-backend
sudo tail -f /var/log/nginx/error.log
```
