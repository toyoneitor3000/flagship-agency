# 🚀 Guía Rápida: Usar Skills y MCP

## ✅ Ya tienes instalado

### 4 Skills de Vercel
1. ✅ **vercel-composition-patterns** - Patrones de componentes React
2. ✅ **vercel-react-best-practices** - 57 reglas de optimización Next.js/React
3. ✅ **vercel-react-native-skills** - Mejores prácticas React Native
4. ✅ **web-design-guidelines** - Auditoría de accesibilidad y UX

---

## 🎯 Cómo Usar las Skills

### Ejemplos Prácticos

#### 1️⃣ Optimizar un componente específico
```
Revisa src/app/detailing/components/Quoter.tsx usando vercel-react-best-practices
```

#### 2️⃣ Auditar accesibilidad de una página
```
Revisa src/app/detailing/page.tsx con web-design-guidelines
```

#### 3️⃣ Refactorizar con mejores patrones
```
Refactoriza ServiceCard usando vercel-composition-patterns para eliminar props booleanos
```

#### 4️⃣ Review completo antes de deployment
```
Revisa todos los archivos modificados con react-best-practices (solo issues CRITICAL y HIGH)
```

---

## 🔥 Use Cases Más Comunes

### Performance Optimization
```
"Analiza performance de [archivo] con react-best-practices enfocándote en:
- Bundle size
- Waterfalls
- Re-renders"
```

### Accessibility Audit
```
"Haz una auditoría de accesibilidad completa de la app usando web-design-guidelines"
```

### Component Architecture
```
"Este componente tiene demasiados props, aplica composition-patterns para mejorarlo"
```

### Before Production
```
"Antes de /subir, revisa cambios con:
1. web-design-guidelines para UX
2. react-best-practices para performance (CRITICAL only)"
```

---

## ⚡ Atajos Rápidos

### Ver reglas disponibles
```
Muéstrame las reglas CRITICAL de react-best-practices
```

### Ejemplo de una regla específica
```
Explícame async-parallel con ejemplo
```

### Aplicar múltiples skills
```
Optimiza este componente usando:
1. composition-patterns para arquitectura
2. react-best-practices para performance
```

---

## 📊 Prioridades de Optimización

Si tienes tiempo limitado, enfócate en:

### 🔴 CRITICAL (hacer siempre)
- `async-parallel` - Paralelizar operaciones independientes
- `bundle-barrel-imports` - Evitar imports de barrel files
- `bundle-dynamic-imports` - Code splitting de componentes pesados

### 🟠 HIGH (hacer si afecta UX)
- `server-cache-react` - Deduplicación de requests
- `server-parallel-fetching` - Paralelizar fetching en servidor
- Accesibilidad básica (ARIA, semántica)

### 🟡 MEDIUM (optimización continua)
- Re-render optimization
- Rendering performance
- UX polish

---

## 🛠️ Instalar MCP Servers (Opcional)

### Para desarrollo más avanzado:

#### 1. Vercel AI SDK
```bash
# En .mcp.json, cambiar "disabled": false
# Agregar VERCEL_API_TOKEN en .env.local
```

#### 2. GitHub Integration
```bash
# Agregar GITHUB_PERSONAL_ACCESS_TOKEN
# Permitirá crear issues, PRs desde el asistente
```

#### 3. Database Access
```bash
# Configurar DATABASE_URL en .mcp.json
# Permitirá queries directos a Turso
```

Ver `.mcp.json.example` para configuración completa.

---

## 📚 Documentación Completa

Lee `.agent/INSTALLED_SKILLS_MCP.md` para:
- Descripción detallada de cada skill
- Todas las 57 reglas de react-best-practices
- Guía de configuración MCP
- Mejores prácticas avanzadas
- Métricas de impacto esperadas

---

## 💬 Preguntas Frecuentes

**P: ¿Las skills funcionan automáticamente?**
R: Sí, pero debes pedirme explícitamente que las use. Ej: "revisa con web-design-guidelines"

**P: ¿Puedo desactivar alguna skill?**
R: Sí, simplemente elimina la carpeta de `.agent/skills/`

**P: ¿Las skills se actualizan?**
R: Ejecuta `npx skills update` para actualizar todas

**P: ¿Qué es MCP?**
R: Model Context Protocol - permite conectar asistentes IA con herramientas externas (GitHub, bases de datos, APIs)

---

**¡Listo para usar! 🎉** Solo pídeme que revise tu código con las skills instaladas.
