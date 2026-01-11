# Plan de Implementación: Checkout & Pagos (Fase 1)

Para cobrar dinero real de forma automatizada, necesitamos orquestar 3 capas: Frontend (Interfaz), Backend (Procesamiento) y Pasarela (El Banco).

## 1. LO QUE NECESITAMOS (Requisitos Técnicos)

### A. La Pasarela de Pagos (El Banco Digital)
Necesitamos un proveedor que acepte tarjetas colombianas, PSE y dólares.
*   **Opción A (Recomendada LATAM):** **Wompi** (Bancolombia) o **MercadoPago**.
    *   *Ventaja:* Muy fácil para el colombiano promedio (PSE, Nequi).
    *   *Desventaja:* Menos flexible para dólares que Stripe.
*   **Opción B (Recomendada Global):** **Stripe**.
    *   *Ventaja:* Estándar mundial, fácil integración.
    *   *Desventaja:* Requiere cuenta en USA/Europa (o usar Stripe Atlas).
*   **Opción C (Intermedia):** **Lemon Squeezy / Paddle**.
    *   *Ventaja:* Actúan como "Merchant of Record". Ellos cobran, pagan impuestos y te giran a ti. Ideal para vender software global sin líos legales.

### B. Base de Datos (Quién pagó qué)
Necesitamos actualizar nuestro esquema de Prisma (`schema.prisma`) para guardar:
1.  **Suscripciones:** ¿Qué plan compró? ¿Cuándo vence?
2.  **Facturación:** Historial de pagos.

### C. La Página de Checkout (`/checkout`)
Una página limpia y segura que:
1.  Muestre el resumen del plan (Semilla/Despegue).
2.  Pida datos básicos (Email, Nombre).
3.  Tenga el botón de pago (Integrado con la pasarela).

---

## 2. PASOS DE EJECUCIÓN (Roadmap)

1.  **Selección de Pasarela:**
    *   Decisión Inmediata: ¿Usamos **MercadoPago** (Colombia Friendly) o solo simulamos el pago por ahora para capturar el lead?
    *   *Recomendación Presupuesto Cero:* Usar un "Botón de WhatsApp" para cerrar la venta manual o **Link de Pago Manual** al principio, y luego automatizar.
    *   *Opción Pro:* Integrar **MercadoPago Checkout Pro** (Es gratis la integración, cobran comisión por venta).

2.  **Base de Datos:**
    *   Crear modelo `Subscription` y `Payment` en Prisma.

3.  **Frontend:**
    *   Crear `src/app/checkout/page.tsx`.
    *   Diseñar la tarjeta de resumen de compra.

---

## 3. ¿QUÉ HACEMOS YA? (Acción Inmediata)

Propongo empezar con el **"Checkout Híbrido"**:
1.  El usuario llena sus datos en `/checkout`.
2.  Se crea la cuenta en nuestra base de datos (Lead capturado).
3.  Si es Plan Semilla ($19k), le mostramos un **QR de Bancolombia/Nequi** o **Link de Wompi**.
4.  Cuando pague, activamos manualmente (por ahora) o vía Webhook (automático después).

Esto nos permite vender HOY sin esperar aprobaciones bancarias complejas.
