
# Multiverse Projects

Bienvenido al Multiverso Purrpurt.

Este directorio está destinado a albergar los proyectos satélite que orbitan alrededor de la arquitectura central (Flagship Agency).

## Instrucciones de Integración

1. **Mover Carpetas:**
   Puedes mover las carpetas de tus otros proyectos (repositorios) aquí dentro.
   Ejemplo:
   - `src/multiverse/pigmento/`
   - `src/multiverse/victory-cars/`

2. **Registrar en el Universo 3D:**
   Para que aparezcan visualizados orbitando el planeta, debes registrarlos en el archivo de configuración:
   `src/data/purrpurr-architecture.ts`

   Busca la constante `MULTIVERSE_PROJECTS` y agrega una entrada:

   ```typescript
   {
       id: 'unique-id',
       name: 'Nombre del Proyecto',
       description: 'Breve descripción.',
       type: 'startup', // o 'tool'
       orbitRadius: 30, // Distancia del centro (ajustar para que no choquen)
       orbitSpeed: 0.1, // Velocidad de rotación
       color: '#ff0000' // Color representativo
   }
   ```
