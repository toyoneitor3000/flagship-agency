# Análisis de Viabilidad y Estructura de Costos - Purrpurr 2026

Este documento detalla la estructura de costos real, comenzando desde **CERO PRESUPUESTO**, y cómo escalar los márgenes de ganancia.

## FASE 0: PROTOCOLO "PRESUPUESTO CERO" (BOOTSTRAPPING)

**Situación Actual:** Iniciamos sin capital externo.
**Estrategia:** "Costo Marginal Cero". Usamos las capas gratuitas (Free Tiers) de servicios premium hasta que el primer cliente pague.

### El Stack Tecnológico Gratuito (Para empezar HOY):
1.  **Hosting Frontend:** **Vercel Hobby** (Para demos) o **Cloudflare Pages** (Recomendado para producción real gratuita).
    *   *Cloudflare Pages:* Permite dominios personalizados, SSL gratis y uso comercial sin costo. **Costo: $0.**
2.  **Base de Datos:** **Turso (Hobby Tier)**.
    *   Límite: 9 Millones de lecturas/mes. Suficiente para ~10,000 visitas/día. **Costo: $0.**
3.  **Emails:** **Resend (Free)**.
    *   3,000 correos/mes. Suficiente para arrancar. **Costo: $0.**
4.  **Autenticación:** **Auth.js (NextAuth)**. Open source, sin costos mensuales por usuario activo (a diferencia de Auth0 o Clerk que cobran caro rápido). **Costo: $0.**

### Regla de Oro Financiera: "El Cliente Financia su Propio Lujo"
*   Nunca pagamos un servidor por adelantado.
*   El **Primer Cliente Power ($1.6M COP)** que cierres, paga con su primera mensualidad 12 meses de un servidor VPS básico ($5 USD/mes) o 1 mes de un servidor Enterprise.
*   Hasta entonces, todo corre en infraestructura Serverless gratuita y escalable.

---

## 1. Desglose de Planes y Costos (Unit Economics)

### A. Plan DIY (Acceso Laboratorio)
*Objetivo: Volumen, bajo contacto, entrada al ecosistema.*

*   **Precio al Cliente:** $220,000 COP / mes (~$55 USD).
*   **Promesa:** Hosting incluido, Dashboard CMS, Soporte Básico.
*   **Costos Reales (COGS):**
    *   **Hosting:** $0 - $5 USD/mes (Vercel Free tier para empezar, luego VPS con Coolify para volumen).
    *   **Base de Datos (Turso):** $0 USD (Free tier generoso) -> $29/mes (Scalable, dividido entre muchos clientes).
    *   **Dominio:** ~$1 USD/mes (prorrateado anual).
    *   **Costo Total Estimado:** ~$6 USD/mes.
*   **Margen Bruto:** ~$49 USD (89%).
*   **Riesgo Principal:** Soporte técnico excesivo.
*   **Mitigación (Reglas Claras):**
    *   Soporte *solo* por Email/Ticket (no WhatsApp).
    *   El "Dashboard" permite editar textos e imágenes, *no* estructura crítica.
    *   Sin acceso al código fuente.

### B. Plan Power (Suscripción Managed)
*Objetivo: Cashflow recurrente fuerte, fidelización total.*

*   **Precio al Cliente:** $1,600,000 COP / mes (~$400 USD).
*   **Promesa:** "Tu departamento de tecnología", Cambios ilimitados, Servidores potentes.
*   **Costos Reales (COGS):**
    *   **Infraestructura Dedicada (VPS):** ~$20 - $40 USD/mes (Hetzner/DigitalOcean). Esto le da "Poder" real y aislamiento.
    *   **Mano de Obra (Tú/Equipo):** El costo más alto. Si cobras tu hora a $50 USD, solo puedes dedicar 6-7 horas al mes para mantener margen.
    *   **Herramientas (Sentry, Analytics):** $10 USD/mes.
*   **Margen Bruto:** Variable. Si el cliente pide mucho, el margen baja.
*   **La Trampa de "Ilimitado":**
    *   Para que sea negocio, **"Ilimitado" debe significar "Una tarea activa a la vez"**.
    *   El cliente pide un cambio -> Se entrega en 24-48h -> El cliente aprueba -> Puede pedir el siguiente.
    *   Esto limita la carga operativa a un flujo constante pero manejable, evitando picos de 100 horas en una semana.
*   **Factor Estratégico:** Aquí migramos a los clientes a infraestructura propia (VPS/Docker) para no pagar sobrecostos de Vercel/AWS por ancho de banda.

### C. Plan Growth (Enterprise)
*Objetivo: Grandes pagos, casos de éxito, equity.*

*   **Precio al Cliente:** Desde $16,000 USD / año.
*   **Estructura:** Consultoría + Desarrollo a Medida.
*   **Costos:**
    *   Hosting: Irrelevante (se cobra aparte o está holgadamente cubierto).
    *   Equipo: Se contrata freelancers o equipo dedicado según el proyecto.
*   **Estrategia:** Este plan financia el desarrollo de la tecnología "Purrpurr" (Core) que luego se vende simplificada en el plan DIY.

---

## 2. Decisiones Técnicas Inmediatas (Infraestructura)

Para que los números anteriores funcionen y podamos decir "Vendemos Poder" sin mentir:

### 1. Salir de Vercel para Producción Masiva (Plan Power)
Vercel es excelente para desarrollo (DX), pero caro para escalar.
*   **Solución:** Implementar **Coolify** (Self-hosted Vercel) en un VPS potente (Hetzner AX41 = 64GB RAM por 40€).
*   **Resultado:** Podemos alojar 50-100 clientes "Power" en ese solo servidor con rendimiento brutal, pagando centavos por cliente.

### 2. Definición del "Dashboard"
El cliente espera un panel de control. No podemos construir uno nuevo para cada cliente.
*   **Nivel 1 (DIY):** CMS Headless integrado (ej. Sanity o Strapi) o un panel propio simple conectado a la DB que permita editar Textos, Precios e Imágenes.
*   **Nivel 2 (Power):** Lo anterior + Panel de Métricas (Plausible Analytics self-hosted para no pagar Google/otros) + Panel de Leads (Tabla de contactos capturados).

### 3. Límites del Hosting (Letra Pequeña)
Aunque es "Ilimitado" comercialmente, técnicamente debemos protegernos.
*   **Almacenamiento:** 10GB - 50GB (Suficiente para web, poco para video hosting 4k).
*   **Video:** Usar Cloudflare Stream (como ya hacemos) y cobrar el exceso si pasan de X minutos vistos, o incluir un paquete generoso y absorber el costo.

## 3. Hoja de Ruta Comercial (Colombia -> USA)

1.  **Fase 1 (Colombia - Validación):**
    *   Vender Planes DIY a $220k COP para llenar caja y probar el "Dashboard".
    *   Vender 3-5 Planes Power a $1.6M COP para pulir el flujo de "Pedidos Ilimitados".
    *   **Meta:** $10M COP/mes recurrentes (MRR) con ~10 clientes mixtos.

2.  **Fase 2 (USA - Expansión):**
    *   El Plan DIY sube a $99 USD/mes (Barato para USA).
    *   El Plan Power sube a $999 USD/mes (Precio de agencia "barata", servicio premium).
    *   La infraestructura (Coolify/VPS) ya estará pagada por los clientes colombianos, así que cada cliente dólar es utilidad pura.

## Conclusión

El modelo es viable **SI Y SOLO SI** controlamos la infraestructura (Adiós Vercel Pro para clientes finales, Hola VPS propio) y definimos "Ilimitado" como "Secuencial" (una tarea a la vez).
