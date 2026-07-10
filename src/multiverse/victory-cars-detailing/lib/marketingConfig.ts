// Configuración predefinida para las categorías de pauta y publicaciones
export type ProductCategory = 'detailing' | 'ppf' | 'pintura' | 'promociones' | 'wrap' | 'polarizado';

export interface CategoryConfig {
  id: ProductCategory;
  label: string;
  color: string;
  defaultCopy: string;
  defaultAdSetName: string; // If we were splitting by adsets
}

export const MARKETING_CATEGORIES: Record<ProductCategory, CategoryConfig> = {
  detailing: {
    id: 'detailing',
    label: 'Detailing',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
    defaultCopy: 'Rejuvenece y protege el interior y exterior de tu vehículo con nuestro servicio premium de Detailing. Usamos productos de la más alta calidad para lograr un brillo profundo y protección duradera. ¡Agenda tu cita en Victory Cars Detailing!',
    defaultAdSetName: 'Core_Servicios',
  },
  ppf: {
    id: 'ppf',
    label: 'PPF',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    defaultCopy: 'Protección invisible y máxima durabilidad. Nuestro Paint Protection Film (PPF) protege la pintura original de tu auto contra rayones, piedras y desgaste. Evita repintar tu carro a futuro. ¡Cotiza tu PPF hoy mismo!',
    defaultAdSetName: 'Core_Servicios',
  },
  pintura: {
    id: 'pintura',
    label: 'Pintura',
    color: 'bg-rose-500/20 text-rose-400 border-rose-500/50',
    defaultCopy: 'Restauración y pintura profesional de alta gama. Devolvemos el color, brillo y textura original de fábrica a tu vehículo usando cabinas de pintura de última tecnología. Confía tu auto a los expertos de Victory Cars.',
    defaultAdSetName: 'Core_Servicios',
  },
  wrap: {
    id: 'wrap',
    label: 'Wrap',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    defaultCopy: 'Cambia el look completo de tu carro sin dañar la pintura original. Contamos con una amplia variedad de colores y acabados en vinilo automotriz (Wrap). ¡Dale un estilo único y deportivo a tu vehículo!',
    defaultAdSetName: 'Core_Servicios',
  },
  polarizado: {
    id: 'polarizado',
    label: 'Polarizado',
    color: 'bg-slate-500/20 text-slate-300 border-slate-500/50',
    defaultCopy: 'Protege el interior de tu auto de los rayos UV y reduce el calor con nuestros polarizados nanocerámicos de alta tecnología. Conduce cómodo y con privacidad garantizada.',
    defaultAdSetName: 'Core_Servicios',
  },
  promociones: {
    id: 'promociones',
    label: 'Promociones',
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    defaultCopy: '¡Aprovecha nuestras promociones especiales por tiempo limitado en Victory Cars! Envíanos un mensaje ahora mismo para conocer los descuentos vigentes en nuestros servicios de protección y estética automotriz.',
    defaultAdSetName: 'Promociones_Mes',
  },
};

// Configuración global del presupuesto
export const BUDGET_CONFIG = {
  monthlyTotalCOP: 650000,
};

// --- CLASIFICACIÓN DE CONTENIDO ---
export const classifyContent = (caption: string): ProductCategory => {
  if (!caption) return 'detailing'; // Default
  const lowerCaption = caption.toLowerCase();
  
  // Categoría explícita por Hashtag (Generado por IA)
  if (lowerCaption.includes('#categoriappf')) return 'ppf';
  if (lowerCaption.includes('#categoriapromociones')) return 'promociones';
  if (lowerCaption.includes('#categoriapintura')) return 'pintura';
  if (lowerCaption.includes('#categoriawrap')) return 'wrap';
  if (lowerCaption.includes('#categoriapolarizado')) return 'polarizado';
  if (lowerCaption.includes('#categoriadetailing')) return 'detailing';

  // Búsqueda por palabras clave enriquecidas
  if (lowerCaption.includes('ppf') || lowerCaption.includes('paint protection') || lowerCaption.includes('película transparente') || lowerCaption.includes('anti-rayones') || lowerCaption.includes('xpel')) {
    return 'ppf';
  }
  if (lowerCaption.includes('promoción') || lowerCaption.includes('promo') || lowerCaption.includes('descuento') || lowerCaption.includes('oferta') || lowerCaption.includes('bono') || lowerCaption.includes('2x1')) {
    return 'promociones';
  }
  
  // Revisar Detailing explícito ANTES de pintura para evitar colisiones con "corrección de pintura"
  if (lowerCaption.includes('corrección de pintura') || lowerCaption.includes('restauración de pintura') || lowerCaption.includes('tratamiento cerámico') || lowerCaption.includes('ceramic coating') || lowerCaption.includes('detailing') || lowerCaption.includes('brillo extremo') || lowerCaption.includes('lavado premium')) {
    return 'detailing';
  }

  if (lowerCaption.includes('pintura') || lowerCaption.includes('pintado') || lowerCaption.includes('latonería') || lowerCaption.includes('repintado') || lowerCaption.includes('cabina') || lowerCaption.includes('color original')) {
    return 'pintura';
  }
  if (lowerCaption.includes('wrap') || lowerCaption.includes('vinilo') || lowerCaption.includes('cambio de color') || lowerCaption.includes('ploteo') || lowerCaption.includes('wrapping')) {
    return 'wrap';
  }
  if (lowerCaption.includes('polarizado') || lowerCaption.includes('nanocerámico') || lowerCaption.includes('película de seguridad') || lowerCaption.includes('control solar') || lowerCaption.includes('película térmica')) {
    return 'polarizado';
  }
  
  return 'detailing'; // Fallback
};

// --- STANDARD NAMING CONVENTIONS ---

// Formato Campaña: [VC] [Año-Mes] [Servicio] [Objetivo]
export const generateCampaignName = (category: ProductCategory, objective: string = 'Conversiones'): string => {
  const date = new Date();
  const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const categoryLabel = MARKETING_CATEGORIES[category].label;
  return `[VC] ${yearMonth} ${categoryLabel} ${objective}`;
};

// Formato Conjunto de Anuncios: [Fase] [Audiencia]
export const generateAdSetName = (phase: 'ABO Testeo' | 'CBO Escalamiento', audience: string = 'Público Amplio Bucaramanga'): string => {
  return `[${phase}] ${audience}`;
};

// Formato Anuncio: [Categoría] [Formato] [Identificador]
export const generateAdName = (category: ProductCategory, format: 'Reel' | 'Carrusel' | 'Imagen', identifier: string): string => {
  const categoryLabel = MARKETING_CATEGORIES[category].label;
  return `[${categoryLabel}] ${format} - ${identifier}`;
};

// --- FASES DEL PLAN DE MARKETING (PIPELINE) ---
export type PhaseId = 'repositorio' | 'testeo' | 'aprendizaje' | 'analisis' | 'escalamiento' | 'retargeting' | 'apagados';

export interface MarketingPhase {
  id: PhaseId;
  label: string;
  description: string;
  icon: string; // We'll map string to Lucide icon in the component
  colorTheme: string;
}

export const MARKETING_PHASES: MarketingPhase[] = [
  {
    id: 'repositorio',
    label: 'Repositorio',
    description: 'Creativos y contenidos listos para pautar.',
    icon: 'instagram',
    colorTheme: 'slate',
  },
  {
    id: 'testeo',
    label: 'Sandbox / Testeo',
    description: 'Anuncios nuevos (ABO) buscando tracción inicial.',
    icon: 'flask',
    colorTheme: 'blue',
  },
  {
    id: 'aprendizaje',
    label: 'Fase de Aprendizaje',
    description: 'Anuncios activos recopilando data del algoritmo.',
    icon: 'activity',
    colorTheme: 'amber',
  },
  {
    id: 'analisis',
    label: 'Análisis y Decisión',
    description: 'Superaron el budget de prueba. Requieren decisión: escalar o apagar.',
    icon: 'bar-chart',
    colorTheme: 'purple',
  },
  {
    id: 'escalamiento',
    label: 'Escalamiento (CBO)',
    description: 'Anuncios ganadores con inyección de capital.',
    icon: 'zap',
    colorTheme: 'emerald',
  },
  {
    id: 'retargeting',
    label: 'Retargeting (BOFU)',
    description: 'Anuncios persiguiendo a usuarios que interactuaron.',
    icon: 'target',
    colorTheme: 'rose',
  },
  {
    id: 'apagados',
    label: 'Descartados / Apagados',
    description: 'Anuncios que no pasaron el test o perdieron rendimiento. No retestear.',
    icon: 'power-off',
    colorTheme: 'gray',
  }
];
