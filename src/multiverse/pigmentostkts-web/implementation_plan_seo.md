# Plan de Implementación de Organización SEO para Pigmento

Este documento detalla la estrategia y los pasos técnicos para posicionar los servicios y productos de Pigmento en la web, asegurando visibilidad en motores de búsqueda como Google.

## Estado Actual
- **Tecnología:** Next.js 14 (App Router).
- **Faltantes Críticos:** `sitemap.xml`, `robots.txt`, Datos Estructurados (Schema.org), Metadatos dinámicos detallados, Canonical URLs.
- **Oportunidades:** Páginas de servicios (`/sticker-maker`, `/diseno`, `/packs`) tienen alto potencial de tráfico transaccional.

---

## Fase 1: Fundamentos Técnicos (Technical SEO)
*Objetivo: Asegurar que Google pueda rastrear, indexar y entender el sitio correctamente.*

### 1. Configuración de Metadatos (Next.js Metadata API)
Implementar objetos `metadata` dinámicos y estáticos en cada `layout.tsx` y `page.tsx`.
- **Global:** Configurar plantillas de título (`%s | Pigmento Stickers`) y Open Graph por defecto.
- **Páginas Específicas:**
    - Inicio: Enfoque en marca general y propuesta de valor única.
    - `/sticker-maker`: Keywords como "crear stickers online", "editor de stickers".
    - `/diseno`: Keywords como "agencia de diseño gráfico", "branding", "diseño de logos".
    - `/packs`: Keywords como "paquetes de stickers", "ofertas de impresión".
    - `/cotizador`: Keywords transaccionales.

### 2. Archivos de Rastreo
- **`src/app/robots.ts`:** Generar archivo `robots.txt` para guiar a los crawlers.
- **`src/app/sitemap.ts`:** Generar dinámicamente el mapa del sitio XML incluyendo todas las rutas públicas.

### 3. Datos Estructurados (JSON-LD)
Implementar Schema.org para enriquecer los resultados de búsqueda (Rich Snippets).
- **Organization Schema:** En el home (Logo, Redes Sociales, Contacto).
- **LocalBusiness Schema:** Información física si aplica, o servicio online.
- **Product Schema:** En páginas de venta (Packs, Stickers).
- **Service Schema:** En la página de Diseño.
- **FAQPage Schema:** En la sección `/faq`.

### 4. Canonical URLs
Asegurar que cada página apunte a su versión canónica para evitar contenido duplicado (especialmente si hay parámetros de URL).

### 5. Optimización de Imágenes
- Auditoria de textos `alt` en todas las etiquetas `Img` y componentes `Image`.
- Asegurar nombres de archivo descriptivos (no `IMG_123.jpg`, sino `sticker-holografico-personalizado.jpg`).

---

## Fase 2: Estrategia de Contenido y Palabras Clave (On-Page SEO)
*Objetivo: Responder a la intención de búsqueda de los usuarios.*

### 1. Investigación de Palabras Clave (Keyword Research)
Identificar términos con volumen de búsqueda y alta intención de compra.
- *Ejemplos:* "Impresión de stickers Colombia", "Stickers personalizados moto", "Diseño de marca precio".

### 2. Optimización de Contenido Existente
- **Encabezados (Hx):** Revisar que cada página tenga un único `H1` y una jerarquía lógica de `H2` y `H3`.
- **Densidad de Texto:** Aumentar el contenido explicativo en páginas clave. Google necesita texto para entender de qué trata la página (especialmente en `/diseno` y `/sticker-maker`).

### 3. Blog / Recursos (Recomendado)
Crear una sección `/blog` o `/recursos` para captar tráfico "top of funnel" (informativo).
- Ideas de artículos: "Vinilo mate vs brillante: ¿Cuál elegir?", "Cómo pegar stickers sin burbujas", "Tendencias de diseño de stickers 2026".

---

## Fase 3: SEO Local y Off-Page
*Objetivo: Autoridad y relevancia geográfica.*

### 1. Google My Business
- Crear/Optimizar ficha de Google My Business si hay ubicación física o área de servicio definida.
- Incrustar mapa en el footer o página de contacto.

### 2. Backlinks
- Estrategia para conseguir enlaces de sitios relevantes (blogs de diseño, directorios locales, colaboraciones).

---

## Fase 4: Monitoreo y Analítica
*Objetivo: Medir resultados y ajustar.*

### 1. Google Search Console
- Verificar la propiedad del dominio.
- Enviar sitemap.
- Monitorear errores de indexación y rendimiento (clics, impresiones).

### 2. Analítica Web
- Implementar Google Analytics 4 (GA4) o una alternativa privada como PostHog (ya que usas Next.js).
- Configurar eventos de conversión (Clic en "Comprar", "Contactar", "Diseñar").

---

## Plan de Acción Inmediato (Siguientes Pasos)

1.  **Ejecutar Fase 1 (Técnica):**
    - Crear `robots.ts` y `sitemap.ts`.
    - Actualizar `metadata` en el `layout.tsx` principal.
    - Definir `metadata` específica para las páginas principales (`/sticker-maker`, `/diseno`, `/faq`).

2.  **Validación:**
    - Usar herramienta de Lighthouse para auditar SEO score inicial.

¿Procedemos con la implementación de la **Fase 1**?
