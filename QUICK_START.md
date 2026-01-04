# Inicio Rápido

Esta guía te permite tener la aplicación corriendo en **menos de 10 minutos** si ya tienes las credenciales de Google.

## Prerequisitos Rápidos

- [x] Docker Desktop instalado
- [x] Credenciales de Google Drive API (ver SETUP_GUIDE.md si no las tienes)

## 3 Pasos para Iniciar

### 1. Configurar Variables de Entorno (2 minutos)

```bash
# Backend
cd backend
cp .env.example .env
```

Edita `backend/.env` y completa:
```env
GOOGLE_DRIVE_FOLDER_ID=tu_folder_id
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_REFRESH_TOKEN=tu_refresh_token
```

```bash
# Frontend
cd ../frontend
cp .env.example .env
# No necesitas editar nada si usas configuración por defecto
```

### 2. Iniciar con Docker (5 minutos)

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

Espera a que termine de construir (la primera vez toma ~5 minutos).

### 3. Abrir la Aplicación (instantáneo)

Abre tu navegador en:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

¡Listo! La aplicación está corriendo.

## Prueba Rápida

### 1. Generar Código QR

Visita en tu navegador:
```
http://localhost:5000/api/qr/generate?format=dataurl
```

Copia el `dataURL` de la respuesta, pégalo en la barra de direcciones y guarda la imagen.

### 2. Subir una Foto de Prueba

1. Ve a http://localhost:3000
2. Haz scroll hasta "Comparte Tus Fotos y Videos"
3. Arrastra una imagen o haz clic para seleccionar
4. Haz clic en "Subir"
5. Espera la confirmación

### 3. Verificar en Google Drive

1. Abre tu carpeta de Google Drive
2. Deberías ver la imagen que acabas de subir

### 4. Ver la Galería

1. Haz scroll hasta la sección "Galería de Recuerdos"
2. Deberías ver la imagen que subiste
3. Haz clic en la imagen para ampliarla

## Comandos Útiles

### Ver Logs
```bash
docker-compose logs -f
```

### Detener Aplicación
```bash
docker-compose down
```

### Reiniciar Aplicación
```bash
docker-compose restart
```

### Reconstruir Completamente
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Solución Rápida de Problemas

### "Cannot connect to backend"
```bash
# Verifica que el backend esté corriendo
curl http://localhost:5000/health

# Si no responde, revisa los logs
docker-compose logs backend
```

### "Failed to upload file"
- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que el Folder ID sea válido
- Revisa los logs del backend

### "Port already in use"
```bash
# Detén otros servicios en esos puertos
docker-compose down

# O cambia los puertos en docker-compose.yml
```

### La galería está vacía
- Sube una foto primero
- Espera 5-10 segundos y recarga la página
- Verifica que la foto se subió a Google Drive

## Desarrollo sin Docker

Si prefieres no usar Docker:

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
# Corre en http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
# Corre en http://localhost:3000
```

## Personalización Rápida

### Cambiar Colores del Tema

Edita `frontend/tailwind.config.js`:
```javascript
wedding: {
  primary: '#d4af37',    // Tu color principal
  secondary: '#f8f3e6',  // Tu color secundario
}
```

### Cambiar Título

Edita `frontend/public/index.html`:
```html
<title>Tu Título Aquí</title>
```

Y `frontend/src/components/Header.jsx`:
```javascript
<span className="...">
  Tu Título Aquí
</span>
```

### Cambiar Límites de Carga

Edita `backend/.env`:
```env
MAX_FILE_SIZE=209715200        # 200MB
MAX_FILES_PER_UPLOAD=20        # 20 archivos
```

## Siguiente Paso: Producción

Una vez que hayas probado localmente, consulta README.md sección "Producción" para desplegar en un servidor real.

## Recursos

- **Documentación completa**: README.md
- **Setup detallado**: SETUP_GUIDE.md
- **Arquitectura**: ARCHITECTURE.md
- **Estructura**: PROJECT_STRUCTURE.md

## Soporte

Si algo no funciona:
1. Revisa los logs: `docker-compose logs -f`
2. Verifica la configuración: `bash scripts/check-setup.sh`
3. Consulta SETUP_GUIDE.md para pasos detallados

---

¡Disfruta tu galería de boda!
