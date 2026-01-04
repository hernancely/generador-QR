# Guía de Contribución

Gracias por tu interés en mejorar este proyecto. Esta guía te ayudará a contribuir de manera efectiva.

## Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor crea un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs. actual
- Screenshots si es posible
- Versión del navegador/sistema operativo

### Sugerir Mejoras

Las sugerencias son bienvenidas. Incluye:
- Descripción detallada de la funcionalidad
- Casos de uso
- Mockups o ejemplos si es posible

### Pull Requests

1. Fork el repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit de tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## Estándares de Código

### Backend (Node.js)
- Usa ES6+ features
- Async/await para código asíncrono
- Maneja errores apropiadamente con try-catch
- Documenta funciones con JSDoc
- Usa nombres descriptivos para variables y funciones

### Frontend (React)
- Componentes funcionales con Hooks
- PropTypes o TypeScript para type checking
- Nombres de componentes en PascalCase
- Nombres de archivos coinciden con el componente
- CSS con Tailwind utilities

### Commits
- Mensajes descriptivos en español o inglés
- Formato: `tipo: descripción`
- Tipos: feat, fix, docs, style, refactor, test, chore

Ejemplos:
```
feat: agrega filtro de búsqueda en galería
fix: corrige error en carga de archivos grandes
docs: actualiza guía de configuración
```

## Testing

Antes de hacer un PR:
- Prueba localmente con `npm start`
- Verifica que el build funcione: `npm run build`
- Prueba con Docker si es posible
- Verifica que no haya errores en la consola

## Estructura de Directorios

Mantén los archivos organizados:
- Backend: `backend/src/[tipo]/[archivo].js`
- Frontend: `frontend/src/[tipo]/[Archivo].jsx`
- Docs: Raíz del proyecto

## Documentación

- Actualiza README.md si cambias funcionalidad principal
- Documenta nuevas APIs en ARCHITECTURE.md
- Agrega ejemplos de uso cuando sea relevante

## Preguntas

Si tienes preguntas, abre un issue con la etiqueta "question".

Gracias por contribuir!
