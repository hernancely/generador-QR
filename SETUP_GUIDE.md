# Guía de Configuración Rápida

Esta guía te llevará paso a paso para configurar la aplicación de galería de boda.

## Checklist de Configuración

- [ ] Docker instalado
- [ ] Cuenta de Google Cloud Platform
- [ ] Google Drive API habilitada
- [ ] Credenciales OAuth 2.0 creadas
- [ ] Carpeta de Google Drive creada
- [ ] Refresh token obtenido
- [ ] Archivos .env configurados

## Paso 1: Instalar Docker

### Windows
1. Descarga [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop)
2. Instala y reinicia tu computadora
3. Verifica la instalación:
   ```bash
   docker --version
   docker-compose --version
   ```

### macOS
1. Descarga [Docker Desktop para Mac](https://www.docker.com/products/docker-desktop)
2. Instala arrastrando a Applications
3. Verifica la instalación (mismo comando de arriba)

### Linux
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

## Paso 2: Configurar Google Cloud Platform

### 2.1 Crear Proyecto

1. Ve a https://console.cloud.google.com/
2. Haz clic en el selector de proyectos (arriba)
3. Clic en "New Project"
4. Nombre del proyecto: "Wedding Gallery" (o el que prefieras)
5. Haz clic en "Create"

### 2.2 Habilitar Google Drive API

1. En el menú de navegación (☰), ve a "APIs & Services" > "Library"
2. Busca "Google Drive API"
3. Haz clic en "Google Drive API"
4. Haz clic en "Enable"
5. Espera a que se habilite (puede tomar unos segundos)

### 2.3 Crear Credenciales OAuth 2.0

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "+ CREATE CREDENTIALS"
3. Selecciona "OAuth client ID"
4. Si es la primera vez, configura la pantalla de consentimiento:
   - Tipo de usuario: External
   - Nombre de la aplicación: "Wedding Gallery"
   - Correo de soporte: tu email
   - Scopes: No agregues ninguno extra
   - Guardar y continuar
5. Ahora crea el OAuth client ID:
   - Application type: "Web application"
   - Name: "Wedding Gallery Web Client"
   - Authorized redirect URIs:
     - Clic en "+ ADD URI"
     - Agrega: `http://localhost:5000/api/auth/google/callback`
6. Haz clic en "CREATE"
7. **GUARDA** el Client ID y Client Secret que aparecen

### 2.4 Crear Carpeta en Google Drive

1. Ve a https://drive.google.com/
2. Haz clic en "+ New" > "Folder"
3. Nombre: "Wedding Photos" (o el que prefieras)
4. Haz clic derecho en la carpeta > "Share"
5. Asegúrate de tener acceso de editor
6. Copia la URL de la carpeta
7. El **Folder ID** es la parte después de `/folders/`
   - Ejemplo: `https://drive.google.com/drive/folders/1abc123xyz456`
   - Folder ID: `1abc123xyz456`

## Paso 3: Obtener Refresh Token

### 3.1 Configuración Temporal del Backend

1. Crea el archivo `.env` en la carpeta `backend`:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edita `backend/.env` y agrega SOLO estas líneas:
   ```env
   PORT=5000
   GOOGLE_CLIENT_ID=tu_client_id_aqui
   GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
   GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
   ```

3. Instala dependencias e inicia el servidor:
   ```bash
   npm install
   npm start
   ```

### 3.2 Obtener el Token

1. Abre tu navegador y ve a:
   ```
   http://localhost:5000/api/auth/google/url
   ```

2. Verás una respuesta JSON con `authUrl`. Copia esa URL completa

3. Pega la URL en tu navegador y presiona Enter

4. Selecciona tu cuenta de Google

5. Haz clic en "Advanced" o "Avanzado"

6. Haz clic en "Go to Wedding Gallery (unsafe)" o "Ir a Wedding Gallery (no seguro)"
   - Esto es normal en desarrollo

7. Autoriza todos los permisos solicitados

8. Serás redirigido a una página que puede mostrar un error. **Esto es normal**

9. Copia el **código** de la URL:
   - La URL será algo como: `http://localhost:5000/api/auth/google/callback?code=4/0A...CODIGO_MUY_LARGO...xyz&scope=https://...`
   - Copia solo la parte después de `code=` y antes de `&scope`

10. Ve a esta URL (reemplaza CODE_AQUI con tu código):
    ```
    http://localhost:5000/api/auth/google/callback?code=CODE_AQUI
    ```

11. Verás una respuesta JSON. Copia el valor de `refresh_token`

12. **IMPORTANTE**: Guarda este refresh token, lo necesitarás en el siguiente paso

13. Detén el servidor (Ctrl+C)

## Paso 4: Configurar Variables de Entorno Completas

### 4.1 Backend (.env)

Edita `backend/.env` con TODAS las variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=tu_folder_id_de_google_drive

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=tu_client_id_completo
GOOGLE_CLIENT_SECRET=tu_client_secret_completo
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=tu_refresh_token_del_paso_anterior

# Application URL for QR Code
APP_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=104857600
MAX_FILES_PER_UPLOAD=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,image/gif,image/webp,video/mp4,video/quicktime,video/x-msvideo
```

### 4.2 Frontend (.env)

Crea `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=Galería de Boda
```

## Paso 5: Ejecutar la Aplicación

### Con Docker Compose (Recomendado)

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

Espera a que termine de construir (puede tomar 5-10 minutos la primera vez)

### Sin Docker (Desarrollo)

Terminal 1 - Backend:
```bash
cd backend
npm install
npm start
```

Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm start
```

## Paso 6: Verificar que Funciona

1. Abre tu navegador en: http://localhost:3000

2. Deberías ver la página principal de la galería de boda

3. Prueba subir una foto:
   - Haz clic en "Subir Fotos" o desplázate hacia abajo
   - Arrastra una imagen o haz clic para seleccionar
   - Haz clic en "Subir"
   - Espera a que termine la carga

4. Verifica en Google Drive:
   - Ve a tu carpeta "Wedding Photos"
   - Deberías ver la imagen que subiste

5. La foto debería aparecer en la galería

## Paso 7: Generar Código QR

### Opción 1: Desde el Navegador

Visita: http://localhost:5000/api/qr/generate?format=dataurl

Verás una respuesta JSON con un `dataURL`. Copia ese valor y:
1. Pégalo en la barra de direcciones del navegador
2. Haz clic derecho en la imagen > "Guardar imagen como"
3. Guárdala como `wedding-qr.png`

### Opción 2: Descargar Directamente

Visita: http://localhost:5000/api/qr/generate

La respuesta te dará un `downloadUrl`. Visita:
http://localhost:5000/api/qr/download/NOMBRE_DEL_ARCHIVO

(Reemplaza NOMBRE_DEL_ARCHIVO con el `fileName` de la respuesta)

## Paso 8: Preparar para la Boda

1. **Imprime el código QR**
   - Tamaño recomendado: A4 o Letter
   - Imprime en alta calidad
   - Considera plastificar para protegerlo

2. **Coloca el código QR**
   - En la entrada del salón
   - En las mesas
   - En el área de fotos

3. **Agrega instrucciones**
   - "Escanea para compartir tus fotos"
   - "Comparte tus mejores momentos con nosotros"

4. **Prueba con varios dispositivos**
   - Teléfonos Android
   - iPhones
   - Tablets

## Solución de Problemas Comunes

### "Cannot find module" al ejecutar npm start
```bash
cd backend  # o frontend
rm -rf node_modules package-lock.json
npm install
```

### "Port 5000 is already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "CORS policy error"
Verifica que en `backend/.env`:
```env
FRONTEND_URL=http://localhost:3000
```

### Las imágenes no aparecen en la galería
1. Verifica que el archivo se subió a Google Drive
2. Espera 5-10 segundos y recarga la página
3. Revisa la consola del navegador (F12) para ver errores

### "Invalid refresh token"
El refresh token expiró o es inválido. Repite el Paso 3.

## Checklist Final

Antes de la boda, verifica:

- [ ] La aplicación corre sin errores
- [ ] Puedes subir fotos y aparecen en la galería
- [ ] Las fotos se guardan en Google Drive
- [ ] El código QR funciona desde un móvil
- [ ] La aplicación es accesible desde la red local o internet
- [ ] Tienes suficiente espacio en Google Drive
- [ ] El código QR está impreso y listo

## Próximos Pasos

- Para despliegue en producción, revisa la sección "Producción" en README.md
- Considera usar un servicio como Render, Heroku, o DigitalOcean
- Configura un dominio personalizado (ejemplo: fotos.tuboda.com)
- Configura HTTPS con Let's Encrypt

¡Listo! Tu galería de boda está configurada y lista para usar.
