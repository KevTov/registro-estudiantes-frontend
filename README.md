# Sistema de Registro de Estudiantes - Frontend

Aplicación web desarrollada con Angular 19 para el registro de estudiantes y gestión de materias.

## Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- Angular CLI 19
- Backend ejecutándose en http://localhost:5186

### Ejecutar la aplicación
```bash
git clone [url-repositorio]
cd registro-estudiantes-frontend
npm install
ng serve
```

**URL de acceso:** http://localhost:4200

## Estructura del Proyecto

- **src/app/components**: Componentes de la aplicación
- **src/app/services**: Servicios para comunicación con API
- **src/app/models**: Interfaces y modelos TypeScript

## Funcionalidades

- Dashboard con estadísticas en tiempo real
- Formulario de registro de estudiantes con validaciones
- Selección inteligente de materias (máximo 3, sin repetir profesores)
- Lista de estudiantes registrados
- Visualización de materias y profesores disponibles
- Diseño responsive y moderno

## Validaciones del Frontend

- Formularios reactivos con validación en tiempo real
- Validación de email y teléfono
- Control de máximo 3 materias por estudiante
- Prevención de selección de materias del mismo profesor

## Configuración de API

La URL del backend se configura en:
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5186/api'
};
```

## Tecnologías Utilizadas

- Angular 19
- TypeScript
- Standalone Components
- Reactive Forms
- Bootstrap 5
- Font Awesome

## Build para Producción

```bash
ng build --prod
```

Los archivos se generan en la carpeta `dist/`

---

**Desarrollado por:** Kevin H. Tovar L.
