// =============================================================================
// PURRPURR.DEV × SPEEDLIGHT CULTURE — PROPOSAL ENGINE (Especificación v1.0)
// Canonical Data Model & Type Contracts (Section 4)
// =============================================================================

export type ProposalStatus =
    | 'draft'
    | 'planning'
    | 'generating_assets'
    | 'rendering'
    | 'review'
    | 'approved'
    | 'exported';

export type ProjectSector =
    | 'automotive'
    | 'software'
    | 'branding'
    | 'architecture';

export type TemplateCategory =
    | 'cover'
    | 'executive'
    | 'solutions'
    | 'implementation'
    | 'financial'
    | 'closing';

export type ApprovedTemplateId =
    // Cover (3)
    | 'cover-editorial-a'
    | 'cover-image-split'
    | 'cover-dark-closing'
    // Executive (2)
    | 'executive-summary-a'
    | 'executive-summary-b'
    // Solutions (3)
    | 'solution-visual-a'
    | 'module-grid-a'
    | 'technical-diagram-a'
    // Implementation (2)
    | 'timeline-a'
    | 'roadmap-a'
    // Financial (3)
    | 'pricing-table-a'
    | 'pricing-comparison-a'
    | 'payment-terms-a'
    // Closing (2)
    | 'acceptance-a'
    | 'closing-editorial-a';

export type InstitutionalComponentId =
    | 'BrandHeader'
    | 'ProposalID'
    | 'PageNumber'
    | 'SectionTitle'
    | 'BrandFooter'
    | 'SignatureBlock'
    | 'LegalNotice'
    | 'BrandDivider';

export type EditorialComponentId =
    | 'HeroTitle'
    | 'InfoCard'
    | 'PricingTable'
    | 'Timeline'
    | 'VisualMockup'
    | 'MetricBlock';

export interface TemplateImageZone {
    id: string;
    label: string;
    aspectRatio: string;
    minResolution: string;
    required: boolean;
}

export interface TemplateTypographicZone {
    id: string;
    role: 'H1' | 'H2' | 'H3' | 'Body' | 'Caption' | 'Data';
    maxChars: number;
    maxLines: number;
}

export interface TemplateMetadata {
    id: ApprovedTemplateId;
    category: TemplateCategory;
    name: string;
    description: string;
    columns: 12;
    imageZones: TemplateImageZone[];
    typographicZones: TemplateTypographicZone[];
    allowedInstitutionalComponents: InstitutionalComponentId[];
    allowedEditorialComponents: EditorialComponentId[];
    overflowRule: 'redistribute-to-next-page' | 'compact-grid' | 'split-table';
    colorVariants: Array<'pearl-light' | 'obsidian-contrast' | 'mixed-split'>;
    contentRules: {
        minItems: number;
        maxItems: number;
        maxBodyWords: number;
    };
}

export interface BrandIdentity {
    allianceLabel: string;
    primaryBrand: {
        name: string;
        tagline: string;
        logoSrc: string;
        domain: string;
    };
    partnerBrand: {
        name: string;
        tagline: string;
        logoSrc: string;
        domain: string;
    };
    issuerRepresentative: string;
    issuerDocument: string;
    issuerEmail: string;
    issuerPhone: string;
    city: string;
    signatureSrc: string;
}

export interface Client {
    name: string;
    roleOrArea: string;
    company: string;
    phone: string;
    email?: string;
    city: string;
    projectReference?: string;
}

export interface ScopeItem {
    id: string;
    code: string;
    title: string;
    summary: string;
    deliverables: string[];
    phaseTag: string;
    category: string;
    ownerTag: string;
}

export interface Deliverable {
    id: string;
    title: string;
    format: string;
    phaseId: string;
    acceptanceCriteria: string;
}

export interface Milestone {
    id: string;
    phaseNumber: string;
    title: string;
    timeframe: string;
    durationDays: number;
    deliverables: string[];
    paymentTrigger?: string;
    statusLabel: string;
}

export interface ProjectObjective {
    id: string;
    metricValue: string;
    metricLabel: string;
    title: string;
    description: string;
}

export interface Project {
    title: string;
    subtitle: string;
    categoryLabel: string;
    sector: ProjectSector;
    complexity: 'compact' | 'standard' | 'enterprise';
    executiveSummary: string;
    problemContext: string;
    solutionConcept: string;
    deliveryTimeframe: string;
    objectives: ProjectObjective[];
    scope: ScopeItem[];
    deliverables: Deliverable[];
    milestones: Milestone[];
    technicalArchitectureNodes?: {
        id: string;
        layer: string;
        title: string;
        spec: string;
    }[];
}

export interface CommercialItem {
    id: string;
    title: string;
    description: string;
    phaseLabel: string;
    quantity: number;
    unitLabel: string;
    listUnitPrice: number;
    unitPrice: number;
    subtotal: number;
    providerTag: string;
}

export interface DiscountRule {
    label: string;
    percentage: number;
    amount: number;
    appliesTo: string;
}

export interface TaxRule {
    regimeLabel: string;
    taxRatePercentage: number;
    taxAmount: number;
    exemptNotice: string;
}

export interface PaymentTerm {
    id: string;
    label: string;
    percentage: number;
    amount: number;
    triggerDescription: string;
}

export interface PaymentMethod {
    id: string;
    method: string;
    details: string;
    checkoutUrl?: string;
    qrSrc?: string;
    highlight?: boolean;
}

export interface AlternativePackageOption {
    id: string;
    groupTitle?: string;
    name: string;
    description: string;
    listPrice: number;
    discountAmount: number;
    discountPercentage: number;
    total: number;
    advanceAmount: number;
    balanceAmount: number;
    materialOrTechLabel: string;
    timeframeLabel: string;
    recommended?: boolean;
}

export interface CommercialData {
    currency: 'COP';
    issueDate: string;
    validDays: number;
    validUntil: string;
    items: CommercialItem[];
    listSubtotal: number;
    netItemsTotal: number;
    discounts: DiscountRule[];
    discountTotal: number;
    taxes: TaxRule[];
    taxTotal: number;
    grandTotal: number;
    paymentTerms: PaymentTerm[];
    paymentMethods: PaymentMethod[];
    alternativePackages: AlternativePackageOption[];
    legalConditions: {
        title: string;
        body: string;
    }[];
    warrantySummary: string;
}

export interface VisualConfiguration {
    system: 'mixed';
    layoutMode: 'fixed';
    pageMode: 'adaptive';
    sector: ProjectSector;
    colorVariant: 'pearl-light' | 'obsidian-contrast' | 'mixed-split';
    palette: {
        pearl: '#F7F7F5';
        ink: '#111111';
        lightGray: '#E7E7E5';
        secondaryGray: '#777777';
        institutionalPurple: '#9B5CFF';
        sectorAccent: string;
        sectorDark: string;
    };
    typography: {
        display: 'Space Grotesk';
        body: 'Inter';
        mono: 'JetBrains Mono';
    };
    artDirectionStyle: string;
    lockedInstitutionalElements: true;
}

export interface AssetReference {
    id: string;
    url: string;
    alt: string;
    caption: string;
    aspectRatio: string;
    zoneId: string;
    sourceType: 'ai-generated' | 'studio-photo' | 'vector-ui-composite' | 'programmatic-svg';
    revision: number;
    updatedAt: string;
}

export interface VisualBrief {
    sector: ProjectSector;
    style: string;
    subject: string;
    composition: string;
    colorMood: string;
    usageZone: string;
    targetTemplateId: ApprovedTemplateId;
}

export interface PageContentData {
    sectionCode: string;
    sectionTitle: string;
    sectionSubtitle: string;
    headline: string;
    leadParagraph: string;
    highlights?: Array<{ label: string; value: string; note?: string }>;
    callouts?: Array<{ title: string; body: string; tag?: string }>;
    mockupOverlayData?: {
        appTitle: string;
        appUrl: string;
        primaryStatLabel: string;
        primaryStatValue: string;
        statusBadge: string;
        actionLabel: string;
        secondaryStats: Array<{ label: string; value: string }>;
    };
}

export interface ProposalPage {
    id: string;
    pageNumber: number;
    sectionType: TemplateCategory;
    templateId: ApprovedTemplateId;
    title: string;
    editorialStatus: 'approved' | 'review' | 'draft';
    contentData: PageContentData;
    assets: AssetReference[];
    visualBrief: VisualBrief;
}

export interface ProposalVersion {
    versionNumber: number;
    code: string;
    label: string;
    summary: string;
    createdAt: string;
    author: string;
    status: ProposalStatus;
    snapshotHash: string;
    grandTotal: number;
    pageCount: number;
    sector: ProjectSector;
}

export interface GenerationJob {
    id: string;
    proposalId: string;
    stage: 'input' | 'ai-content' | 'planner' | 'asset-engine' | 'renderer' | 'quality-control' | 'export';
    status: 'completed' | 'running' | 'failed';
    message: string;
    timestamp: string;
    durationMs: number;
}

export type QualityControlLevelId = '01_commercial' | '02_editorial' | '03_visual' | '04_pdf';

export interface QualityControlCheck {
    id: string;
    level: QualityControlLevelId;
    levelTitle: string;
    label: string;
    passed: boolean;
    severity: 'critical' | 'warning' | 'info';
    detail: string;
}

export interface QualityControlReport {
    proposalId: string;
    checkedAt: string;
    overallPassed: boolean;
    scorePercentage: number;
    levels: {
        id: QualityControlLevelId;
        code: string;
        title: string;
        passed: boolean;
        checks: QualityControlCheck[];
    }[];
}

export interface Proposal {
    id: string;
    code: string;
    status: ProposalStatus;
    version: number;
    createdAt: string;
    updatedAt: string;
    adaptiveMode: 'auto' | 'compact-5' | 'expanded-9';
    brandIdentity: BrandIdentity;
    client: Client;
    project: Project;
    commercialData: CommercialData;
    visualConfig: VisualConfiguration;
    pages: ProposalPage[];
    assets: AssetReference[];
    versions: ProposalVersion[];
    jobs: GenerationJob[];
    pdfUrl?: string;
}
