# Guía de Despliegue en Servidor

Esta guía te ayudará a desplegar la aplicación de Galería de Boda en tu servidor Linux.

## Puertos Configurados

La aplicación ha sido configurada para usar los siguientes puertos disponibles en tu servidor:

- **Backend (API)**: Puerto `3000`
- **Frontend (Web)**: Puerto `8081`

Estos puertos están libres según el análisis de tu servidor y no entran en conflicto con los servicios existentes.

## Requisitos Previos

1. **Docker y Docker Compose** instalados
2. **Git** instalado
3. **Credenciales de Google Drive API** configuradas

## Pasos de Despliegue

### 1. Conectarse al Servidor

```bash
ssh tu_usuario@tu_servidor
```

### 2. Clonar el Repositorio

```bash
cd /home/tu_usuario
git clone git@github.com:hernancely/generador-QR.git
cd generador-QR
```

### 3. Configurar Variables de Entorno

#### Backend (.env)

```bash
cd backend
nano .env
```

Actualiza las siguientes variables con tus credenciales de Google:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=http://tu-dominio.com:8081

# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=TU_FOLDER_ID_AQUI

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUI
GOOGLE_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI
GOOGLE_REDIRECT_URI=http://tu-dominio.com:3000/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=TU_REFRESH_TOKEN_AQUI

# Application URL for QR Code
APP_URL=http://tu-dominio.com:8081

# File Upload Configuration
MAX_FILE_SIZE=104857600
MAX_FILES_PER_UPLOAD=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,image/gif,image/webp,video/mp4,video/quicktime,video/x-msvideo
```

#### Frontend (.env)

```bash
cd ../frontend
nano .env
```

```env
REACT_APP_API_URL=http://tu-dominio.com:3000
REACT_APP_NAME=Galería de Boda
```

### 4. Construir e Iniciar la Aplicación

Desde el directorio raíz del proyecto:

```bash
cd /home/tu_usuario/generador-QR

# Construir e iniciar en modo detached
docker-compose up -d --build

# Ver los logs
docker-compose logs -f
```

### 5. Verificar que la Aplicación Esté Corriendo

```bash
# Verificar contenedores activos
docker ps

# Verificar backend
curl http://localhost:3000/health

# Verificar frontend
curl http://localhost:8081
```

### 6. Configurar Firewall (Opcional pero Recomendado)

Si quieres que la aplicación sea accesible desde internet, abre los puertos:

```bash
# Para UFW (Ubuntu/Debian)
sudo ufw allow 3000/tcp
sudo ufw allow 8081/tcp
sudo ufw reload

# Para iptables
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8081 -j ACCEPT
sudo iptables-save
```

## Acceso a la Aplicación

Una vez desplegada, podrás acceder a:

- **Frontend (Galería)**: `http://tu-ip-servidor:8081`
- **Backend (API)**: `http://tu-ip-servidor:3000`
- **Health Check**: `http://tu-ip-servidor:3000/health`

## Generar Código QR

```bash
# Desde el navegador
http://tu-ip-servidor:3000/api/qr/generate?format=dataurl

# O usando curl
curl http://tu-ip-servidor:3000/api/qr/generate > qr-info.json
```

El código QR se guardará en la carpeta `qr-codes/` del proyecto.

## Comandos Útiles de Docker

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs solo del backend
docker-compose logs -f backend

# Ver logs solo del frontend
docker-compose logs -f frontend

# Detener la aplicación
docker-compose down

# Reiniciar la aplicación
docker-compose restart

# Reconstruir y reiniciar
docker-compose up -d --build

# Ver estado de los contenedores
docker-compose ps

# Limpiar todo (cuidado, borra volúmenes)
docker-compose down -v
```

## Actualizar la Aplicación

```bash
# Ir al directorio del proyecto
cd /home/tu_usuario/generador-QR

# Obtener últimos cambios
git pull origin master

# Reconstruir e iniciar
docker-compose down
docker-compose up -d --build
```

## Configuración de Dominio (Recomendado para Producción)

### Opción 1: Usar IP del Servidor

Si no tienes dominio, puedes usar la IP directamente:

```env
# backend/.env
FRONTEND_URL=http://TU_IP_PUBLICA:8081
APP_URL=http://TU_IP_PUBLICA:8081
GOOGLE_REDIRECT_URI=http://TU_IP_PUBLICA:3000/api/auth/google/callback

# frontend/.env
REACT_APP_API_URL=http://TU_IP_PUBLICA:3000
```

### Opción 2: Usar Dominio con Nginx Reverse Proxy

Si tienes un dominio, puedes usar Nginx como proxy:

```nginx
# /etc/nginx/sites-available/wedding-gallery
server {
    listen 80;
    server_name tu-dominio.com;

    # Frontend
    location / {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Luego habilita el sitio:

```bash
sudo ln -s /etc/nginx/sites-available/wedding-gallery /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Monitoreo y Mantenimiento

### Ver uso de recursos

```bash
docker stats
```

### Ver espacio en disco usado por Docker

```bash
docker system df
```

### Limpiar recursos no usados

```bash
docker system prune -a
```

## Troubleshooting

### Problema: Contenedor no inicia

```bash
# Ver logs del contenedor
docker-compose logs backend
docker-compose logs frontend

# Verificar configuración
docker-compose config
```

### Problema: Puerto ya en uso

Si por alguna razón los puertos están ocupados, puedes cambiarlos:

```bash
# Editar docker-compose.yml
nano docker-compose.yml

# Cambiar los puertos en la sección 'ports'
# Por ejemplo, usar 5000 para backend y 8084 para frontend
```

### Problema: Error de CORS

Asegúrate de que `FRONTEND_URL` en el backend apunte a la URL correcta del frontend.

### Problema: Google Drive no funciona

1. Verifica que las credenciales sean correctas
2. Verifica que el Folder ID sea válido
3. Regenera el refresh token si es necesario

## Seguridad

### Recomendaciones importantes:

1. **Nunca expongas el archivo .env** - está en `.gitignore`
2. **Usa HTTPS en producción** - configura Let's Encrypt
3. **Actualiza regularmente** las dependencias
4. **Monitorea los logs** regularmente
5. **Haz backups** de la carpeta de Google Drive

### Configurar HTTPS con Let's Encrypt (Recomendado)

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

## Backup y Restauración

### Backup de códigos QR generados

```bash
tar -czf qr-codes-backup.tar.gz qr-codes/
```

### Backup de configuración

```bash
tar -czf config-backup.tar.gz backend/.env frontend/.env
```

## Soporte

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado: `docker-compose ps`
3. Revisa la conectividad: `curl http://localhost:3000/health`
4. Verifica los puertos: `netstat -tlnp | grep -E '3000|8081'`

## Resumen de URLs

| Servicio | URL Local | URL Producción |
|----------|-----------|----------------|
| Frontend | http://localhost:8081 | http://tu-dominio.com:8081 |
| Backend API | http://localhost:3000 | http://tu-dominio.com:3000 |
| Health Check | http://localhost:3000/health | http://tu-dominio.com:3000/health |
| QR Generator | http://localhost:3000/api/qr/generate | http://tu-dominio.com:3000/api/qr/generate |

---

**Nota**: Reemplaza `tu-dominio.com` o `TU_IP_PUBLICA` con tu dominio real o IP pública del servidor.
