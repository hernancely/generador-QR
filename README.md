# Galería de Fotos de Boda

Una aplicación web completa para que los invitados de una boda puedan subir y compartir fotos y videos, con integración a Google Drive y código QR para fácil acceso.

## Características

- **Generación de Código QR**: Genera códigos QR que dirigen a la aplicación web
- **Carga de Archivos**: Los invitados pueden subir múltiples fotos y videos
- **Integración con Google Drive**: Todos los archivos se guardan automáticamente en Google Drive
- **Galería Responsive**: Visualiza las fotos en un mosaico elegante con lazy loading
- **Ampliación de Fotos**: Haz clic en las fotos para verlas en tamaño completo
- **Estadísticas en Tiempo Real**: Muestra el total de archivos, fotos, videos y tamaño
- **Diseño Elegante**: UI moderna con Tailwind CSS y Flowbite
- **Containerizado con Docker**: Fácil despliegue con Docker Compose

## Tecnologías Utilizadas

### Backend
- Node.js con Express
- Google Drive API v3
- Multer para carga de archivos
- QRCode para generación de códigos QR
- Helmet y CORS para seguridad

### Frontend
- React 18
- Tailwind CSS
- Flowbite React components
- React Dropzone para carga de archivos
- React Photo View para galería de imágenes
- Axios para llamadas API

### DevOps
- Docker y Docker Compose
- Nginx para servir el frontend
- Multi-stage builds para optimización

## Requisitos Previos

1. **Docker y Docker Compose** instalados en tu sistema
2. **Cuenta de Google Cloud Platform** con Drive API habilitado
3. **Credenciales OAuth 2.0** de Google Cloud Console

## Configuración de Google Drive API

### Paso 1: Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Drive API**:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Drive API"
   - Haz clic en "Enable"

### Paso 2: Crear Credenciales OAuth 2.0

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "OAuth client ID"
3. Selecciona "Web application"
4. Configura:
   - **Nombre**: Wedding Gallery App
   - **Authorized redirect URIs**: `http://localhost:5000/api/auth/google/callback`
5. Guarda el **Client ID** y **Client Secret**

### Paso 3: Crear Carpeta en Google Drive

1. Ve a [Google Drive](https://drive.google.com/)
2. Crea una nueva carpeta para las fotos de la boda
3. Haz clic derecho en la carpeta > "Get link" > "Share"
4. Copia el **Folder ID** de la URL (es la parte después de `/folders/`)
   - Ejemplo: `https://drive.google.com/drive/folders/1ABC...XYZ`
   - El Folder ID es: `1ABC...XYZ`

### Paso 4: Obtener el Refresh Token

1. Configura el archivo `.env` del backend con Client ID y Client Secret
2. Inicia el backend: `cd backend && npm install && npm start`
3. Abre en tu navegador: `http://localhost:5000/api/auth/google/url`
4. Copia la URL de autorización y ábrela en tu navegador
5. Autoriza la aplicación con tu cuenta de Google
6. Copia el código de autorización de la URL de callback
7. Visita: `http://localhost:5000/api/auth/google/callback?code=TU_CODIGO_AQUI`
8. Copia el **refresh_token** de la respuesta

## Instalación y Configuración

### 1. Clonar o Descargar el Proyecto

```bash
cd "C:\Users\herna\OneDrive\Documentos\Generador QR"
```

### 2. Configurar Variables de Entorno del Backend

```bash
cd backend
cp .env.example .env
```

Edita el archivo `backend/.env` con tus credenciales:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=tu_folder_id_aqui

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=tu_refresh_token_aqui

# Application URL for QR Code
APP_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=104857600
MAX_FILES_PER_UPLOAD=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,image/gif,image/webp,video/mp4,video/quicktime,video/x-msvideo
```

### 3. Configurar Variables de Entorno del Frontend

```bash
cd ../frontend
cp .env.example .env
```

Edita el archivo `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=Galería de Boda
```

## Ejecución con Docker

### Opción 1: Usando Docker Compose (Recomendado)

Desde el directorio raíz del proyecto:

```bash
# Construir e iniciar los contenedores
docker-compose up --build

# O en modo detached (segundo plano)
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener los contenedores
docker-compose down
```

La aplicación estará disponible en:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Opción 2: Ejecutar Manualmente (sin Docker)

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## Generar Código QR

Una vez que la aplicación esté corriendo:

1. Visita: `http://localhost:5000/api/qr/generate?format=dataurl`
2. Copia el `dataURL` de la respuesta
3. Pega el dataURL en tu navegador o conviértelo a imagen
4. Imprime el código QR y compártelo en la boda

O descarga el archivo directamente:

```bash
curl http://localhost:5000/api/qr/generate > qr-info.json
```

El código QR se guardará en la carpeta `qr-codes/` del backend.

## Uso de la Aplicación

### Para los Invitados

1. **Escanear el Código QR** en la boda
2. **Acceder a la aplicación** desde el móvil o computadora
3. **Subir fotos/videos**:
   - Arrastra y suelta archivos
   - O haz clic para seleccionar
   - Soporta múltiples archivos a la vez
4. **Ver la galería** de todos los invitados

### Para los Novios

- Accede a Google Drive para ver y descargar todos los archivos
- Los archivos están organizados en la carpeta que configuraste
- Puedes compartir la carpeta con familiares o el fotógrafo

## Estructura del Proyecto

```
Generador QR/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── googleDrive.js          # Configuración Google Drive
│   │   ├── controllers/
│   │   │   ├── galleryController.js    # Controlador de galería
│   │   │   ├── qrController.js         # Controlador de QR
│   │   │   └── uploadController.js     # Controlador de carga
│   │   ├── middleware/
│   │   │   ├── errorHandler.js         # Manejo de errores
│   │   │   └── upload.js               # Multer config
│   │   ├── routes/
│   │   │   ├── authRoutes.js           # Rutas de autenticación
│   │   │   ├── galleryRoutes.js        # Rutas de galería
│   │   │   ├── qrRoutes.js             # Rutas de QR
│   │   │   └── uploadRoutes.js         # Rutas de carga
│   │   ├── services/
│   │   │   ├── googleDriveService.js   # Servicio Google Drive
│   │   │   └── qrCodeService.js        # Servicio de QR
│   │   └── server.js                   # Servidor principal
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx          # Componente de carga
│   │   │   ├── Footer.jsx              # Footer
│   │   │   ├── Gallery.jsx             # Galería de fotos
│   │   │   ├── Header.jsx              # Header
│   │   │   ├── Hero.jsx                # Sección hero
│   │   │   └── Stats.jsx               # Estadísticas
│   │   ├── hooks/
│   │   │   └── useInfiniteScroll.js    # Hook scroll infinito
│   │   ├── utils/
│   │   │   └── api.js                  # Cliente API
│   │   ├── App.js                      # Componente principal
│   │   ├── index.css                   # Estilos globales
│   │   └── index.js                    # Punto de entrada
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── qr-codes/                           # Códigos QR generados
├── docker-compose.yml
├── .dockerignore
└── README.md
```

## API Endpoints

### Upload
- `POST /api/upload` - Subir archivos
- `GET /api/upload/stats` - Obtener estadísticas de carga

### Gallery
- `GET /api/gallery/files` - Listar archivos (con paginación)
- `GET /api/gallery/files/:fileId` - Obtener archivo por ID
- `DELETE /api/gallery/files/:fileId` - Eliminar archivo
- `GET /api/gallery/stats` - Obtener estadísticas de galería

### QR Code
- `GET /api/qr/generate` - Generar código QR
- `POST /api/qr/generate/styled` - Generar código QR estilizado
- `GET /api/qr/list` - Listar códigos QR
- `GET /api/qr/download/:fileName` - Descargar código QR
- `DELETE /api/qr/:fileName` - Eliminar código QR

### Auth (para configuración inicial)
- `GET /api/auth/google/url` - Obtener URL de autorización
- `GET /api/auth/google/callback` - Callback OAuth

### Health Check
- `GET /health` - Estado del servidor

## Personalización

### Cambiar Colores del Tema

Edita `frontend/tailwind.config.js`:

```javascript
wedding: {
  primary: '#d4af37',    // Color principal (dorado)
  secondary: '#f8f3e6',  // Color secundario (crema)
  dark: '#1a1a1a',       // Oscuro
  light: '#ffffff'       // Claro
}
```

### Cambiar Límites de Carga

Edita `backend/.env`:

```env
MAX_FILE_SIZE=104857600        # 100MB en bytes
MAX_FILES_PER_UPLOAD=10        # Máximo 10 archivos por carga
```

### Cambiar Tipos de Archivo Permitidos

Edita `backend/.env`:

```env
ALLOWED_FILE_TYPES=image/jpeg,image/png,video/mp4
```

## Solución de Problemas

### Error: "Failed to upload file"
- Verifica que las credenciales de Google Drive sean correctas
- Asegúrate de que el Folder ID sea válido
- Verifica que el refresh token no haya expirado

### Error: "CORS policy"
- Asegúrate de que `FRONTEND_URL` en el backend apunte al frontend correcto
- En producción, actualiza la URL al dominio real

### Las imágenes no se cargan en la galería
- Verifica que los archivos tengan permisos públicos en Google Drive
- El servicio automáticamente hace los archivos públicos al subirlos

### Docker no puede construir las imágenes
- Asegúrate de tener suficiente espacio en disco
- Verifica que los archivos `.env` existan antes de construir
- Ejecuta `docker-compose down -v` y vuelve a intentar

## Seguridad

- Las credenciales se manejan mediante variables de entorno
- CORS configurado para permitir solo el frontend
- Helmet para headers de seguridad
- Rate limiting en endpoints de API
- Validación de tipos de archivo
- Límites de tamaño de archivo

## Producción

Para desplegar en producción:

1. **Actualiza las URLs** en los archivos `.env`
2. **Configura HTTPS** (recomendado Let's Encrypt)
3. **Usa un dominio real** para la aplicación
4. **Actualiza las redirect URIs** en Google Cloud Console
5. **Configura backups** de Google Drive
6. **Monitorea los logs** con `docker-compose logs -f`

## Contribuciones

Este es un proyecto de código abierto. Siéntete libre de hacer fork y personalizar según tus necesidades.

## Licencia

MIT License - Siéntete libre de usar este proyecto para tu boda o evento especial.

## Soporte

Si encuentras algún problema o tienes preguntas:
1. Revisa la sección de Solución de Problemas
2. Verifica los logs: `docker-compose logs -f`
3. Asegúrate de que todas las credenciales estén configuradas correctamente

---

Hecho con amor para celebrar momentos especiales.
