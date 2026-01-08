---
description: Crear una demo para un cliente potencial
---

# Workflow: Crear Demo para Cliente

Este workflow te permite crear rápidamente una demo para un lead que solicitó ver cómo quedaría su página web.

## Comando Rápido

Copia y pega este formato para crear una demo:

```
/demo [nombre] | [industria] | [qué quieren] | [@instagram]
```

**Ejemplo:**
```
/demo Mi Taller Premium | automotriz | galería de trabajos + sistema de citas | @mitaller
```

---

## Proceso Paso a Paso

### 1. Recibir la solicitud
Cuando te llegue un email de demo o un lead de Instagram, copia los datos:
- Nombre del negocio
- Industria
- Instagram (si lo tienen)
- Qué quieren (del campo "mensaje" del formulario)

### 2. Crear el proyecto
// turbo
Ejecutar en terminal:
```bash
# Este comando se creará próximamente para automatizar
echo "Creando proyecto para [NOMBRE]..."
```

### 3. Diseñar la demo
Juntos definimos:
- Paleta de colores (extraer del IG si es posible)
- Secciones necesarias (Hero, Galería, Servicios, Contacto, etc.)
- Contenido base

### 4. Publicar preview
El sitio quedará disponible en:
```
purrpurr.app/sites/[slug-del-negocio]
```

### 5. Notificar al cliente
Enviar por WhatsApp:
```
Hola [Nombre]! 👋

Ya tenemos lista tu demo 🚀
Mírala aquí: purrpurr.app/sites/[slug]

¿Qué te parece? Cuéntame si quieres ajustar algo.
```

---

## Tracking de Leads

Después de crear cada demo, actualizar el estado en:
**Dashboard → Gestión de Leads** o directamente en `/dashboard/leads`

Estados:
- 🟡 Pendiente - No contactado
- 🔵 Contactado - Mensaje enviado
- 🟢 Demo Lista - Esperando feedback
- 💬 Respondió - En negociación
- 💰 Cerrado - Cliente
- ❌ Descartado - No interesado
