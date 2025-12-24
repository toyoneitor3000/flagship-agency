# Cómo Robar (Ingeniería Inversa) Efectos de la Web

Si ves una web como **Monopo** o **Awwwards** y quieres su fondo, este es el proceso real para copiarlo. No es magia, es depuración.

## 1. Identificar la Tecnología (El "¿Qué es?")
Lo primero es saber si es **Código (WebGL/Canvas)** o **Truco CSS**.

*   **Paso 1:** Clic derecho -> `Inspect` (Inspeccionar).
*   **Paso 2:** Pasa el mouse sobre el fondo.
    *   **Si es un `<canvas>`:** Es WebGL (Three.js, OGL, Pixi). Esto es programación de shaders (GLSL). Es lo más difícil de copiar "pegando código".
    *   **Si son muchos `<div>`:** Es CSS con esteroides. (Blur, gradientes, animaciones). **Esto es lo que usa Monopo para sus efectos de "niebla"**.
    *   **Si es un `<video>`:** Es un video en loop (trampa común).

## 2. Para Efectos CSS (Como el que hicimos)
Si ves `divs` con clases raras o estilos inline (`transform: translate(...)`):

1.  **Busca el "Truco Visual":**
    *   En la pestaña `Styles` (Estilos), filtra por propiedades clave: `filter: blur()`, `mix-blend-mode`, `opacity`.
    *   *En Monopo:* Usan `mix-blend-mode: screen` o `difference` para que los colores se sumen y brillen.

2.  **Busca el "Motor de Movimiento":**
    *   Si los números en el DOM cambian locamente (`transform: translate3d(12px, 50px, 0)`), están usando **JavaScript** para animar.
    *   Si ves clases como `animate-pulse` o `@keyframes`, es **CSS puro**.

## 3. Para Efectos WebGL (`<canvas>`)
Si es un Canvas, el código está compilado en la GPU. No puedes "ver" el estilo CSS.

1.  **Instala Spector.js:** Una extensión de Chrome que captura el "frame" y te dice qué comandos gráficos se enviaron.
2.  **Busca librerías:** En la pestaña `Sources` (Fuentes) de DevTools, busca archivos como `three.min.js`, `ogl.js` o `gsap`.
    *   *Si usan Three.js:* Buscan shaders (`.frag`, `.vert`).
    *   *Si usan OGL:* Es una versión ligera de Three.js (muy común en agencias top).

## 4. El "Robo" Conceptual (Replicación)
No copies el código minificado (es ilegible). Copia la **Lógica Física**.

**Ejemplo Monopo:**
1.  **Observación:** "Hay bolas de color que me siguen, pero tardan en llegar".
2.  **Traducción a Código:**
    *   "Bolas de color" = `div` con `rounded-full` y `bg-color`.
    *   "Siguen al mouse" = Evento `mousemove`.
    *   "Tardan en llegar" = Física de resortes (Spring Physics) o Interpolación Lineal (Lerp).

**Por eso escribí el código así:**
*   Usé `Framer Motion` (Springs) para simular el "tardan en llegar".
*   Usé `mix-blend-mode` para simular la "fusión de colores" de Monopo.
*   Usé `blur(120px)` para que no parezcan bolas, sino gas.

---

### Resumen para tu Próximo Robo:
1.  **Inspecciona**: ¿Es Canvas o Divs?
2.  **Aisla**: Borra nodos del DOM hasta que solo quede el efecto.
3.  **Replica la Física**: No el código, sino el comportamiento (rebote, inercia, pegamento).
