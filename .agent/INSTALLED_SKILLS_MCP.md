# 🎯 Skills y MCP Instalados - Flagship Agency

**Fecha de instalación:** 2026-01-26  
**Proyecto:** Flagship Agency (Next.js 16 Multi-tenant)

---

## ✅ Skills de Vercel Instaladas

### 1. **vercel-composition-patterns**
📍 **Ubicación:** `.agent/skills/vercel-composition-patterns/`

**Para qué sirve:**
- Patrones de composición de React que escalan
- Ayuda en refactoring de componentes con "boolean prop proliferation"
- Construcción de librerías de componentes flexibles
- Diseño de APIs reutilizables

**Cuándo se activa:**
- Compound components
- Render props
- Context providers
- Arquitectura de componentes

---

### 2. **vercel-react-best-practices**
📍 **Ubicación:** `.agent/skills/vercel-react-best-practices/`

**Para qué sirve:**
- Optimización de performance en React y Next.js (directamente de Vercel Engineering)
- Contiene **57 reglas** organizadas en **8 categorías prioritarias**

**Categorías de reglas:**

| Prioridad | Categoría | Impact | # Reglas |
|-----------|-----------|--------|----------|
| 1️⃣ | Eliminating Waterfalls | 🔴 CRITICAL | ~5 |
| 2️⃣ | Bundle Size Optimization | 🔴 CRITICAL | ~5 |
| 3️⃣ | Server-Side Performance | 🟠 HIGH | ~7 |
| 4️⃣ | Client-Side Data Fetching | 🟡 MEDIUM-HIGH | ~4 |
| 5️⃣ | Re-render Optimization | 🟡 MEDIUM | ~12 |
| 6️⃣ | Rendering Performance | 🟡 MEDIUM | ~9 |
| 7️⃣ | JavaScript Performance | 🟢 LOW-MEDIUM | ~12 |
| 8️⃣ | Advanced Patterns | 🟢 LOW | ~3 |

**Ejemplos de reglas clave:**
- ✅ `async-parallel` - Usar Promise.all() para operaciones independientes
- ✅ `bundle-barrel-imports` - Importar directamente, evitar barrel files
- ✅ `server-cache-react` - Usar React.cache() para deduplicación por request
- ✅ `rerender-memo` - Extraer trabajo costoso en componentes memoizados
- ✅ `rendering-content-visibility` - Usar content-visibility para listas largas

**Cuándo se activa:**
- Escribir componentes React o páginas Next.js
- Implementar data fetching (cliente o servidor)
- Revisar código para issues de performance
- Refactorizar código React/Next.js existente
- Optimizar bundle size o tiempos de carga

---

### 3. **vercel-react-native-skills**
📍 **Ubicación:** `.agent/skills/vercel-react-native-skills/`

**Para qué sirve:**
- Mejores prácticas de React Native y Expo
- Construcción de apps móviles performantes

**Cuándo se activa:**
- Componentes React Native
- Optimización de listas (FlatList, etc.)
- Implementación de animaciones
- Trabajo con módulos nativos
- Performance móvil
- APIs de plataforma nativa

---

### 4. **web-design-guidelines**
📍 **Ubicación:** `.agent/skills/web-design-guidelines/`

**Para qué sirve:**
- Revisar código UI para compliance con Web Interface Guidelines
- Auditoría de accesibilidad
- Revisión de UX
- Verificar mejores prácticas de diseño web

**Cuándo se activa:**
- "review my UI"
- "check accessibility"
- "audit design"
- "review UX"
- "check my site against best practices"

**Cómo funciona:**
1. Obtiene las últimas guidelines desde GitHub
2. Lee los archivos especificados
3. Verifica contra todas las reglas
4. Reporta hallazgos en formato `file:line`

**Fuente de guidelines:**
```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

---

## 🔧 Configuración del Proyecto

### Estructura de Skills
```
.agent/
├── skills/
│   ├── vercel-composition-patterns
│   ├── vercel-react-best-practices/
│   │   ├── SKILL.md (índice principal)
│   │   ├── AGENTS.md (guía completa compilada)
│   │   └── rules/
│   │       ├── async-parallel.md
│   │       ├── bundle-barrel-imports.md
│   │       ├── server-cache-react.md
│   │       └── ... (57 archivos de reglas)
│   ├── vercel-react-native-skills/
│   └── web-design-guidelines/
└── workflows/
    ├── analizar-prospecto.md
    ├── crear-demo.md
    ├── inicia-el-servidor-flagship.md
    ├── produccion.md
    └── subir.md
```

### Instalación Usada
- **Método:** Symlink (single source of truth, easy updates)
- **Scope:** Project (committed with project)
- **Agentes:** All agents (Antigravity, Gemini CLI)

---

## 🚀 Próximos Pasos Recomendados

### 1. Configurar MCP Servers (Opcional pero poderoso)

Para tu proyecto Next.js 16, podrías configurar:

#### **A. next-devtools-mcp** (para desarrollo)
```bash
npm install next-devtools-mcp
```

Crear `.mcp.json`:
```json
{
  "servers": {
    "next-devtools": {
      "command": "npx",
      "args": ["next-devtools-mcp"]
    }
  }
}
```

#### **B. Vercel MCP Server** (para deployment automation)
```bash
# Clonar servidor MCP de Vercel
git clone https://github.com/vercel/ai-sdk-mcp-server.git
cd ai-sdk-mcp-server
npm install

# Configurar .env
VERCEL_API_TOKEN=tu_token_aqui
```

Conectar en Claude/Cursor:
```bash
/connect mcp --url http://localhost:3399
```

#### **C. Database MCP Server** (para Turso/LibSQL)
Para conectar directamente con tu base de datos desde el asistente.

---

### 2. Usar las Skills en tu Proyecto

#### **Ejemplo 1: Optimizar Quoter.tsx**
```
"Revisa src/app/detailing/components/Quoter.tsx usando vercel-react-best-practices"
```

El asistente revisará:
- ✅ Eliminating waterfalls en fetching de datos
- ✅ Bundle size (componente pesado?)
- ✅ Re-renders innecesarios
- ✅ Optimizaciones de servidor

#### **Ejemplo 2: Review de UI**
```
"Revisa src/app/detailing/page.tsx con web-design-guidelines"
```

El asistente verificará:
- ✅ Accesibilidad (ARIA, semántica HTML)
- ✅ Responsive design
- ✅ Performance visual
- ✅ UX best practices

#### **Ejemplo 3: Refactorizar Componente**
```
"Refactoriza el componente ServiceCard usando vercel-composition-patterns"
```

El asistente aplicará:
- ✅ Compound components si hay muchos props booleanos
- ✅ Render props para flexibilidad
- ✅ Context cuando sea necesario

---

## 📚 Documentación y Referencias

### Skills de Vercel
- **Repositorio:** https://github.com/vercel-labs/agent-skills
- **Documentación:** Ver archivos `SKILL.md` en cada carpeta

### React Best Practices
- **Guía completa:** `.agent/skills/vercel-react-best-practices/AGENTS.md`
- **Reglas individuales:** `.agent/skills/vercel-react-best-practices/rules/*.md`

### Model Context Protocol
- **Spec oficial:** https://modelcontextprotocol.io
- **Anthropic MCP:** https://anthropic.com/mcp
- **Vercel MCP Docs:** https://vercel.com/docs/ai

---

## 💡 Comandos Útiles

### Agregar más skills
```bash
npx skills add [repo-url]
```

### Ver skills instaladas
```bash
ls .agent/skills
```

### Actualizar skills
```bash
npx skills update
```

### Eliminar una skill
```bash
npx skills remove [skill-name]
```

---

## 🎓 Mejores Prácticas para Usar las Skills

1. **Sé específico al solicitar revisiones:**
   ❌ "Revisa mi código"
   ✅ "Revisa src/components/ServiceCard.tsx usando vercel-react-best-practices enfocándote en bundle size y re-renders"

2. **Pide priorización:**
   ✅ "Revisa la app con react-best-practices y dame solo los issues CRITICAL y HIGH"

3. **Combina skills:**
   ✅ "Refactoriza usando composition-patterns y luego optimiza con react-best-practices"

4. **Usa en code reviews:**
   ✅ "Antes de /subir, revisa todos los archivos modificados con web-design-guidelines"

---

## 🔄 Integración con Workflows Existentes

Las skills se pueden integrar con tus workflows:

### `/subir` workflow mejorado
```markdown
1. Run linter
2. **Revisar UI con web-design-guidelines**
3. **Verificar performance con react-best-practices (solo CRITICAL)**
4. Commit changes
5. Push to GitHub
6. Deploy to Vercel
```

### `/crear-demo` workflow mejorado
```markdown
1. **Aplicar composition-patterns al diseño**
2. Generate demo components
3. **Optimizar con react-best-practices**
4. **Validar accesibilidad con web-design-guidelines**
5. Deploy preview
```

---

## 🎯 Métricas de Impacto Esperadas

Con estas skills implementadas correctamente, esperarías:

- 📉 **Bundle size:** -20-40% (barrel imports, dynamic imports)
- ⚡ **LCP (Largest Contentful Paint):** -30-50% (waterfalls, parallel fetching)
- 🔄 **Re-renders:** -60-80% (memo, derived state, transitions)
- ♿ **Accessibility score:** 95+ (web-design-guidelines)
- 🎨 **Code maintainability:** Mejor arquitectura de componentes

---

**¿Necesitas ayuda con alguna skill específica?** Simplemente pregunta:
- "Muéstrame ejemplos de async-parallel"
- "Explícame el patrón compound components"
- "Revisa mi código con [skill-name]"

---

**Instalado por:** Antigravity AI Assistant  
**Mantenimiento:** Las skills se actualizan automáticamente desde el repo de Vercel
