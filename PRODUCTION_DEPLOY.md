# Despliegue a Producción con HTTPS

## Conexión al Servidor

```bash
ssh -i fazes fazes@179.1.87.46
```

## Pasos para Desplegar

### 1. Detener contenedores actuales

```bash
cd ~/generador-QR
sudo docker-compose down
```

### 2. Obtener últimos cambios del repositorio

```bash
git pull origin master
```

### 3. Actualizar variables de entorno del Backend

```bash
nano ~/generador-QR/backend/.env
```

Asegúrate de que contenga:

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

### 4. Actualizar variables de entorno del Frontend

```bash
nano ~/generador-QR/frontend/.env
```

Asegúrate de que contenga:

```env
REACT_APP_API_URL=https://miboda.duckdns.org
REACT_APP_NAME=Galería de Boda
```

### 5. Actualizar Google Cloud Console

Ve a [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials)

Edita tu OAuth 2.0 Client ID y actualiza las URIs de redirección autorizadas:

```
https://miboda.duckdns.org/api/auth/google/callback
```

### 6. Desplegar con docker-compose de producción

```bash
cd ~/generador-QR
sudo docker-compose -f docker-compose.prod.yml up -d --build
```

### 7. Verificar logs

```bash
sudo docker-compose -f docker-compose.prod.yml logs -f
```

Para ver logs de un servicio específico:

```bash
sudo docker-compose -f docker-compose.prod.yml logs -f nginx
sudo docker-compose -f docker-compose.prod.yml logs -f backend
sudo docker-compose -f docker-compose.prod.yml logs -f frontend
```

### 8. Verificar que funciona

Abre en tu navegador:

- **Frontend**: https://miboda.duckdns.org
- **Backend API Stats**: https://miboda.duckdns.org/api/gallery/stats
- **Health Check**: https://miboda.duckdns.org/health

### 9. Verificar que HTTP redirige a HTTPS

```bash
curl -I http://miboda.duckdns.org
```

Deberías ver: `HTTP/1.1 301 Moved Permanently` con `Location: https://miboda.duckdns.org`

## Comandos Útiles

### Ver estado de los contenedores

```bash
sudo docker-compose -f docker-compose.prod.yml ps
```

### Reiniciar un servicio específico

```bash
sudo docker-compose -f docker-compose.prod.yml restart nginx
sudo docker-compose -f docker-compose.prod.yml restart backend
sudo docker-compose -f docker-compose.prod.yml restart frontend
```

### Reconstruir solo el backend o frontend

```bash
sudo docker-compose -f docker-compose.prod.yml up -d --build --no-deps backend
sudo docker-compose -f docker-compose.prod.yml up -d --build --no-deps frontend
```

### Detener todo

```bash
sudo docker-compose -f docker-compose.prod.yml down
```

## Renovación de Certificado SSL

El certificado se renueva automáticamente con el cron job configurado. Para renovar manualmente:

```bash
sudo docker-compose -f docker-compose.prod.yml stop nginx
sudo certbot renew
sudo docker-compose -f docker-compose.prod.yml start nginx
```

## Solución de Problemas

### Verificar certificados SSL

```bash
sudo certbot certificates
```

### Verificar puertos abiertos

```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

### Ver reglas del firewall

```bash
sudo ufw status
```

### Limpiar todo y empezar de nuevo

```bash
sudo docker-compose -f docker-compose.prod.yml down -v
sudo docker system prune -a
sudo docker-compose -f docker-compose.prod.yml up -d --build
```
