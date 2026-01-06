# 🏗️ PURRPURR BLUEPRINT: The "Roblox for Web" Architecture

> **Estado:** Fase 3 (Deep Architecture)
> **Objetivo:** Definir la estructura de datos para sitios web de Nivel Agencia (High-End).

Este documento define la estructura de archivos y datos que el sistema debe generar. No es un simple "cambio de texto", es una arquitectura completa de **Sistemas de Información**.

---

## 1. El Modelo Mental "Purrpurr"

El usuario cree que está "chateando", pero el sistema está llenando una matriz compleja de datos.
**La Máquina** transforma esa matriz en código React/Next.js optimizado.

---

## 2. Anatomía de un Proyecto "High-Level" (Schema de Datos)

El `config.json` de cada proyecto debe contener estas secciones estrictas. Si el usuario no da la información, la **IA debe generarla** basándose en el contexto, pero la estructura no se puede romper.

### A. Global System (ADN de Marca)
```json
{
  "identity": {
    "name": "Nombre Marca",
    "domain": "marca.com",
    "seo": {
      "title": "Marca | Promesa de Valor (60 chars)",
      "description": "Descripción optimizada para Google (160 chars).",
      "keywords": ["sector", "nicho", "servicio"]
    },
    "brand": {
      "colors": {
        "primary": "#Hex",
        "secondary": "#Hex",
        "accent": "#Hex (Botones)",
        "surface": "#Hex (Fondos)"
      },
      "typography": {
        "heading": "Font Family (Display)",
        "body": "Font Family (Readable)"
      }
    }
  }
}
```

### B. Estructura de Secciones (El "Storylet")
Una web profesional narra una historia. El sistema debe generar estos bloques en orden:

1.  **HERO (La Promesa):** Que se entienda en 3 segundos qué hacen.
2.  **AUTHORITY (La Prueba):** Logos de clientes ("Confían en nosotros").
3.  **VALUE PROP (La Solución):** 3 Cards explicando beneficios, no características.
4.  **DEMO/WORK (La Evidencia):** Galería o Video del producto/servicio.
5.  **PRICING/OFFER (La Oferta):** Precios claros o paquetes.
6.  **FAQ (Objeciones):** Matar dudas antes de que pregunten.
7.  **FINAL CTA (El Cierre):** Última oportunidad para convertir.

---

## 3. Requerimientos para el Próximo Agente (Back-End)

Tu misión es construir el "Backend" que soporte esta complejidad.

### Base de Datos (Schema Relacional Revisado)
```prisma
model Project {
  id          String   @id @default(uuid())
  userId      String   @references
  
  // CORE DATA
  name        String
  status      String   @default("DRAFT") // DRAFT, PUBLISHED
  
  // EL CEREBRO DEL SITIO (Aquí se guarda toda la estructura de arriba)
  architecture Json    // Guarda el JSON completo de Identity + Secciones
  
  // ANALYTICS & INTEGRATIONS
  integrations Json?   // { "whatsapp": "+57...", "pixelId": "123" }
  
  createdAt   DateTime @default(now())
}
```

### Flujo de IA (El "Deep Process")
El chat no debe ser lineal. Debe ser iterativo:
1.  **Extracción:** El usuario dice "Vendo zapatillas".
2.  **Expansión AI:** El sistema deduce: "Necesita sección de Tallas, necesita Galería de Fotos, necesita Colores Urbanos".
3.  **Confirmación:** El sistema pregunta: "¿Tienes fotos de producto o usamos stock?"
4.  **Generación:** Se crea el JSON de Arquitectura.

---

## 4. Tareas Inmediatas
1.  Implementar la tabla `Project` en Prisma con el campo `architecture` tipo JSON.
2.  Crear un Endpoint `/api/architect/generate` que reciba el input simple del usuario y use la IA (Mock o Real) para "alucinar" la estructura completa profesional (SEO, Textos, Colores) y devolver el JSON listo para guardar.
3.  Conectar el Frontend (`/studio`) para que envíe el input a este endpoint.

---

**Nota Final:** Al cliente no se le cobra por "poner el texto". Se le cobra por **saber qué texto poner y dónde**. Eso es lo que automatizamos.
