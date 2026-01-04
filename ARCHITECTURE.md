# Arquitectura del Sistema

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIOS                             │
│                    (Invitados de Boda)                       │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ Escanean QR Code
                │
┌───────────────▼─────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Header    │  │  FileUpload  │  │   Gallery    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Hero     │  │    Stats     │  │    Footer    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  Technology Stack:                                           │
│  - React 18                                                  │
│  - Tailwind CSS + Flowbite                                  │
│  - React Dropzone                                            │
│  - React Photo View                                          │
│  - Axios                                                     │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ HTTP/REST API
                │
┌───────────────▼─────────────────────────────────────────────┐
│                   BACKEND (Node.js/Express)                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    API ROUTES                        │   │
│  │  /api/upload  │  /api/gallery  │  /api/qr           │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  CONTROLLERS                         │   │
│  │  uploadController │ galleryController │ qrController│   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    SERVICES                          │   │
│  │  googleDriveService       │       qrCodeService      │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   MIDDLEWARE                         │   │
│  │  Multer │ ErrorHandler │ CORS │ Helmet │ RateLimit  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Technology Stack:                                           │
│  - Express.js                                                │
│  - Multer (file uploads)                                     │
│  - Google APIs (Drive v3)                                    │
│  - QRCode library                                            │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ Google Drive API v3
                │
┌───────────────▼─────────────────────────────────────────────┐
│                    GOOGLE DRIVE                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Wedding Photos Folder                    │  │
│  │                                                        │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐    │  │
│  │  │ IMG001 │  │ IMG002 │  │ VID001 │  │ IMG003 │    │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘    │  │
│  │                    ...más archivos                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Features:                                                   │
│  - Almacenamiento ilimitado                                 │
│  - URLs públicas para visualización                         │
│  - Thumbnails automáticos                                   │
│  - Organización en carpetas                                 │
└──────────────────────────────────────────────────────────────┘
```

## Flujo de Datos

### 1. Carga de Archivos

```
Usuario → Selecciona Archivos
  ↓
React Dropzone → Valida tipos/tamaños
  ↓
FileUpload Component → Muestra preview
  ↓
HTTP POST /api/upload → Con FormData
  ↓
Multer Middleware → Procesa archivos en memoria
  ↓
uploadController → Recibe archivos
  ↓
googleDriveService.uploadMultipleFiles()
  ↓
Google Drive API → Sube archivos
  ↓
Configura permisos públicos
  ↓
Respuesta con metadata → IDs, URLs, thumbnails
  ↓
Frontend actualiza galería
```

### 2. Visualización de Galería

```
Usuario → Accede a la galería
  ↓
Gallery Component → Se monta
  ↓
HTTP GET /api/gallery/files?pageSize=50
  ↓
galleryController.getFiles()
  ↓
googleDriveService.listFiles()
  ↓
Google Drive API → Lista archivos
  ↓
Respuesta con archivos + nextPageToken
  ↓
Frontend renderiza grid de fotos
  ↓
IntersectionObserver detecta scroll
  ↓
Carga más archivos (lazy loading)
```

### 3. Generación de QR Code

```
Usuario → Solicita QR code
  ↓
HTTP GET /api/qr/generate?format=dataurl
  ↓
qrController.generateQRCode()
  ↓
qrCodeService.generateQRCodeDataURL()
  ↓
QRCode library → Genera imagen
  ↓
Convierte a Data URL (base64)
  ↓
Respuesta con dataURL
  ↓
Usuario descarga/imprime QR
```

## Componentes Principales

### Backend

#### 1. Google Drive Service
- **Responsabilidad**: Interactuar con Google Drive API
- **Métodos clave**:
  - `uploadFile()`: Sube un archivo individual
  - `uploadMultipleFiles()`: Sube múltiples archivos en paralelo
  - `listFiles()`: Lista archivos con paginación
  - `getFileMetadata()`: Obtiene metadata de un archivo
  - `deleteFile()`: Elimina un archivo

#### 2. QR Code Service
- **Responsabilidad**: Generar códigos QR
- **Métodos clave**:
  - `generateQRCode()`: Genera QR como archivo
  - `generateQRCodeDataURL()`: Genera QR como data URL
  - `generateStyledQRCode()`: Genera QR personalizado

#### 3. Upload Middleware (Multer)
- **Responsabilidad**: Procesar archivos subidos
- **Características**:
  - Memory storage (no guarda en disco)
  - Validación de tipos de archivo
  - Límites de tamaño
  - Manejo de múltiples archivos

### Frontend

#### 1. FileUpload Component
- **Responsabilidad**: Interfaz de carga de archivos
- **Características**:
  - Drag & drop
  - Preview de archivos seleccionados
  - Barra de progreso
  - Validación de tipos

#### 2. Gallery Component
- **Responsabilidad**: Mostrar galería de fotos
- **Características**:
  - Grid responsive
  - Lazy loading con Intersection Observer
  - Lightbox para ampliar fotos
  - Paginación infinita

#### 3. Stats Component
- **Responsabilidad**: Mostrar estadísticas
- **Características**:
  - Total de archivos
  - Contador de fotos/videos
  - Tamaño total
  - Actualización automática

## Patrones de Diseño

### 1. MVC (Model-View-Controller)
- **Model**: Google Drive (almacenamiento externo)
- **View**: React Components
- **Controller**: Express Controllers

### 2. Service Layer
- Lógica de negocio separada en servicios
- Controllers delgados, servicios robustos
- Facilita testing y mantenimiento

### 3. Middleware Chain
```
Request → CORS → Helmet → Rate Limit → Multer → Controller → Response
```

### 4. Component Composition
```
App
├── Header
├── Hero
├── Stats
├── FileUpload
│   └── Dropzone
├── Gallery
│   └── PhotoView
└── Footer
```

## Seguridad

### Capas de Seguridad

1. **CORS**: Solo permite frontend autorizado
2. **Helmet**: Headers de seguridad HTTP
3. **Rate Limiting**: Previene abuso de API
4. **File Validation**: Solo tipos permitidos
5. **Size Limits**: Previene DoS por archivos grandes
6. **OAuth 2.0**: Autenticación segura con Google
7. **Environment Variables**: Credenciales no en código

## Escalabilidad

### Estrategias Implementadas

1. **Lazy Loading**: Carga solo lo visible
2. **Paginación**: Limita consultas a Drive
3. **Memory Efficient**: Multer usa buffers
4. **CDN Ready**: Drive actúa como CDN
5. **Stateless Backend**: Fácil escalado horizontal

### Límites Actuales

- **Google Drive API**: 1000 requests/100 segundos
- **File Size**: 100MB por archivo (configurable)
- **Concurrent Uploads**: 10 archivos (configurable)
- **Rate Limit**: 100 requests/15 minutos por IP

## Optimizaciones

### Frontend

1. **Code Splitting**: React.lazy() ready
2. **Image Optimization**: Thumbnails de Drive
3. **Compression**: Nginx gzip habilitado
4. **Caching**: Headers de caché en estáticos

### Backend

1. **Compression Middleware**: Respuestas gzip
2. **Parallel Uploads**: Promise.all() para múltiples archivos
3. **Connection Pooling**: Reuso de conexiones HTTP

## Monitoreo y Logs

### Backend Logging
```javascript
// Development
morgan('dev')

// Production
morgan('combined')
```

### Health Checks
- Backend: `GET /health`
- Frontend: `GET /health` (nginx)
- Docker: Healthcheck cada 30s

## Despliegue

### Docker Strategy

1. **Multi-stage Build**: Frontend optimizado
2. **Layer Caching**: Dependencias primero
3. **Health Checks**: Auto-restart si falla
4. **Volume Mounts**: QR codes persistentes
5. **Network Isolation**: Bridge network

### Producción Considerations

1. **HTTPS**: Usar reverse proxy (nginx/Traefik)
2. **Domain**: Configurar DNS
3. **SSL**: Let's Encrypt gratuito
4. **Backups**: Google Drive es el backup
5. **Monitoring**: Agregar logging service

## Tecnologías y Versiones

### Backend
```json
{
  "node": "18.x",
  "express": "^4.18.2",
  "googleapis": "^126.0.1",
  "qrcode": "^1.5.3",
  "multer": "^1.4.5"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "tailwindcss": "^3.4.0",
  "flowbite-react": "^0.7.2",
  "react-dropzone": "^14.2.3"
}
```

### Infrastructure
```
Docker: 20.10+
Docker Compose: 2.0+
Nginx: 1.25 (Alpine)
```

## Mejoras Futuras

1. **Autenticación de Admin**: Panel para gestionar fotos
2. **Watermarking**: Marca de agua automática
3. **Image Processing**: Redimensionado server-side
4. **Real-time Updates**: WebSockets para nuevas fotos
5. **Analytics**: Track de cuántas fotos por invitado
6. **Email Notifications**: Avisar a novios de nuevas fotos
7. **Slideshow Mode**: Presentación automática
8. **Social Sharing**: Compartir en redes sociales
9. **Comments**: Permitir comentarios en fotos
10. **Favorites**: Marcar fotos favoritas

## Dependencias Críticas

### Google Drive API
- **¿Qué pasa si falla?**: Los uploads fallan, la galería no carga
- **Mitigación**: Retry logic, mensajes de error claros

### OAuth Tokens
- **¿Qué pasa si expiran?**: La app deja de funcionar
- **Mitigación**: Refresh tokens, alertas de expiración

### Docker
- **¿Qué pasa si falla?**: La app no inicia
- **Mitigación**: Health checks, auto-restart

## Costos Estimados

### Gratis
- Google Drive: 15GB gratis por cuenta
- Hosting local: $0

### Producción (estimado)
- VPS (DigitalOcean/Linode): $5-10/mes
- Dominio: $10-15/año
- SSL: Gratis (Let's Encrypt)
- Google Workspace (opcional): $6-12/mes para más storage

Total: ~$5-25/mes dependiendo de necesidades
