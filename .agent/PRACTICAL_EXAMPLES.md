# 🎨 Ejemplos Prácticos - Flagship Agency

Ejemplos específicos de cómo usar las skills instaladas en **tu proyecto**.

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── detailing/
│   │   ├── components/
│   │   │   ├── Quoter.tsx          ← Componente principal de cotización
│   │   │   ├── ServiceCard.tsx     ← Tarjetas de servicios
│   │   │   └── ...
│   │   └── page.tsx                ← Página principal detailing
│   ├── [tenant]/                   ← Multi-tenant routes
│   └── components/                 ← Componentes globales
└── ...
```

---

## 🎯 Casos de Uso Reales

### 1. Optimizar el Quoter (Componente Crítico)

**Problema:** El componente `Quoter.tsx` es complejo y maneja estado de cotización.

**Solución:**
```
Revisa src/app/detailing/components/Quoter.tsx con react-best-practices enfocándote en:
1. Bundle size (componente pesado?)
2. Re-renders cuando cambian servicios
3. Server-side data fetching si aplica
4. Client-side state management

Dame solo issues CRITICAL y HIGH
```

**Resultado esperado:**
- ✅ Identificar re-renders innecesarios al cambiar precios
- ✅ Optimizar imports (evitar barrel files)
- ✅ Sugerir memoización donde corresponda
- ✅ Mejorar performance de cálculos

---

### 2. Refactorizar ServiceCard

**Problema:** Muchas variantes de la tarjeta (selected, disabled, featured, etc.)

**Antes (probable):**
```tsx
<ServiceCard 
  isSelected={true}
  isDisabled={false}
  isFeatured={true}
  showPrice={true}
  showDescription={true}
  {...}
/>
```

**Comandos:**
```
Este componente ServiceCard tiene muchos props booleanos (isSelected, isDisabled, etc).
Aplica composition-patterns para crear una API más limpia y flexible.
```

**Después (esperado):**
```tsx
<ServiceCard>
  <ServiceCard.Badge>Featured</ServiceCard.Badge>
  <ServiceCard.Title>{title}</ServiceCard.Title>
  <ServiceCard.Description>{desc}</ServiceCard.Description>
  <ServiceCard.Price>{price}</ServiceCard.Price>
  <ServiceCard.Actions>
    <SelectButton />
  </ServiceCard.Actions>
</ServiceCard>
```

---

### 3. Auditar Accesibilidad del Sitio

**Comando completo:**
```
Haz una auditoría completa de accesibilidad usando web-design-guidelines en:
1. src/app/detailing/page.tsx
2. src/app/detailing/components/Quoter.tsx
3. src/app/[tenant]/page.tsx

Prioriza issues que afecten:
- Navegación con teclado
- Screen readers
- Contraste de colores
- ARIA labels
```

**Resultado esperado:**
- ✅ Verificar que todos los botones tengan labels
- ✅ Contraste adecuado en precios y CTAs
- ✅ Navegación por teclado funcional
- ✅ Focus states visibles

---

### 4. Optimizar Performance de Página Tenant

**Problema:** Las páginas tenant (`/victor`, `/purrpurr`) pueden tener waterfalls.

**Comando:**
```
Revisa src/app/[tenant]/page.tsx con react-best-practices enfocándote en:
- async-parallel: ¿Estamos haciendo fetches en serie que podrían ser paralelos?
- server-cache-react: ¿Usamos React.cache() para deduplicar requests?
- server-parallel-fetching: ¿Podemos restructurar para paralelizar?

Muéstrame ejemplos de cómo optimizar
```

**Optimización esperada:**
```tsx
// ❌ Antes (serial)
const tenant = await getTenant(slug)
const services = await getServices(tenant.id)
const projects = await getProjects(tenant.id)

// ✅ Después (paralelo)
const [tenant, servicesPromise, projectsPromise] = await Promise.all([
  getTenant(slug),
  getServices(slug),  // Cambiado para no depender de tenant.id
  getProjects(slug)
])
```

---

### 5. Optimizar Bundle Size

**Problema:** El bundle puede estar pesado por imports innecesarios.

**Comando:**
```
Analiza todos los archivos en src/app/detailing/ con react-best-practices 
enfocándote solo en:
- bundle-barrel-imports
- bundle-dynamic-imports
- bundle-defer-third-party

Identifica imports que deberían ser dinámicos
```

**Optimizaciones esperadas:**
```tsx
// ❌ Antes
import { Button, Card, Modal, Tooltip, ... } from '@/components/ui'
import * as Icons from 'lucide-react'

// ✅ Después
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
const Modal = dynamic(() => import('@/components/ui/modal'))
import { CheckIcon, XIcon } from 'lucide-react'  // solo los necesarios
```

---

### 6. Review Pre-Production

**Antes de ejecutar `/subir`:**

```
Haz un review completo pre-producción:

1. Ejecuta web-design-guidelines en archivos modificados
   - Verifica accesibilidad
   - Revisa UX
   - Checa responsive design

2. Ejecuta react-best-practices (CRITICAL only) en archivos modificados
   - Bundle size
   - Waterfalls
   - Performance crítica

3. Dame un checklist de issues encontrados priorizados por impacto
```

---

### 7. Optimizar Formulario de Cotización

**Problema:** Re-renders al cambiar cada servicio.

**Comando:**
```
El formulario de cotización en Quoter.tsx se re-renderiza mucho.
Aplica react-best-practices enfocándote en:
- rerender-defer-reads
- rerender-memo
- rerender-derived-state
- rerender-functional-setstate

Muéstrame cómo optimizar con ejemplos específicos del código
```

**Optimizaciones esperadas:**
```tsx
// ❌ Antes
const [services, setServices] = useState([])
const total = services.reduce((sum, s) => sum + s.price, 0)
const hasServices = services.length > 0

// ✅ Después
const [services, setServices] = useState([])
const total = useMemo(() => 
  services.reduce((sum, s) => sum + s.price, 0), 
  [services]
)
const hasServices = services.length > 0  // simple, no memo needed

// Memoizar componentes costosos
const ServiceList = memo(({ services }) => {
  // render services
})
```

---

### 8. Implementar Loading States

**Comando:**
```
Queremos mejorar loading states en la app.
Revisa con react-best-practices enfocándote en:
- rendering-usetransition-loading
- async-suspense-boundaries

Muéstrame cómo implementar loading states modernos con Suspense y useTransition
```

---

### 9. Optimizar Imágenes de Proyectos

**Si tienes galería de proyectos:**

**Comando:**
```
Revisa la galería de proyectos con react-best-practices enfocándote en:
- rendering-content-visibility para listas largas
- bundle-preload para pre-cargar imágenes on hover
- async-parallel para cargar metadatos

Optimiza para performance en móviles
```

---

### 10. Auditar Componentes Globales

**Comando:**
```
Revisa todos los componentes en src/app/components/ con:
1. composition-patterns para arquitectura
2. react-best-practices para performance
3. web-design-guidelines para accesibilidad

Identifica componentes que necesitan refactoring urgente
```

---

## 🔄 Integración con Workflows

### Workflow `/subir` mejorado

**Actual:**
```bash
git add .
git commit
git push
vercel deploy
```

**Mejorado:**
```bash
# 1. Pre-commit checks
"Revisa archivos modificados con web-design-guidelines y react-best-practices (CRITICAL only)"

# 2. Si pasa, proceder
git add .
git commit -m "..."
git push
vercel deploy
```

### Workflow `/crear-demo` mejorado

**Antes de crear demo:**
```
Antes de crear la demo:
1. Aplica composition-patterns al diseño de componentes
2. Optimiza con react-best-practices (bundle y rendering)
3. Valida accesibilidad con web-design-guidelines
```

---

## 📊 Métricas a Medir (Antes/Después)

Después de aplicar optimizaciones, compara:

### Bundle Size
```bash
# Ver tamaño actual
npm run build

# Buscar en output:
# Route (app)          Size     First Load JS
```

### Performance Lighthouse
```bash
# Antes y después de optimizaciones
# Métricas clave:
- LCP (Largest Contentful Paint)
- FCP (First Contentful Paint)
- TTI (Time to Interactive)
- TBT (Total Blocking Time)
```

### Accessibility Score
```bash
# Usar web-design-guidelines
# Objetivo: 95+ en Lighthouse Accessibility
```

---

## 💡 Tips Específicos para tu Proyecto

### Multi-tenant Routes
```
Al crear componentes multi-tenant, asegúrate de:
1. Usar server-cache-react para datos del tenant
2. Evitar waterfalls en fetching inicial
3. Bundle splitting por tenant si es necesario
```

### Cotizador
```
El Quoter es crítico, debe:
1. Minimizar re-renders (usar memo estratégicamente)
2. Lazy load componentes pesados (PDF export, etc)
3. Optimizar cálculos con useMemo
```

### Imágenes de Servicios
```
Para imágenes en ServiceCard:
1. Usar Next.js Image component
2. Implementar lazy loading
3. Preload on hover para mejor UX
```

---

## 🎯 Plan de Optimización Sugerido

### Semana 1 (CRITICAL)
- [ ] Optimizar Quoter.tsx (bundle + re-renders)
- [ ] Fix waterfalls en páginas tenant
- [ ] Auditar accesibilidad básica

### Semana 2 (HIGH)
- [ ] Refactorizar ServiceCard con composition patterns
- [ ] Implementar server caching
- [ ] Optimizar bundle size global

### Semana 3 (MEDIUM)
- [ ] Mejorar loading states con Suspense
- [ ] Optimizar rendering de listas
- [ ] Polish UX con web-design-guidelines

### Continuo (ONGOING)
- [ ] Review cada PR con react-best-practices
- [ ] Mantener accessibility score 95+
- [ ] Monitorear bundle size en cada deploy

---

**¿Listo para empezar?** Elige un caso de uso y pídeme ejecutarlo. Por ejemplo:

```
"Empecemos con el caso #1, revisa el Quoter.tsx"
```

O crea tu propio comando personalizado combinando las skills! 🚀
