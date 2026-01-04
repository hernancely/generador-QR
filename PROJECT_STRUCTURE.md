# Estructura del Proyecto

## Árbol de Directorios

```
Generador QR/
│
├── 📁 backend/                          # Servidor Node.js/Express
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── googleDrive.js           # Configuración OAuth2 y Google Drive
│   │   │
│   │   ├── 📁 controllers/
│   │   │   ├── galleryController.js     # Controlador de galería (listar, obtener, eliminar)
│   │   │   ├── qrController.js          # Controlador de códigos QR
│   │   │   └── uploadController.js      # Controlador de subida de archivos
│   │   │
│   │   ├── 📁 middleware/
│   │   │   ├── errorHandler.js          # Manejo centralizado de errores
│   │   │   └── upload.js                # Configuración Multer para archivos
│   │   │
│   │   ├── 📁 routes/
│   │   │   ├── authRoutes.js            # Rutas OAuth (obtener token)
│   │   │   ├── galleryRoutes.js         # Rutas de galería
│   │   │   ├── qrRoutes.js              # Rutas de generación QR
│   │   │   └── uploadRoutes.js          # Rutas de subida
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── googleDriveService.js    # Lógica de negocio Google Drive
│   │   │   └── qrCodeService.js         # Lógica de generación QR
│   │   │
│   │   └── server.js                    # Punto de entrada del servidor
│   │
│   ├── .env.example                     # Plantilla de variables de entorno
│   ├── .gitignore                       # Archivos ignorados por Git
│   ├── Dockerfile                       # Imagen Docker del backend
│   └── package.json                     # Dependencias y scripts
│
├── 📁 frontend/                         # Aplicación React
│   ├── 📁 public/
│   │   ├── index.html                   # HTML principal
│   │   └── manifest.json                # PWA manifest
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── FileUpload.jsx           # Componente de subida con drag & drop
│   │   │   ├── Footer.jsx               # Footer de la aplicación
│   │   │   ├── Gallery.jsx              # Galería con lazy loading infinito
│   │   │   ├── Header.jsx               # Navbar superior
│   │   │   ├── Hero.jsx                 # Sección hero/bienvenida
│   │   │   └── Stats.jsx                # Estadísticas en tiempo real
│   │   │
│   │   ├── 📁 hooks/
│   │   │   └── useInfiniteScroll.js     # Custom hook para scroll infinito
│   │   │
│   │   ├── 📁 utils/
│   │   │   └── api.js                   # Cliente Axios con funciones API
│   │   │
│   │   ├── App.js                       # Componente raíz
│   │   ├── index.css                    # Estilos globales + Tailwind
│   │   └── index.js                     # Punto de entrada React
│   │
│   ├── .env.example                     # Plantilla de configuración
│   ├── .gitignore                       # Archivos ignorados
│   ├── Dockerfile                       # Imagen Docker multi-stage
│   ├── nginx.conf                       # Configuración Nginx para producción
│   ├── package.json                     # Dependencias React
│   ├── postcss.config.js                # Configuración PostCSS
│   └── tailwind.config.js               # Configuración Tailwind CSS
│
├── 📁 scripts/                          # Scripts de utilidad
│   ├── check-setup.sh                   # Verificar configuración
│   ├── dev-start.sh                     # Iniciar en modo desarrollo
│   ├── docker-setup.sh                  # Setup Docker completo
│   └── generate-qr.sh                   # Generar QR rápidamente
│
├── 📁 qr-codes/                         # Códigos QR generados (gitignored)
│   └── .gitkeep                         # Mantiene carpeta en Git
│
├── 📄 .dockerignore                     # Archivos excluidos de Docker
├── 📄 .gitignore                        # Archivos excluidos de Git
├── 📄 ARCHITECTURE.md                   # Documentación de arquitectura
├── 📄 CONTRIBUTING.md                   # Guía de contribución
├── 📄 docker-compose.yml                # Orquestación de contenedores
├── 📄 LICENSE                           # Licencia MIT
├── 📄 PROJECT_STRUCTURE.md              # Este archivo
├── 📄 README.md                         # Documentación principal
└── 📄 SETUP_GUIDE.md                    # Guía paso a paso de configuración
```

## Conteo de Archivos

### Backend
- **Config**: 1 archivo
- **Controllers**: 3 archivos
- **Middleware**: 2 archivos
- **Routes**: 4 archivos
- **Services**: 2 archivos
- **Total Backend**: 13 archivos de código

### Frontend
- **Components**: 6 archivos
- **Hooks**: 1 archivo
- **Utils**: 1 archivo
- **Total Frontend**: 11 archivos de código

### Configuración y Docker
- **Docker files**: 3 archivos (2 Dockerfiles + docker-compose)
- **Config files**: 5 archivos (.env.example x2, nginx.conf, tailwind, postcss)

### Documentación
- **Docs**: 5 archivos (README, SETUP_GUIDE, ARCHITECTURE, CONTRIBUTING, PROJECT_STRUCTURE)
- **Scripts**: 4 archivos bash

### Total General
**47 archivos** (sin contar node_modules, .git, o archivos generados)

## Tecnologías por Módulo

### Backend Stack
```
Node.js 18
├── express (^4.18.2)          # Framework web
├── googleapis (^126.0.1)      # Google Drive API
├── multer (^1.4.5-lts.1)      # Subida de archivos
├── qrcode (^1.5.3)            # Generación QR
├── cors (^2.8.5)              # CORS headers
├── helmet (^7.1.0)            # Security headers
├── express-rate-limit (^7.1.5)# Rate limiting
├── morgan (^1.10.0)           # Logging
├── compression (^1.7.4)       # Gzip compression
└── dotenv (^16.3.1)           # Environment vars
```

### Frontend Stack
```
React 18
├── react (^18.2.0)
├── react-dom (^18.2.0)
├── axios (^1.6.2)                    # HTTP client
├── tailwindcss (^3.4.0)              # CSS framework
├── flowbite (^2.2.1)                 # UI components
├── flowbite-react (^0.7.2)           # React components
├── react-dropzone (^14.2.3)          # File upload
├── react-intersection-observer (^9.5.3) # Lazy loading
└── react-photo-view (^1.2.4)         # Lightbox
```

### DevOps
```
Docker & Docker Compose
├── Node 18 Alpine (base image)
├── Nginx Alpine (frontend server)
└── Multi-stage builds
```

## Rutas API Disponibles

### Autenticación (Setup inicial)
```
GET  /api/auth/google/url       # Obtener URL OAuth
GET  /api/auth/google/callback  # Callback OAuth
```

### Subida de Archivos
```
POST /api/upload                # Subir archivos
GET  /api/upload/stats          # Estadísticas de subida
```

### Galería
```
GET    /api/gallery/files                # Listar archivos (paginado)
GET    /api/gallery/files/:fileId        # Obtener archivo específico
DELETE /api/gallery/files/:fileId        # Eliminar archivo
GET    /api/gallery/stats                # Estadísticas de galería
```

### Códigos QR
```
GET    /api/qr/generate                  # Generar QR
POST   /api/qr/generate/styled           # Generar QR estilizado
GET    /api/qr/list                      # Listar QR generados
GET    /api/qr/download/:fileName        # Descargar QR
DELETE /api/qr/:fileName                 # Eliminar QR
```

### Utilidad
```
GET /health                     # Health check
```

## Variables de Entorno Requeridas

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000

# Google Drive
GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=

# App
APP_URL=http://localhost:3000
MAX_FILE_SIZE=104857600
MAX_FILES_PER_UPLOAD=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,image/gif,image/webp,video/mp4,video/quicktime,video/x-msvideo
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=Galería de Boda
```

## Comandos Principales

### Desarrollo Local
```bash
# Backend
cd backend
npm install
npm start          # Puerto 5000

# Frontend
cd frontend
npm install
npm start          # Puerto 3000
```

### Docker
```bash
# Construir y ejecutar
docker-compose up --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reconstruir sin caché
docker-compose build --no-cache
```

### Scripts de Utilidad
```bash
# Verificar configuración
bash scripts/check-setup.sh

# Iniciar desarrollo
bash scripts/dev-start.sh

# Setup Docker
bash scripts/docker-setup.sh

# Generar QR
bash scripts/generate-qr.sh
```

## Puertos Utilizados

- **3000**: Frontend React (desarrollo y Docker)
- **5000**: Backend API (desarrollo y Docker)
- **80**: Frontend Nginx (solo Docker, mapeado a 3000)

## Tamaño Estimado

### Sin node_modules
- Backend: ~50 KB
- Frontend: ~100 KB
- Docs: ~50 KB
- Total: ~200 KB

### Con node_modules
- Backend: ~150 MB
- Frontend: ~400 MB
- Total: ~550 MB

### Imágenes Docker (built)
- Backend: ~200 MB
- Frontend: ~25 MB (multi-stage)
- Total: ~225 MB

## Características Implementadas

### Funcionalidades Core
- [x] Generación de códigos QR personalizables
- [x] Subida de múltiples archivos (drag & drop)
- [x] Integración completa con Google Drive
- [x] Galería responsive con mosaico
- [x] Lazy loading infinito (scroll)
- [x] Lightbox para ampliar fotos
- [x] Estadísticas en tiempo real
- [x] Soporte para fotos y videos

### UI/UX
- [x] Diseño responsive (móvil, tablet, desktop)
- [x] Tema personalizado (colores de boda)
- [x] Animaciones y transiciones suaves
- [x] Feedback visual (progress bars, estados)
- [x] Mensajes de error amigables
- [x] Skeleton loading states

### Seguridad
- [x] CORS configurado
- [x] Helmet security headers
- [x] Rate limiting
- [x] Validación de tipos de archivo
- [x] Límites de tamaño
- [x] Variables de entorno para secretos
- [x] OAuth 2.0 para Google Drive

### DevOps
- [x] Docker containerization
- [x] Docker Compose orchestration
- [x] Health checks
- [x] Multi-stage builds
- [x] Nginx optimizado
- [x] Gzip compression
- [x] Production-ready setup

### Documentación
- [x] README completo
- [x] Guía de setup paso a paso
- [x] Documentación de arquitectura
- [x] Guía de contribución
- [x] Scripts de utilidad
- [x] Comentarios en código

## Próximas Mejoras Sugeridas

### Funcionalidades
- [ ] Panel de administrador
- [ ] Autenticación de usuarios
- [ ] Comentarios en fotos
- [ ] Sistema de favoritos
- [ ] Búsqueda y filtros
- [ ] Slideshow automático
- [ ] Compartir en redes sociales

### Técnicas
- [ ] Tests unitarios (Jest)
- [ ] Tests E2E (Cypress)
- [ ] CI/CD pipeline
- [ ] Monitoring y analytics
- [ ] Error tracking (Sentry)
- [ ] Database para metadata
- [ ] WebSockets para updates real-time

### UI/UX
- [ ] PWA completa (offline support)
- [ ] Modo oscuro
- [ ] Múltiples temas
- [ ] Internacionalización (i18n)
- [ ] Accesibilidad mejorada (WCAG 2.1 AAA)

## Licencia

MIT License - Ver archivo LICENSE para detalles.

## Soporte

Para ayuda, consulta:
1. README.md - Documentación general
2. SETUP_GUIDE.md - Configuración paso a paso
3. ARCHITECTURE.md - Detalles técnicos
4. Issues en GitHub - Reportar problemas
