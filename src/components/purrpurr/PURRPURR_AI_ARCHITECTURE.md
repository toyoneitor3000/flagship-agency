# Purrpurr Guide: Arquitectura de "Inteligencia Nativa"

## 1. Visión del Proyecto
El objetivo es transformar al componente `PurrpurrGuide` de un elemento decorativo a un **Asistente de Sistema Reactivo**. En lugar de depender de APIs de IA costosas (OpenAI, Claude), utilizaremos **"Inteligencia Nativa"**: lógica determinista, matemáticas y análisis del DOM en tiempo real para simular consciencia y utilidad técnica.

**Filosofía:** "El laboratorio no alquila inteligencia, la genera."

---

## 2. Mapa de Funciones por Contexto (Role Distribution)
Para evitar la congestión de funcionalidades, el comportamiento de Purrpurr cambiará dinámicamente según la página (Laboratorio) en la que se encuentre el usuario.

### 📍 Dashboard Principal (`/purrpurr-test`)
*   **Rol:** `System Nexus (Concierge)`
*   **Función Principal:** **Navegación y Estado**.
*   **Comportamiento:**
    *   Saluda al usuario.
    *   Notifica sobre nuevos módulos disponibles.
    *   Reporta el estado general del sistema ("All systems operational").
    *   *Futuro:* Gamificación (Easter eggs, desbloqueo de temas).

### 📍 Laboratorio de Física (`/creative-test`)
*   **Rol:** `Telemetry Engineer (Ingeniero de Telemetría)`
*   **Función Principal:** **Monitor de Rendimiento**.
*   **Comportamiento:**
    *   Monitorea FPS (Frames Per Second) en tiempo real.
    *   Alerta sobre carga excesiva de partículas WebGL.
    *   Sugiere reducir la calidad si el dispositivo del usuario sufre.
    *   *Visual:* Usa gafas de seguridad o casco.

### 📍 Laboratorio de Tipografía (`/typography-test`)
*   **Rol:** `Design Critic (Crítico de Diseño)`
*   **Función Principal:** **Accesibilidad y Legibilidad**.
*   **Comportamiento:**
    *   Analiza el contraste entre texto y fondo.
    *   Detecta tamaños de fuente ilegibles (<12px).
    *   Muestra el nombre de la fuente activa al hacer hover.
    *   *Visual:* Usa monóculo o gafas de pasta.

### 📍 Laboratorio de Visuales (`/wallpaper-test`)
*   **Rol:** `Creative Muse (Musa Generativa)`
*   **Función Principal:** **Inspiración Procedural**.
*   **Comportamiento:**
    *   Botón "Remix": Genera combinaciones aleatorias de colores y patrones.
    *   Guarda configuraciones favoritas en `localStorage`.
    *   *Visual:* Cambia de color cromáticamente o tiene un aura artística.

### 🚨 Sistema Global (Cualquier Ruta)
*   **Rol:** `System Guardian (Depurador)`
*   **Función Principal:** **Manejo de Errores**.
*   **Comportamiento:**
    *   Intercepta `console.error`.
    *   Si la app falla (Error Boundary), Purrpurr aparece para explicar el error en lenguaje humano en lugar de mostrar una pantalla blanca de la muerte.

---

## 3. Hoja de Ruta de Implementación (Roadmap)

### Fase 1: La Base (The Brain) 🟢 *Status: Pendiente*
Crear el contexto que permitirá a Purrpurr "saber" dónde está y qué cerebro usar.
*   **Estructura:** Crear `PurrpurrContext.tsx`.
*   **Lógica:** Detectar `usePathname` y asignar el `currentRole` automáticamente.
*   **Entregable:** `PurrpurrGuide` cambia su `tip` automáticamente al navegar entre páginas.

### Fase 2: El Ojo Técnico (Telemetría) 🟡
Implementar el monitor de FPS en `/creative-test`.
*   **Tech:** `requestAnimationFrame` loop.
*   **Desafío:** Optimizar para que el observador no afecte el rendimiento que observa.

### Fase 3: La Musa (Randomizer) 🟡
Implementar la lógica generativa en `/wallpaper-test`.
*   **Tech:** Funciones matemáticas de color (HSL generation) y presets de ruido.

### Fase 4: El Crítico (Accesibilidad) 🔴
Implementar el análisis de DOM en `/typography-test`.
*   **Tech:** API `window.getComputedStyle`.

---

## 4. Guía para Desarrolladores
Al añadir una nueva funcionalidad a Purrpurr, sigue este patrón:

1.  **Definir el Trigger:** ¿Es por ruta (`/route`), por evento (`onClick`) o por estado del sistema (`fps_drop`)?
2.  **Definir la Reacción:** ¿Qué dice Purrpurr? ¿Qué animación ejecuta?
3.  **Coste Computacional:** Asegurar que la lógica sea ligera (O(1) o O(n) muy bajo). Purrpurr no debe ralentizar el laboratorio.

```typescript
// Ejemplo de estructura de estado futuro
type PurrpurrState = {
  mood: 'happy' | 'thinking' | 'worried' | 'glitch';
  role: 'concierge' | 'engineer' | 'critic' | 'muse';
  message: string;
  isVisible: boolean;
}
```
