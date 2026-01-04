# Índice de Documentación

Guía rápida para navegar por toda la documentación del proyecto.

## Empezar Aquí

### Para Usuarios Nuevos
1. **[RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)** - Visión general del proyecto (5 min)
2. **[QUICK_START.md](QUICK_START.md)** - Inicio rápido en 3 pasos (10 min)
3. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Configuración detallada paso a paso (30 min)

### Para Desarrolladores
1. **[README.md](README.md)** - Documentación principal completa
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitectura técnica del sistema
3. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Estructura de archivos y directorios
4. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Cómo contribuir al proyecto

## Documentación por Categoría

### Instalación y Configuración
- **[QUICK_START.md](QUICK_START.md)** - Inicio rápido con Docker
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Guía completa de configuración
  - Configurar Google Cloud Platform
  - Obtener credenciales OAuth
  - Configurar variables de entorno
  - Ejecutar con Docker o manualmente

### Uso y Funcionalidades
- **[README.md](README.md)** - Todas las funcionalidades
  - Generación de códigos QR
  - Carga de archivos
  - Galería de fotos
  - Estadísticas
  - API endpoints

### Desarrollo
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitectura del sistema
  - Diagrama de arquitectura
  - Flujo de datos
  - Componentes principales
  - Patrones de diseño
  - Seguridad
  - Escalabilidad

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Estructura del proyecto
  - Árbol de directorios
  - Tecnologías utilizadas
  - Rutas API
  - Variables de entorno
  - Comandos principales

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guía de contribución
  - Reportar bugs
  - Sugerir mejoras
  - Pull requests
  - Estándares de código

### Resumen y Visión General
- **[RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)** - Resumen ejecutivo
  - Descripción general
  - Características principales
  - Stack tecnológico
  - Métricas del proyecto
  - Ventajas competitivas
  - Roadmap futuro

## Archivos de Configuración

### Backend
- `backend/.env.example` - Plantilla de variables de entorno
- `backend/package.json` - Dependencias Node.js
- `backend/Dockerfile` - Imagen Docker del backend

### Frontend
- `frontend/.env.example` - Configuración del frontend
- `frontend/package.json` - Dependencias React
- `frontend/Dockerfile` - Imagen Docker multi-stage
- `frontend/nginx.conf` - Configuración Nginx
- `frontend/tailwind.config.js` - Configuración Tailwind CSS
- `frontend/postcss.config.js` - Configuración PostCSS

### Docker
- `docker-compose.yml` - Orquestación de contenedores
- `.dockerignore` - Archivos excluidos de Docker

### Git
- `.gitignore` - Archivos excluidos de Git
- `backend/.gitignore` - Exclusiones específicas del backend
- `frontend/.gitignore` - Exclusiones específicas del frontend

## Scripts de Utilidad

Ubicados en `scripts/`:

1. **check-setup.sh** - Verifica que todo esté configurado correctamente
2. **dev-start.sh** - Inicia backend y frontend en modo desarrollo
3. **docker-setup.sh** - Configura e inicia Docker Compose
4. **generate-qr.sh** - Genera código QR rápidamente

### Cómo usar los scripts

```bash
# Verificar configuración
bash scripts/check-setup.sh

# Iniciar en desarrollo
bash scripts/dev-start.sh

# Setup con Docker
bash scripts/docker-setup.sh

# Generar QR
bash scripts/generate-qr.sh
```

## Código Fuente

### Backend (Node.js/Express)

**Configuración**
- `backend/src/config/googleDrive.js` - Config OAuth2 y Google Drive

**Controladores**
- `backend/src/controllers/galleryController.js` - Lógica de galería
- `backend/src/controllers/qrController.js` - Lógica de QR codes
- `backend/src/controllers/uploadController.js` - Lógica de subida

**Middleware**
- `backend/src/middleware/errorHandler.js` - Manejo de errores
- `backend/src/middleware/upload.js` - Configuración Multer

**Rutas**
- `backend/src/routes/authRoutes.js` - Rutas OAuth
- `backend/src/routes/galleryRoutes.js` - Rutas de galería
- `backend/src/routes/qrRoutes.js` - Rutas de QR
- `backend/src/routes/uploadRoutes.js` - Rutas de subida

**Servicios**
- `backend/src/services/googleDriveService.js` - Servicio Google Drive
- `backend/src/services/qrCodeService.js` - Servicio de QR codes

**Servidor**
- `backend/src/server.js` - Punto de entrada del servidor

### Frontend (React)

**Componentes**
- `frontend/src/components/FileUpload.jsx` - Componente de carga
- `frontend/src/components/Footer.jsx` - Footer
- `frontend/src/components/Gallery.jsx` - Galería de fotos
- `frontend/src/components/Header.jsx` - Header/Navbar
- `frontend/src/components/Hero.jsx` - Sección hero
- `frontend/src/components/Stats.jsx` - Estadísticas

**Hooks**
- `frontend/src/hooks/useInfiniteScroll.js` - Hook de scroll infinito

**Utilidades**
- `frontend/src/utils/api.js` - Cliente API con Axios

**Principal**
- `frontend/src/App.js` - Componente raíz
- `frontend/src/index.js` - Punto de entrada React
- `frontend/src/index.css` - Estilos globales

## Flujo de Lectura Recomendado

### Si tienes 5 minutos
1. [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)

### Si tienes 15 minutos
1. [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)
2. [QUICK_START.md](QUICK_START.md)

### Si tienes 30 minutos
1. [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)
2. [QUICK_START.md](QUICK_START.md)
3. [README.md](README.md)

### Si tienes 1 hora
1. [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)
2. [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. [README.md](README.md)
4. [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

### Si quieres entender todo
1. [RESUMEN_PROYECTO.md](RESUMEN_PROYECTO.md)
2. [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. [README.md](README.md)
4. [ARCHITECTURE.md](ARCHITECTURE.md)
5. [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
6. [CONTRIBUTING.md](CONTRIBUTING.md)

## Búsqueda Rápida

### "¿Cómo hacer X?"

| Pregunta | Documento | Sección |
|----------|-----------|---------|
| ¿Cómo instalar? | QUICK_START.md | 3 Pasos para Iniciar |
| ¿Cómo configurar Google Drive? | SETUP_GUIDE.md | Paso 2 |
| ¿Cómo generar QR? | QUICK_START.md | Generar Código QR |
| ¿Cómo cambiar colores? | QUICK_START.md | Personalización Rápida |
| ¿Cómo desplegar en producción? | README.md | Producción |
| ¿Cómo contribuir? | CONTRIBUTING.md | Todo el documento |
| ¿Qué tecnologías usa? | RESUMEN_PROYECTO.md | Stack Tecnológico |
| ¿Cómo funciona internamente? | ARCHITECTURE.md | Todo el documento |
| ¿Dónde está el código X? | PROJECT_STRUCTURE.md | Árbol de Directorios |

## Solución de Problemas

### Por Tipo de Error

| Error | Documento | Sección |
|-------|-----------|---------|
| Error de instalación | SETUP_GUIDE.md | Solución de Problemas Comunes |
| Error de Docker | QUICK_START.md | Solución Rápida de Problemas |
| Error de configuración | SETUP_GUIDE.md | Paso 4 |
| Error de Google Drive | README.md | Solución de Problemas |
| Error de CORS | QUICK_START.md | Solución Rápida de Problemas |

## Glosario de Términos

| Término | Significado | Más info |
|---------|-------------|----------|
| QR Code | Código de barras 2D | README.md |
| OAuth 2.0 | Protocolo de autenticación | SETUP_GUIDE.md |
| Lazy Loading | Carga diferida | ARCHITECTURE.md |
| Docker Compose | Orquestador de contenedores | QUICK_START.md |
| Multer | Middleware para archivos | ARCHITECTURE.md |
| Google Drive API | API de Google Drive | SETUP_GUIDE.md |
| Tailwind CSS | Framework CSS | PROJECT_STRUCTURE.md |
| Flowbite | Componentes UI | PROJECT_STRUCTURE.md |

## Versiones

- **Proyecto**: 1.0.0
- **Node.js**: 18.x
- **React**: 18.2.0
- **Express**: 4.18.2
- **Docker**: 20.10+

## Licencia

Este proyecto está bajo licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## Última Actualización

**Fecha**: 2026-01-03
**Estado**: Production Ready ✅

---

¿Tienes preguntas? Consulta la documentación correspondiente o revisa la sección de Solución de Problemas en [README.md](README.md)
