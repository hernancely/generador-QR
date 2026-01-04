# Configuración SSL con Let's Encrypt y DuckDNS

Esta guía te ayudará a configurar HTTPS en tu aplicación usando Let's Encrypt y DuckDNS.

## Requisitos
- Dominio DuckDNS configurado: `miboda.duckdns.org`
- IP pública apuntando al servidor: `179.1.87.46`

## Pasos de Configuración

### 1. Detener los contenedores

```bash
cd ~/generador-QR
sudo docker-compose down
```

### 2. Instalar Certbot

```bash
sudo apt update
sudo apt install certbot -y
```

### 3. Obtener certificado SSL de Let's Encrypt

```bash
sudo certbot certonly --standalone -d miboda.duckdns.org \
  --email hernan.cely1@gmail.com \
  --agree-tos \
  --no-eff-email
```

Los certificados se guardarán en:
- Certificado: `/etc/letsencrypt/live/miboda.duckdns.org/fullchain.pem`
- Clave privada: `/etc/letsencrypt/live/miboda.duckdns.org/privkey.pem`

### 4. Crear configuración de Nginx

```bash
mkdir -p ~/generador-QR/nginx
nano ~/generador-QR/nginx/nginx.conf
```

Pega el siguiente contenido:

```nginx
server {
    listen 80;
    server_name miboda.duckdns.org;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name miboda.duckdns.org;

    ssl_certificate /etc/letsencrypt/live/miboda.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/miboda.duckdns.org/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Frontend
    location / {
        proxy_pass http://frontend:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check
    location /health {
        proxy_pass http://backend:3000;
    }
}
```

### 5. Actualizar variables de entorno

Edita el archivo `.env` del backend:

```bash
nano ~/generador-QR/backend/.env
```

Actualiza las URLs a HTTPS:

```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://miboda.duckdns.org

GOOGLE_DRIVE_FOLDER_ID=TU_FOLDER_ID
GOOGLE_CLIENT_ID=TU_CLIENT_ID
GOOGLE_CLIENT_SECRET=TU_CLIENT_SECRET
GOOGLE_REDIRECT_URI=https://miboda.duckdns.org/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=TU_REFRESH_TOKEN

APP_URL=https://miboda.duckdns.org
MAX_FILE_SIZE=104857600
MAX_FILES_PER_UPLOAD=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,image/gif,image/webp,video/mp4,video/quicktime,video/x-msvideo
```

Edita el archivo `.env` del frontend:

```bash
nano ~/generador-QR/frontend/.env
```

```env
REACT_APP_API_URL=https://miboda.duckdns.org
REACT_APP_NAME=Galería de Boda
```

### 6. Actualizar Google Cloud Console

Ve a [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials)

Edita tu OAuth 2.0 Client ID y actualiza las URIs de redirección:

```
https://miboda.duckdns.org/api/auth/google/callback
```

### 7. Iniciar con docker-compose de producción

```bash
cd ~/generador-QR
git pull origin master
sudo docker-compose -f docker-compose.prod.yml up -d --build
```

### 8. Verificar que funciona

- Frontend: https://miboda.duckdns.org
- Backend API: https://miboda.duckdns.org/api/gallery/stats
- Health Check: https://miboda.duckdns.org/health

### 9. Configurar renovación automática

Los certificados de Let's Encrypt expiran cada 90 días. Configura renovación automática:

```bash
# Probar renovación
sudo certbot renew --dry-run

# Crear cron job para renovación automática
sudo crontab -e
```

Agrega esta línea:
```
0 3 * * * /usr/bin/certbot renew --quiet && docker-compose -f /home/fazes/generador-QR/docker-compose.prod.yml restart nginx
```

## Solución de problemas

### Error: Puerto 80/443 en uso

```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
sudo killall nginx
```

### Renovar certificado manualmente

```bash
sudo docker-compose -f docker-compose.prod.yml stop nginx
sudo certbot renew
sudo docker-compose -f docker-compose.prod.yml start nginx
```

### Ver logs

```bash
sudo docker-compose -f docker-compose.prod.yml logs -f nginx
sudo docker-compose -f docker-compose.prod.yml logs -f backend
sudo docker-compose -f docker-compose.prod.yml logs -f frontend
```

## URLs Finales

- **Aplicación**: https://miboda.duckdns.org
- **API**: https://miboda.duckdns.org/api
- **QR Generator**: https://miboda.duckdns.org/api/qr/generate?format=dataurl

El código QR generado apuntará a: `https://miboda.duckdns.org`
