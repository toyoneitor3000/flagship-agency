# Manual de Identidad Visual - Victory Cars S.A.S.

> **Versión:** 3.0 (Sistema "Apple Style - Midnight Refined")  
> **Última Actualización:** 2026

Este documento establece los lineamientos visuales y de comunicación para la presencia digital de Victory Cars S.A.S. Su cumplimiento es obligatorio para mantener la consistencia de una marca premium, minimalista y ultra-limpia.

---

## 1. El Logotipo

El activo principal de la marca es el logotipo. 

- **Ubicación del Archivo Maestro:** `/public/logo.png`
- **Uso:** Debe utilizarse siempre sobre fondos oscuros (negro puro o grises muy oscuros). 
- **Restricciones:** 
  - No deformar.
  - No cambiar el color.
  - El logotipo debe tener suficiente espacio de respiro (negative space) a su alrededor.

---

## 2. Paleta de Color: "Midnight Refined"

La marca adopta una estética inspirada en el "Dark Mode" de Apple: pura, limpia, basada en altos contrastes entre negros profundos y blancos prístinos, con acentos de color sutiles.

### Colores Primarios
| Nombre | Token Tailwind | Hex | Uso |
| :--- | :--- | :--- | :--- |
| **Pure Black** | `bg-black` / `bg-brand-dark-blue` | `#000000` | Fondo principal. Evoca seriedad y minimalismo absoluto. |
| **Refined Cyan** | `text-brand-cyan` | `#06b6d4` | Color de acento sutil. Botones primarios, enlaces e indicadores activos. |
| **Crisp White** | `text-white` | `#ffffff` | Títulos y textos principales. |

### Colores Secundarios
| Nombre | Token Tailwind | Hex | Uso |
| :--- | :--- | :--- | :--- |
| **System Gray 6** | `bg-brand-mid-blue` | `#1c1c1e` | Tarjetas sólidas, modales, menús de navegación. |
| **System Gray** | `text-brand-slate` | `#8e8e93` | Textos de párrafo, descripciones secundarias, metadatos. |

---

## 3. Tipografía

La tipografía sigue las directrices de Human Interface Guidelines, priorizando la legibilidad (Clarity).

### Tipografía Principal
- **Familia:** `SF Pro Display`, `SF Pro Text`, con respaldo a `Inter` o `-apple-system`.
- **Variable Tailwind:** `font-sans`
- **Uso:** Todo el texto del sitio. 
- **Carácter:** Títulos (`h1`, `h2`) deben tener un `tracking-tight` (espaciado entre letras negativo) y grosores refinados (`font-semibold` o `font-bold`, nunca pesos exagerados). El cuerpo de texto debe ser limpio y con suficiente altura de línea.

*(Nota: Se abandonan las fuentes "Orbitron" y "Style Script" para maximizar la limpieza visual).*

---

## 4. Elementos de Interfaz (UI Tokens)

### Botones (Primary)
- Fondo: `bg-brand-cyan`
- Texto: `text-black` o `text-white` (dependiendo del contraste).
- Forma: `rounded-full` (Píldora).
- Padding: Amplio y equilibrado (ej. `px-6 py-2`).

### Tarjetas y Materiales (Liquid Glass)
- Fondo: `bg-white/5` o `bg-black/40` con un desenfoque alto (`backdrop-blur-2xl`).
- Borde: `border-white/10` o `border-white/5` (ultrafino y sutil).
- Sombras: Sombras suaves y amplias, no brillantes agresivas.

### Barra de Navegación (Navbar)
- Diseño ultra-minimalista tipo Apple.
- Fondo oscuro semi-transparente (`bg-black/50`) con desenfoque extremo (`backdrop-blur-2xl`).
- Borde inferior sutil (`border-b border-white/10`).
- Enlaces de navegación sutiles (`text-brand-slate` con hover a `text-white`).
- Botón de llamada a la acción (CTA) estilo píldora (`rounded-full`), con efecto "Liquid Glass" o color de acento.


### Espaciado (Negative Space)
- Todo elemento debe "respirar". Usa márgenes y paddings generosos (`py-24`, `gap-8`, etc.) para dar una sensación de lujo y elegancia.

---

## 5. Tono de Voz y Comunicación (Copywriting)

Victory Cars S.A.S. es una marca enfocada en los más altos estándares de calidad, seriedad y profesionalismo. 

- **Tono:** Serio, técnico, profesional, premium e inspirador.
- **Emoticones (Emojis):** **ESTRICTAMENTE PROHIBIDOS.**
- **Enfoque:** Textos cortos, directos y potentes (estilo presentación de Apple).

