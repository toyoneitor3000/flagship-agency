# 🤖 Agent Configuration - Flagship Agency

Esta carpeta contiene toda la configuración, skills y workflows para asistentes de IA que trabajan en este proyecto.

---

## 📁 Estructura

```
.agent/
├── skills/                              # Skills instaladas de Vercel
│   ├── vercel-composition-patterns      # Patrones de composición React
│   ├── vercel-react-best-practices/     # 57 reglas de optimización
│   ├── vercel-react-native-skills/      # Best practices React Native
│   └── web-design-guidelines/           # Auditoría UX/Accessibility
│
├── workflows/                           # Workflows personalizados del proyecto
│   ├── analizar-prospecto.md           # Análisis de perfiles Instagram
│   ├── crear-demo.md                   # Creación de demos
│   ├── inicia-el-servidor-flagship.md  # Inicio del servidor local
│   ├── produccion.md                   # Deploy automático producción
│   └── subir.md                        # Push GitHub + Deploy
│
├── INSTALLATION_SUMMARY.md             # ⭐ Resumen ejecutivo instalación
├── INSTALLED_SKILLS_MCP.md             # 📚 Documentación completa skills y MCP
├── QUICKSTART.md                       # 🚀 Guía rápida de inicio
├── PRACTICAL_EXAMPLES.md               # 🎨 Ejemplos del proyecto real
└── README.md                           # 📖 Este archivo
```

---

## 🚀 Inicio Rápido

### 1️⃣ Primera Vez Aquí
Lee primero: **`QUICKSTART.md`**

### 2️⃣ Ejemplos Prácticos
Para casos de uso específicos del proyecto: **`PRACTICAL_EXAMPLES.md`**

### 3️⃣ Documentación Completa
Para referencia detallada: **`INSTALLED_SKILLS_MCP.md`**

### 4️⃣ Estado de Instalación
Para ver qué está instalado: **`INSTALLATION_SUMMARY.md`**

---

## 📚 Archivos Principales

### `INSTALLATION_SUMMARY.md`
**Para qué:** Ver estado de instalación  
**Cuándo leer:** Después de instalar o actualizar skills  
**Contenido:**
- ✅ Status de cada skill
- 📊 Estructura del proyecto
- 🎯 Métricas esperadas
- 💡 Comandos de ejemplo

### `INSTALLED_SKILLS_MCP.md`
**Para qué:** Referencia completa  
**Cuándo leer:** Cuando necesites detalles de una skill  
**Contenido:**
- 📖 Descripción completa de cada skill
- 📋 Todas las 57 reglas de react-best-practices
- 🔧 Configuración MCP servers
- 🎓 Mejores prácticas
- 📈 Métricas de impacto

### `QUICKSTART.md`
**Para qué:** Empezar a usar rápidamente  
**Cuándo leer:** Primera vez usando las skills  
**Contenido:**
- ⚡ Comandos más comunes
- 🎯 Ejemplos rápidos
- 🔥 Use cases principales
- ❓ FAQ

### `PRACTICAL_EXAMPLES.md`
**Para qué:** Aplicar skills al proyecto real  
**Cuándo leer:** Cuando quieras optimizar algo específico  
**Contenido:**
- 🎨 10 casos de uso del proyecto Flagship
- 🔄 Integración con workflows
- 📊 Plan de optimización sugerido
- 💡 Tips específicos del proyecto

---

## 🛠️ Skills Instaladas

| Skill | Status | Uso |
|-------|--------|-----|
| vercel-composition-patterns | 🟢 | Arquitectura componentes |
| vercel-react-best-practices | 🟢 | Performance Next.js/React |
| vercel-react-native-skills | 🟢 | Mobile development |
| web-design-guidelines | 🟢 | UX/Accessibility |

---

## 🔄 Workflows Disponibles

| Comando | Descripción |
|---------|-------------|
| `/analizar-prospecto` | Analizar perfil Instagram |
| `/crear-demo` | Crear demo para cliente |
| `/inicia-el-servidor-flagship` | Update GitHub + Start server |
| `/produccion` | Deploy automático producción |
| `/subir` | Push GitHub + Deploy Vercel |

---

## 💡 Cómo Usar

### Pedir Review de Código
```
Revisa src/app/detailing/components/Quoter.tsx con react-best-practices
```

### Optimizar Performance
```
Optimiza [archivo] enfocándote en bundle size y re-renders
```

### Auditar Accesibilidad
```
Revisa la app con web-design-guidelines
```

### Refactorizar Componente
```
Aplica composition-patterns a ServiceCard
```

---

## 🔧 Configuración Adicional

### MCP Servers (Opcional)
1. Copiar `.mcp.json.example` → `.mcp.json`
2. Agregar tus API tokens
3. Cambiar `"disabled": false` en los servers que uses

**Servers disponibles:**
- Vercel AI SDK
- Next.js DevTools
- GitHub
- Filesystem
- Database (Turso/LibSQL)
- Git
- Y más...

Ver `.mcp.json.example` para detalles.

---

## 📖 Recursos

### Vercel Skills
- **Repo:** https://github.com/vercel-labs/agent-skills
- **Actualizar:** `npx skills update`

### Model Context Protocol
- **Docs:** https://modelcontextprotocol.io
- **Anthropic:** https://anthropic.com/mcp

### Next.js & React
- **Next.js 16:** https://nextjs.org/docs
- **React Best Practices:** Ver `skills/vercel-react-best-practices/AGENTS.md`

---

## 🆘 Ayuda

### No sé qué skill usar
Lee: `QUICKSTART.md` → sección "Use Cases"

### Quiero optimizar algo específico
Lee: `PRACTICAL_EXAMPLES.md` → busca tu caso

### Necesito detalles de una regla
Lee: `INSTALLED_SKILLS_MCP.md` → sección de la skill

### Quiero configurar MCP
Lee: `INSTALLED_SKILLS_MCP.md` → sección "Crear tu propio MCP Server"

---

## 🎯 Flujo de Trabajo Recomendado

### Al Desarrollar
```
1. Escribe código
2. Pide review con skill apropiada
3. Aplica sugerencias
4. Repite
```

### Antes de Deploy
```
1. Revisa cambios con web-design-guidelines
2. Revisa performance con react-best-practices (CRITICAL)
3. Fix issues encontrados
4. /subir
```

### Al Refactorizar
```
1. Identifica problema (muchos props, re-renders, etc)
2. Usa skill apropiada (composition-patterns, react-best-practices)
3. Aplica patrones sugeridos
4. Mide mejora
```

---

## 📊 Mantenimiento

### Actualizar Skills
```bash
npx skills update
```

### Ver Skills Instaladas
```bash
ls .agent/skills
```

### Agregar Nueva Skill
```bash
npx skills add [repo-url]
```

### Eliminar Skill
```bash
npx skills remove [skill-name]
```

---

## 🎉 ¿Listo?

Empieza con:
```
"Lee QUICKSTART.md y dame ejemplos para Flagship Agency"
```

O directamente:
```
"Revisa Quoter.tsx con react-best-practices"
```

---

**Instalado:** 2026-01-26  
**Proyecto:** Flagship Agency (Next.js 16 Multi-tenant)  
**Mantenido por:** Vercel Labs + Antigravity AI
