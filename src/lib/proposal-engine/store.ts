import { calculateCommercialData } from './commercial';
import { createVisualConfiguration, INSTITUTIONAL_IDENTITY } from './identity';
import { planProposalPages } from './planner';
import type { ProjectSector, Proposal, ProposalVersion } from './types';

// =============================================================================
// 07 · EXPORT & VERSIONING + CANONICAL SEED PROPOSALS
// Demuestra una misma identidad institucional adaptándose a dos sectores:
// 1. Software (#PROP-JL-2026-094 · Julián Lotero · Bogotá Detail Center)
// 2. Automotriz (#SLW-TMYG-2026-116 · Tesla Model Y Juniper PPF · 3 Bloques)
// =============================================================================

function createSeedVersions(
    code: string,
    grandTotal: number,
    pageCount: number,
    sector: ProjectSector,
): ProposalVersion[] {
    return [
        {
            versionNumber: 1,
            code: `${code}-V01`,
            label: 'Version 01 — Borrador inicial',
            summary: 'Ingesta de requerimientos, estructuración inicial de módulos y cálculo base determinístico.',
            createdAt: '2026-10-28T10:15:00-05:00',
            author: 'Camilo Andrés Toloza Petter',
            status: 'draft',
            snapshotHash: 'sha256:v01-init-8f3c',
            grandTotal,
            pageCount,
            sector,
        },
        {
            versionNumber: 2,
            code: `${code}-V02`,
            label: 'Version 02 — Corrección comercial',
            summary: 'Ajuste de tarifa lista vs beneficio alianza, verificación 50/50 y exclusión IVA bajo régimen vigente.',
            createdAt: '2026-10-29T09:40:00-05:00',
            author: 'Camilo Andrés Toloza Petter',
            status: 'review',
            snapshotHash: 'sha256:v02-comm-4d1a',
            grandTotal,
            pageCount,
            sector,
        },
        {
            versionNumber: 3,
            code: `${code}-V03`,
            label: 'Version 03 — Ajustes visuales',
            summary: 'Asignación de fotografía curada por Asset Engine, mockup UI vectorial y validación anti-desbordamiento.',
            createdAt: '2026-10-29T14:20:00-05:00',
            author: 'Proposal Engine · Asset & Design Engine',
            status: 'review',
            snapshotHash: 'sha256:v03-vis-9e72',
            grandTotal,
            pageCount,
            sector,
        },
        {
            versionNumber: 4,
            code: `${code}-V04`,
            label: 'Version 04 — Aprobada y exportada',
            summary: 'Auditoría 4 niveles 100% superada y compilación PDF A4 vectorial multipágina vía Chromium + Playwright.',
            createdAt: '2026-11-17T18:30:00-05:00',
            author: 'Purrpurr.dev × Speedlight Quality Gate',
            status: 'exported',
            snapshotHash: 'sha256:v04-prod-c501',
            grandTotal,
            pageCount,
            sector,
        },
    ];
}

function buildJulianLoteroProposal(): Proposal {
    const commercial = calculateCommercialData({
        issueDate: '2026-10-29',
        validDays: 15,
        discountLabel: 'Beneficio Alianza purrpurr.dev × Speedlight (-28% OFF)',
        items: [
            {
                id: 'item-jl-motor-cotizaciones',
                title: '1. Motor Web de Cotizaciones Ejecutivas & Generador PDF A4',
                description:
                    'Interfaz privada para armar cotizaciones formales con identidad propia, cálculo automático de costos de taller (mano de obra + insumos + márgenes), enlaces directos por WhatsApp, visor PDF de alta resolución y botón Wompi.',
                phaseLabel: 'Etapa 1 · Semana 1',
                quantity: 1,
                unitLabel: 'Módulo',
                listUnitPrice: 1000000,
                unitPrice: 800000,
                providerTag: 'PURRPURR.DEV × SPEEDLIGHT',
            },
            {
                id: 'item-jl-dispersion-wompi',
                title: '2. Integración Pasarela Wompi & Dispersión Automatizada a Operarios',
                description:
                    'Configuración de pasarela de recaudo en línea (PSE, tarjetas, Nequi, Bancolombia) + módulo de dispersión que liquida al día siguiente a trabajadores e insumos por servicio terminado sin conciliación manual.',
                phaseLabel: 'Etapa 2 · Semana 2',
                quantity: 1,
                unitLabel: 'Módulo',
                listUnitPrice: 800000,
                unitPrice: 600000,
                providerTag: 'PURRPURR.DEV × WOMPI B2B',
            },
            {
                id: 'item-jl-panel-crm',
                title: '3. Panel Administrativo Privado (CRM de Citas, Vehículos & Evidencias)',
                description:
                    'Panel de control seguro para agenda de turnos en bahía, historial de vehículos, registro fotográfico de entrega por parte de operarios y trazabilidad total de ingresos y comisiones liquidadas.',
                phaseLabel: 'Etapa 3 · Semana 3',
                quantity: 1,
                unitLabel: 'Módulo',
                listUnitPrice: 700000,
                unitPrice: 400000,
                providerTag: 'PURRPURR.DEV × SPEEDLIGHT',
            },
        ],
        paymentMethods: [
            {
                id: 'pm-wompi-jl',
                method: 'Pasarela Oficial Wompi (PSE, Tarjetas, Nequi, Bancolombia)',
                details: 'Activación automática sin recargos adicionales de pasarela para el cliente.',
                checkoutUrl: 'https://speedlightculture.com/checkout?doc=prop-julian-lotero-software-001',
                qrSrc: '/brand/car-coding-payment-qr.svg',
                highlight: true,
            },
            {
                id: 'pm-bank-jl',
                method: 'Transferencia Bancolombia Directa',
                details: 'Cuenta de Ahorros Bancolombia # 204 795227 91 · Titular: Camilo Andrés Toloza Petter (C.C. 1.019.089.803).',
            },
        ],
        alternativePackages: [
            {
                id: 'pkg-jl-opt-1',
                groupTitle: 'MODALIDAD MODULAR · INICIO RÁPIDO',
                name: 'Opción 1 · Módulo 1: Motor de Cotizaciones & PDF A4',
                description:
                    'Solo Etapa 1 (Semana 1): Motor privado para emitir cotizaciones A4 con cálculo de costos de taller, enlace WhatsApp y cobro Wompi. Tarifa Lista $ 1.000.000 → $ 800.000 COP.',
                listPrice: 1000000,
                total: 800000,
                materialOrTechLabel: 'Etapa 1 · Next.js + PDF A4',
                timeframeLabel: '5 días hábiles',
            },
            {
                id: 'pkg-jl-opt-2',
                groupTitle: 'MODALIDAD RECOMENDADA · LLAVE EN MANO',
                name: 'Opción 2 · Sistema Integral (Módulos 1 + 2 + 3)',
                description:
                    'Ecosistema completo llave en mano: Motor de Cotizaciones ($ 800k) + Pasarela & Dispersión Wompi ($ 600k) + Panel CRM de Citas ($ 400k). Tarifa Lista $ 2.500.000 → $ 1.800.000 COP (-28% OFF).',
                listPrice: 2500000,
                total: 1800000,
                materialOrTechLabel: 'Etapas 1 + 2 + 3 · Full Stack',
                timeframeLabel: '15–20 días hábiles',
                recommended: true,
            },
        ],
        legalConditions: [
            {
                title: 'Esquema de Pago 50/50',
                body: '50% de anticipo ($ 400.000 en Opción 1 o $ 900.000 en Opción 2) al aprobar la propuesta; 50% saldo contra entrega verificada en producción. Valores netos cerrados (Régimen No Responsable de IVA).',
            },
            {
                title: 'Propiedad 100% del Cliente & Despliegue Propio',
                body: 'El código operativo desplegado, base de datos, catálogo de servicios, operarios y CRM pertenecen 100% a Bogotá Detail Center bajo su propio dominio.',
            },
            {
                title: 'Garantía Conjunta purrpurr.dev × Speedlight (60 Días)',
                body: 'Soporte técnico directo por 60 días calendario posteriores al lanzamiento para ajustes operativos, capacitación al equipo y calibración de liquidaciones.',
            },
        ],
        warrantySummary:
            'Propuesta emitida en alianza oficial por purrpurr.dev (Ingeniería de Software) y Speedlight Culture (Ecosistema Automotriz), garantizando propiedad 100% de los datos para Bogotá Detail Center y 60 días de soporte técnico post-despliegue.',
    });

    const baseProposal: Proposal = {
        id: 'prop-julian-lotero-software-001',
        code: 'PROP-JL-2026-094',
        status: 'exported',
        version: 4,
        createdAt: '2026-10-29T09:00:00-05:00',
        updatedAt: '2026-11-17T18:30:00-05:00',
        adaptiveMode: 'compact-5',
        brandIdentity: INSTITUTIONAL_IDENTITY,
        client: {
            name: 'Julián Lotero',
            roleOrArea: 'Dirección de Operaciones & Taller',
            company: 'Bogotá Detail Center / Marca Independiente',
            phone: '+57 313 883 0156',
            city: 'Bogotá D.C., Colombia',
            projectReference: 'Plataforma Propia de Cotizaciones, Agenda & Dispersión Wompi',
        },
        project: {
            title: 'Sistema de Cotizaciones A4, Agenda & Dispersión Wompi',
            subtitle:
                'Infraestructura digital a medida para talleres de detailing y personalización automotriz de alto estándar, presentada en alianza por purrpurr.dev × Speedlight Culture.',
            categoryLabel: 'Ingeniería de Software B2B · Ecosistema Automotriz',
            sector: 'software',
            complexity: 'standard',
            executiveSummary:
                'Bogotá Detail Center requiere profesionalizar el ciclo comercial y financiero de taller eliminando cotizaciones manuales en chats dispersos, evitando errores en márgenes y automatizando la liquidación de operarios. A través de la alianza purrpurr.dev × Speedlight Culture, implementamos un sistema propio de 3 etapas acumulativas con retorno inmediato desde la Semana 1.',
            problemContext:
                'Las cotizaciones enviadas sin estandarización visual reducen el ticket promedio y retrasan la aprobación de servicios complejos (PPF, detailing cerámico y pintura). Sumado a esto, la conciliación manual de pagos y porcentajes de operarios consume horas directivas clave cada semana.',
            solutionConcept:
                'Motor web privado en Next.js con generación nativa de pliegos ejecutivos A4, matriz financiera determinística (Mano de Obra + Insumos + Arriendo/Márgenes), integración Wompi con dispersión automatizada al día siguiente y CRM privado de bahías con evidencias fotográficas.',
            deliveryTimeframe: '3 Etapas semanales (15 a 20 días hábiles)',
            objectives: [
                {
                    id: 'obj-1',
                    metricValue: '-28%',
                    metricLabel: 'Beneficio Alianza',
                    title: 'Ahorro en Desarrollo Llave en Mano',
                    description: 'Tarifa consolidada de $ 2.500.000 a $ 1.800.000 COP netos gracias a arquitectura reutilizable probada en Speedlight Works.',
                },
                {
                    id: 'obj-2',
                    metricValue: '30 seg',
                    metricLabel: 'Emisión A4',
                    title: 'Cotizaciones Formales Instantáneas',
                    description: 'Armado guiado con cálculo automático de rentabilidad y enlace directo para aprobación por WhatsApp.',
                },
                {
                    id: 'obj-3',
                    metricValue: 'D+1',
                    metricLabel: 'Dispersión Wompi',
                    title: 'Liquidación Automatizada a Operarios',
                    description: 'División transparente de mano de obra, insumos y utilidad neta sin fricción administrativa.',
                },
                {
                    id: 'obj-4',
                    metricValue: '100%',
                    metricLabel: 'Propiedad Total',
                    title: 'Control de Base de Datos & CRM',
                    description: 'Activos digitales, historiales vehiculares y reportes fotográficos alojados bajo dominio propio.',
                },
            ],
            scope: [
                {
                    id: 'sc-1',
                    code: 'MOD-01',
                    title: 'Motor Web de Cotizaciones Ejecutivas & PDF A4',
                    summary:
                        'Interfaz privada de escritorio y móvil para configurar vehículos, ítems técnicos, márgenes de taller y generar PDF multipágina A4 con QR Wompi integrado.',
                    deliverables: ['Calculador de costos e insumos', 'Exportador PDF A4 vectorial', 'Enlace de cierre WhatsApp'],
                    phaseTag: 'Etapa 1 · Semana 1',
                    category: 'Core Comercial',
                    ownerTag: 'purrpurr.dev',
                },
                {
                    id: 'sc-2',
                    code: 'MOD-02',
                    title: 'Pasarela Wompi & Dispersión Automatizada',
                    summary:
                        'Recaudo en línea (PSE, Nequi, Tarjetas, Bancolombia) conectado a reglas de dispersión para liquidar automáticamente a operarios al día siguiente.',
                    deliverables: ['Checkout Wompi verificado', 'Webhooks de confirmación', 'Reglas de dispersión B2B'],
                    phaseTag: 'Etapa 2 · Semana 2',
                    category: 'Fintech Taller',
                    ownerTag: 'purrpurr.dev × Wompi',
                },
                {
                    id: 'sc-3',
                    code: 'MOD-03',
                    title: 'Panel Administrativo CRM de Citas & Evidencias',
                    summary:
                        'Control diario de bahías, agendamiento por vehículo/placa, actas fotográficas de ingreso/entrega por operario y reporte financiero consolidado.',
                    deliverables: ['Calendario de bahías', 'Acta fotográfica de entrega', 'Dashboard de liquidación'],
                    phaseTag: 'Etapa 3 · Semana 3',
                    category: 'Operación CRM',
                    ownerTag: 'Speedlight Engineering',
                },
            ],
            deliverables: [
                { id: 'del-1', title: 'Aplicación Web Next.js en Producción', format: 'Web App + SSL', phaseId: 'ms-1', acceptanceCriteria: 'Emisión completa de cotización A4 con enlace Wompi.' },
                { id: 'del-2', title: 'Motor de Dispersión & Webhooks Wompi', format: 'API + Webhook', phaseId: 'ms-2', acceptanceCriteria: 'Transacción de prueba verificada y dispersión calculada.' },
                { id: 'del-3', title: 'Panel CRM de Citas & Evidencias', format: 'Admin Dashboard', phaseId: 'ms-3', acceptanceCriteria: 'Registro de vehículo, turno y actas fotográficas operativas.' },
            ],
            milestones: [
                {
                    id: 'ms-1',
                    phaseNumber: 'FASE 01',
                    title: 'Semana 1 · Motor Cotizador & PDF A4',
                    timeframe: 'Días 1–5 hábiles',
                    durationDays: 5,
                    deliverables: ['Identidad institucional cargada', 'Calculadora determinística de taller', 'Generación de pliego A4 y link WhatsApp'],
                    paymentTrigger: 'Cubierta por Anticipo 50%',
                    statusLabel: 'Entrega Operativa Inmediata',
                },
                {
                    id: 'ms-2',
                    phaseNumber: 'FASE 02',
                    title: 'Semana 2 · Pasarela Wompi & Dispersión',
                    timeframe: 'Días 6–12 hábiles',
                    durationDays: 7,
                    deliverables: ['Integración llaves Wompi', 'QR dinámico de cobro', 'Liquidación automática por operario e insumo'],
                    paymentTrigger: 'Validación Staging',
                    statusLabel: 'Integración Bancaria & Recaudo',
                },
                {
                    id: 'ms-3',
                    phaseNumber: 'FASE 03',
                    title: 'Semana 3 · Panel CRM & Lanzamiento',
                    timeframe: 'Días 13–20 hábiles',
                    durationDays: 8,
                    deliverables: ['Módulo de citas y turnos de taller', 'Subida de evidencias fotográficas', 'Capacitación + 60 días de soporte'],
                    paymentTrigger: 'Contra Entrega · Saldo 50%',
                    statusLabel: 'Paso Final a Producción',
                },
            ],
            technicalArchitectureNodes: [
                { id: 'node-1', layer: 'CAPA 01 · FRONTEND A4', title: 'Next.js 16 + Design System Editorial', spec: 'Tipografía Space Grotesk/Inter, escala A4 210×297mm y vista móvil sin scroll horizontal.' },
                { id: 'node-2', layer: 'CAPA 02 · MOTOR FINANCIERO', title: 'Calculadora Determinística B2B', spec: 'Aritmética entera exacta en COP: Mano de Obra + Insumos + Arriendo + Utilidad Neta.' },
                { id: 'node-3', layer: 'CAPA 03 · RECAUDO & CRM', title: 'Wompi API + PostgreSQL RLS', spec: 'Webhooks firmados HMAC, dispersión programada D+1 y actas con fotos en almacenamiento CDN.' },
            ],
        },
        commercialData: commercial,
        visualConfig: createVisualConfiguration('software', 'mixed-split'),
        pages: [],
        assets: [],
        versions: createSeedVersions('PROP-JL-2026-094', commercial.grandTotal, 5, 'software'),
        jobs: [
            {
                id: 'job-init-jl',
                proposalId: 'prop-julian-lotero-software-001',
                stage: 'export',
                status: 'completed',
                message: 'Propuesta multipágina inicializada en Proposal Studio con 5 páginas adaptativas y PDF Playwright.',
                timestamp: '2026-11-17T18:30:00-05:00',
                durationMs: 640,
            },
        ],
        pdfUrl: '/cotizaciones/PROPUESTA_JULIAN_LOTERO_PROP-JL-2026-094_2026-10-29.pdf',
    };

    return planProposalPages(baseProposal, 'compact-5');
}

function buildTeslaAutomotiveProposal(): Proposal {
    const commercial = calculateCommercialData({
        issueDate: '2026-11-12',
        validDays: 15,
        discountLabel: 'Descuento Comercial Especial Speedlight Works (-13.3% OFF)',
        overrideGrandTotal: 5400000,
        overrideDiscountAmount: 830000,
        overrideDiscountPercentage: 13.32,
        items: [
            {
                id: 'tmyg-bloq-1',
                title: 'Bloque 1 · Lo Más Delicado (Avery Dennison TPU 203µm · 10 Años)',
                description:
                    'Protección puntual de alto riesgo sin espejos: barra LED delantera lado a lado, barra LED trasera continua, pantallas interiores 15.4" + 8.0" y parales Piano Black laterales.',
                phaseLabel: 'Opción 01 · 1 Día Hábil',
                quantity: 1,
                unitLabel: 'Paquete',
                listUnitPrice: 1385000,
                unitPrice: 1200000,
                providerTag: 'SPEEDLIGHT WORKS · WRAP LAB',
            },
            {
                id: 'tmyg-bloq-2',
                title: 'Bloque 2 · Solo el Frente & Zonas Delicadas (Avery 203µm)',
                description:
                    'Cobertura frontal de impacto en carretera: bumper delantero, capó completo, 2 guardabarros delanteros y espejos retrovisores + paquete Lo Más Delicado.',
                phaseLabel: 'Opción 02A · 3 Días Hábiles',
                quantity: 1,
                unitLabel: 'Vehículo',
                listUnitPrice: 4845000,
                unitPrice: 4200000,
                providerTag: 'SPEEDLIGHT WORKS · AVERY TPU',
            },
        ],
        paymentMethods: [
            {
                id: 'pm-wompi-tmyg',
                method: 'Pasarela Oficial Wompi (PSE, Tarjetas, Nequi, Bancolombia)',
                details: 'Reserva inmediata de bahía limpia y rollo PPF certificado sin recargos adicionales.',
                checkoutUrl: 'https://speedlightculture.com/checkout?doc=slw-tesla-model-y-gris-ppf-client-001',
                qrSrc: '/brand/car-coding-payment-qr.svg',
                highlight: true,
            },
            {
                id: 'pm-bank-tmyg',
                method: 'Bancolombia Ahorros # 204 795227 91',
                details: 'Titular: Camilo Andrés Toloza Petter (C.C. 1.019.089.803) · Escrow Speedlight Works.',
            },
        ],
        alternativePackages: [
            {
                id: 'tmyg-opt-01',
                groupTitle: 'BLOQUE 1 · LO MÁS DELICADO',
                name: 'Opción 01 · Lo Más Delicado · Avery Dennison TPU (10 Años)',
                description: 'Ópticas LED delanteras/traseras, pantallas 15.4"+8.0" y parales Piano Black en Avery 203µm.',
                listPrice: 1385000,
                total: 1200000,
                materialOrTechLabel: 'Avery Supreme 203µm',
                timeframeLabel: '1 día hábil',
            },
            {
                id: 'tmyg-opt-02a',
                groupTitle: 'BLOQUE 2 · SOLO EL FRENTE',
                name: 'Opción 02A · Solo el Frente · 100% Avery Dennison TPU (10 Años)',
                description: 'Bumper delantero, capó completo, 2 guardabarros, espejos + zonas delicadas en Avery 203µm.',
                listPrice: 6230000,
                total: 5400000,
                materialOrTechLabel: 'Avery Supreme 203µm',
                timeframeLabel: '3 días hábiles',
                recommended: true,
            },
            {
                id: 'tmyg-opt-02b',
                groupTitle: 'BLOQUE 2 · HÍBRIDO',
                name: 'Opción 02B · Paquete Híbrido: Frente SunTek Reaction 215µm + Delicado Avery',
                description: 'Zona de impacto frontal en SunTek Reaction 215µm + zonas delicadas en Avery Dennison 203µm.',
                listPrice: 9800000,
                total: 8500000,
                materialOrTechLabel: 'Híbrido SunTek 215µm + Avery',
                timeframeLabel: '3 días hábiles',
            },
            {
                id: 'tmyg-opt-03b',
                groupTitle: 'BLOQUE 3 · FULL BODY 360°',
                name: 'Opción 03B · Todo el Carro Full Body 360° · Avery Dennison (Rollo Sellado)',
                description: 'Carrocería exterior 100% + ópticas + espejos + parales + pantallas interiores en rollo sellado 15m.',
                listPrice: 12700000,
                total: 11000000,
                materialOrTechLabel: 'Avery Roll 15m · 10 Años',
                timeframeLabel: '7–8 días hábiles',
            },
        ],
        legalConditions: [
            {
                title: 'Esquema de Pago 50/50 & Custodia Escrow',
                body: '50% de anticipo al confirmar la modalidad para reservar bahía limpia y rollo PPF certificado; 50% saldo al entregar el vehículo verificado pieza por pieza.',
            },
            {
                title: 'Garantía Oficial 1 Año Instalación + 10 Años Película TPU',
                body: 'Controles preventivos sin costo al mes 1 y mes 3 en Taller Wrap Lab (Carrera 58D # 131-39, Bogotá) + garantía de fábrica contra amarillamiento y delaminación.',
            },
        ],
        warrantySummary:
            'Protocolo certificado Speedlight Works × Taller Wrap Lab: descontaminación con agua desionizada, plotter sin cuchillas sobre laca y sellado térmico de bordes a 95°C.',
    });

    const baseProposal: Proposal = {
        id: 'prop-tmyg-automotive-116',
        code: 'SLW-TMYG-2026-116',
        status: 'approved',
        version: 4,
        createdAt: '2026-11-12T10:00:00-05:00',
        updatedAt: '2026-11-17T18:30:00-05:00',
        adaptiveMode: 'compact-5',
        brandIdentity: INSTITUTIONAL_IDENTITY,
        client: {
            name: 'Propietario Tesla Model Y Juniper (WCP-021)',
            roleOrArea: 'Blindaje Automotriz PPF TPU · Gris Metálico',
            company: 'Cliente Privado · Speedlight Works',
            phone: '+57 317 668 6048',
            city: 'Bogotá D.C., Colombia',
            projectReference: 'Tesla Model Y Juniper 2025/2026 · Placa WCP-021',
        },
        project: {
            title: 'Blindaje PPF TPU Ultra-Gloss · Tesla Model Y Juniper',
            subtitle:
                'Propuesta técnica en 3 bloques independientes con películas TPU alifáticas certificadas (Avery Dennison 203µm, SunTek Reaction 215µm y 3M Scotchgard Pro).',
            categoryLabel: 'Speedlight Works · Protección & Detailing Automotriz',
            sector: 'automotive',
            complexity: 'enterprise',
            executiveSummary:
                'El nuevo diseño frontal y barras LED continuas del Tesla Model Y Juniper exigen protección TPU óptica sin distorsión desde el kilómetro cero. Esta propuesta aplica la arquitectura editorial PURRPURR.DEV × SPEEDLIGHT CULTURE adaptada al sector automotriz, permitiendo comparar bloques de cobertura con transparencia financiera total.',
            problemContext:
                'La gravedad de gravilla en autopista, insectos ácidos y microrayones en acabados Piano Black deterioran prematuramente el frontal y las ópticas LED continuas de los vehículos eléctricos modernos.',
            solutionConcept:
                'Aplicación de película de poliuretano termoplástico (TPU) 100% alifático transparente ultra-gloss con tecnología de autorregeneración térmica y corte milimétrico asistido por plotter.',
            deliveryTimeframe: '1 a 8 días hábiles según bloque elegido',
            objectives: [
                {
                    id: 'auto-obj-1',
                    metricValue: '203–215µm',
                    metricLabel: 'Espesor TPU',
                    title: 'Escudo Físico Autorregenerable',
                    description: 'Absorción de impactos de gravilla con recuperación térmica instantánea de micro-swirls.',
                },
                {
                    id: 'auto-obj-2',
                    metricValue: '10 Años',
                    metricLabel: 'Garantía TPU',
                    title: 'Certificación Cero Amarillamiento',
                    description: 'Lámina alifática estable frente a radiación UV y lavado frecuente a presión.',
                },
                {
                    id: 'auto-obj-3',
                    metricValue: '0',
                    metricLabel: 'Cortes en Laca',
                    title: 'Precisión Plotter + Termosellado',
                    description: 'Pre-corte digital de paneles con bordes envueltos y sellados a 95°C sin contacto con la pintura.',
                },
                {
                    id: 'auto-obj-4',
                    metricValue: '2 Controles',
                    metricLabel: 'Post-Entrega',
                    title: 'Mantenimiento Preventivo Mes 1 y 3',
                    description: 'Inspección gratuita de cantos, sellado hidrofóbico y validación en bahía Wrap Lab.',
                },
            ],
            scope: [
                {
                    id: 'auto-sc-1',
                    code: 'BLQ-01',
                    title: 'Bloque 1 · Lo Más Delicado (Avery 203µm)',
                    summary: 'Barra LED delantera, barra LED trasera continua, pantallas 15.4"+8.0" y parales Piano Black.',
                    deliverables: ['Protección óptica HD', 'Antirreflejo en pantallas', 'Sin espejos'],
                    phaseTag: 'Bloque 1 · 1 Día',
                    category: 'Protección Puntual',
                    ownerTag: 'Taller Wrap Lab',
                },
                {
                    id: 'auto-sc-2',
                    code: 'BLQ-02',
                    title: 'Bloque 2 · Solo el Frente & Paquete Híbrido',
                    summary: 'Capó completo, bumper delantero, 2 guardabarros y espejos en Avery 203µm o SunTek Reaction 215µm.',
                    deliverables: ['Alineación sin costuras', 'Remates envueltos internos', 'Incluye Bloque 1'],
                    phaseTag: 'Bloque 2 · 3 Días',
                    category: 'Blindaje Frontal',
                    ownerTag: 'Speedlight Works',
                },
                {
                    id: 'auto-sc-3',
                    code: 'BLQ-03',
                    title: 'Bloque 3 · Full Body 360° por Rollo Sellado',
                    summary: 'Cobertura integral 100% de la carrocería en Enerfilm Eco (5 años), Avery (10 años) o 3M Scotchgard Pro (10 años).',
                    deliverables: ['Rollo sellado 15m', 'Acta fotográfica 4K', 'Controles mes 1 y 3'],
                    phaseTag: 'Bloque 3 · 7–8 Días',
                    category: 'Blindaje Integral',
                    ownerTag: 'Speedlight Works × Wrap Lab',
                },
            ],
            deliverables: [
                { id: 'auto-del-1', title: 'Preparación & Descontaminación Clay/IPA', format: 'Checklist Bahía', phaseId: 'auto-ms-1', acceptanceCriteria: 'Cero partículas bajo película TPU.' },
                { id: 'auto-del-2', title: 'Instalación Plotter & Remate Térmico 95°C', format: 'Vehículo Protegido', phaseId: 'auto-ms-2', acceptanceCriteria: 'Bordes invisibles sin levantamiento.' },
                { id: 'auto-del-3', title: 'Póliza de Garantía & Control Post-Entrega', format: 'Acta Digital', phaseId: 'auto-ms-3', acceptanceCriteria: 'Vehículo entregado en Studio con póliza activa.' },
            ],
            milestones: [
                {
                    id: 'auto-ms-1',
                    phaseNumber: 'ETAPA 01',
                    title: 'Día 1 · Ingreso, Lavado Desionizado & Descontaminación',
                    timeframe: 'Jornada Inicial',
                    durationDays: 1,
                    deliverables: ['Recepción fotográfica 360°', 'Corrección puntual de micro-marcas', 'Desengrase IPA en cabina'],
                    paymentTrigger: 'Anticipo 50%',
                    statusLabel: 'Alistamiento de Superficie',
                },
                {
                    id: 'auto-ms-2',
                    phaseNumber: 'ETAPA 02',
                    title: 'Días 2–6 · Instalación PPF TPU por Bloques',
                    timeframe: 'Ejecución Técnica',
                    durationDays: 5,
                    deliverables: ['Corte plotter específico Model Y Juniper', 'Aplicación sin cuchillas', 'Reposado en cabina libre de polvo'],
                    paymentTrigger: 'Control de Calidad Interno',
                    statusLabel: 'Blindaje en Curso',
                },
                {
                    id: 'auto-ms-3',
                    phaseNumber: 'ETAPA 03',
                    title: 'Día Final · Curado 95°C, Inspección & Entrega',
                    timeframe: 'Cierre Operativo',
                    durationDays: 1,
                    deliverables: ['Sellado térmico de bordes', 'Acta digital de satisfacción', 'Agenda control mes 1'],
                    paymentTrigger: 'Saldo 50% Contra Entrega',
                    statusLabel: 'Entrega Certificada',
                },
            ],
        },
        commercialData: commercial,
        visualConfig: createVisualConfiguration('automotive', 'mixed-split'),
        pages: [],
        assets: [],
        versions: createSeedVersions('SLW-TMYG-2026-116', commercial.grandTotal, 5, 'automotive'),
        jobs: [],
        pdfUrl: '/cotizaciones/PROPUESTA_AUTOMOTRIZ_SLW-TMYG-2026-116.pdf',
    };

    return planProposalPages(baseProposal, 'compact-5');
}

// =============================================================================
// RUNTIME PROPOSAL STORE (In-Memory Singleton for API + Studio UI)
// =============================================================================

const globalForStore = globalThis as unknown as {
    __purrpurrProposalEngineStore?: Map<string, Proposal>;
};

function getStoreMap(): Map<string, Proposal> {
    if (!globalForStore.__purrpurrProposalEngineStore) {
        const map = new Map<string, Proposal>();
        const jl = buildJulianLoteroProposal();
        const tmyg = buildTeslaAutomotiveProposal();
        map.set(jl.id, jl);
        map.set(tmyg.id, tmyg);
        globalForStore.__purrpurrProposalEngineStore = map;
    }
    return globalForStore.__purrpurrProposalEngineStore;
}

export function getSeedProposals(): Proposal[] {
    return [buildJulianLoteroProposal(), buildTeslaAutomotiveProposal()];
}

export function listProposalsFromStore(): Proposal[] {
    return Array.from(getStoreMap().values());
}

export function getProposalFromStore(idOrCode: string): Proposal | undefined {
    const map = getStoreMap();
    if (map.has(idOrCode)) return map.get(idOrCode);
    const normalized = idOrCode.trim().toUpperCase();
    for (const proposal of map.values()) {
        if (proposal.code.toUpperCase() === normalized) return proposal;
    }
    return undefined;
}

export function saveProposalToStore(proposal: Proposal): Proposal {
    const map = getStoreMap();
    map.set(proposal.id, proposal);
    return proposal;
}

export function freezeImmutableVersion(proposal: Proposal, label?: string, summary?: string): Proposal {
    const nextVersionNumber = proposal.version + 1;
    const nextCode = `${proposal.code}-V0${nextVersionNumber}`;
    const newVersion: ProposalVersion = {
        versionNumber: nextVersionNumber,
        code: nextCode,
        label: label || `Version 0${nextVersionNumber} — Revisión editorial`,
        summary: summary || `Instantánea congelada con ${proposal.pages.length} páginas y total ${proposal.commercialData.grandTotal.toLocaleString('es-CO')} COP.`,
        createdAt: new Date().toISOString(),
        author: 'Proposal Studio · Operador',
        status: proposal.status,
        snapshotHash: `sha256:v0${nextVersionNumber}-${Date.now().toString(16)}`,
        grandTotal: proposal.commercialData.grandTotal,
        pageCount: proposal.pages.length,
        sector: proposal.project.sector,
    };

    const nextProposal: Proposal = {
        ...proposal,
        version: nextVersionNumber,
        updatedAt: new Date().toISOString(),
        versions: [...proposal.versions, newVersion],
    };
    return saveProposalToStore(nextProposal);
}

export interface RawProposalCreationInput {
    code?: string;
    clientName: string;
    clientCompany: string;
    clientPhone?: string;
    projectTitle: string;
    sector: ProjectSector;
    executiveSummary?: string;
    adaptiveMode?: 'auto' | 'compact-5' | 'expanded-9';
    items: Array<{
        title: string;
        description: string;
        phaseLabel: string;
        listUnitPrice: number;
        unitPrice: number;
    }>;
}

export function createProposalFromInput(raw: RawProposalCreationInput): Proposal {
    const now = new Date().toISOString();
    const issueDate = now.slice(0, 10);
    const id = `prop-${raw.sector}-${Date.now()}`;
    const code = raw.code?.trim() || `PROP-${raw.sector.slice(0, 3).toUpperCase()}-2026-${Math.floor(100 + Math.random() * 899)}`;

    const commercial = calculateCommercialData({
        issueDate,
        validDays: 15,
        items: raw.items.map((item, idx) => ({
            id: `item-${idx + 1}`,
            title: item.title,
            description: item.description,
            phaseLabel: item.phaseLabel || `Etapa ${idx + 1}`,
            quantity: 1,
            unitLabel: 'Módulo',
            listUnitPrice: item.listUnitPrice,
            unitPrice: item.unitPrice,
            providerTag: 'PURRPURR.DEV × SPEEDLIGHT',
        })),
        paymentMethods: [
            {
                id: 'pm-wompi-new',
                method: 'Pasarela Oficial Wompi (PSE, Tarjetas, Nequi, Bancolombia)',
                details: 'Recaudo en línea sin recargos adicionales de pasarela.',
                checkoutUrl: `https://speedlightculture.com/checkout?doc=${id}`,
                qrSrc: '/brand/car-coding-payment-qr.svg',
                highlight: true,
            },
        ],
        legalConditions: [
            {
                title: 'Esquema de Pago 50/50',
                body: '50% anticipo al aprobar la propuesta; 50% saldo contra entrega a satisfacción.',
            },
            {
                title: 'Régimen Tributario Neto',
                body: 'Valores netos cerrados en pesos colombianos (COP) bajo Régimen No Responsable de IVA.',
            },
        ],
        warrantySummary: 'Garantía conjunta purrpurr.dev × Speedlight Culture con actas de entrega verificables.',
    });

    const draft: Proposal = {
        id,
        code,
        status: 'review',
        version: 1,
        createdAt: now,
        updatedAt: now,
        adaptiveMode: raw.adaptiveMode || 'auto',
        brandIdentity: INSTITUTIONAL_IDENTITY,
        client: {
            name: raw.clientName,
            roleOrArea: 'Dirección del Proyecto',
            company: raw.clientCompany,
            phone: raw.clientPhone || '+57 313 883 0156',
            city: 'Bogotá D.C., Colombia',
            projectReference: raw.projectTitle,
        },
        project: {
            title: raw.projectTitle,
            subtitle: `Propuesta comercial generada automáticamente por Proposal Engine (${raw.sector}).`,
            categoryLabel: raw.sector.toUpperCase(),
            sector: raw.sector,
            complexity: raw.items.length >= 4 ? 'enterprise' : 'standard',
            executiveSummary:
                raw.executiveSummary ||
                `Propuesta estructurada en alianza PURRPURR.DEV × SPEEDLIGHT CULTURE para ${raw.clientCompany}, orientada a ejecutar ${raw.projectTitle} con control total de calidad y finanzas.`,
            problemContext: 'Estandarización operativa, optimización de flujo comercial y control determinístico de inversión.',
            solutionConcept: 'Arquitectura modular diseñada por etapas verificables con identidad editorial institucional.',
            deliveryTimeframe: `${Math.max(1, raw.items.length)} etapa(s) programadas`,
            objectives: [
                { id: 'o1', metricValue: '50/50', metricLabel: 'Hitos Pago', title: 'Inicio y Entrega Segura', description: 'Flujo de caja equilibrado vinculado a entregables reales.' },
                { id: 'o2', metricValue: '100%', metricLabel: 'Auditado', title: 'Cálculo Determinístico', description: 'Cifras y descuentos verificados automáticamente.' },
            ],
            scope: raw.items.map((it, idx) => ({
                id: `sc-${idx + 1}`,
                code: `MOD-0${idx + 1}`,
                title: it.title,
                summary: it.description,
                deliverables: ['Entregable verificado en producción'],
                phaseTag: it.phaseLabel || `Etapa ${idx + 1}`,
                category: raw.sector,
                ownerTag: 'PURRPURR.DEV × SPEEDLIGHT',
            })),
            deliverables: raw.items.map((it, idx) => ({
                id: `del-${idx + 1}`,
                title: it.title,
                format: 'Módulo / Entregable',
                phaseId: `ms-${idx + 1}`,
                acceptanceCriteria: 'Validación funcional y estética aprobada.',
            })),
            milestones: raw.items.map((it, idx) => ({
                id: `ms-${idx + 1}`,
                phaseNumber: `FASE 0${idx + 1}`,
                title: it.title,
                timeframe: it.phaseLabel || `Etapa ${idx + 1}`,
                durationDays: 5,
                deliverables: [it.title],
                paymentTrigger: idx === 0 ? 'Anticipo 50%' : 'Contra Entrega 50%',
                statusLabel: 'Planificado',
            })),
        },
        commercialData: commercial,
        visualConfig: createVisualConfiguration(raw.sector, 'pearl-light'),
        pages: [],
        assets: [],
        versions: createSeedVersions(code, commercial.grandTotal, 5, raw.sector),
        jobs: [],
    };

    const planned = planProposalPages(draft);
    return saveProposalToStore(planned);
}
