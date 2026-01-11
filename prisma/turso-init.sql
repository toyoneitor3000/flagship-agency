-- PURRPURR DATABASE SCHEMA FOR TURSO
-- This matches the Prisma schema

-- Contact (Lead entries)
CREATE TABLE IF NOT EXISTS Contact (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Demo Requests (Sales Funnel)
CREATE TABLE IF NOT EXISTS DemoRequest (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    instagram TEXT,
    industry TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    source TEXT DEFAULT 'landing',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_demorequest_status ON DemoRequest(status);
CREATE INDEX IF NOT EXISTS idx_demorequest_createdat ON DemoRequest(createdAt);

-- User (NextAuth)
CREATE TABLE IF NOT EXISTS User (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    emailVerified DATETIME,
    image TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Account (NextAuth)
CREATE TABLE IF NOT EXISTS Account (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    providerAccountId TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE(provider, providerAccountId)
);

-- Session (NextAuth)
CREATE TABLE IF NOT EXISTS Session (
    id TEXT PRIMARY KEY,
    sessionToken TEXT UNIQUE NOT NULL,
    userId TEXT NOT NULL,
    expires DATETIME NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- VerificationToken (NextAuth)
CREATE TABLE IF NOT EXISTS VerificationToken (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires DATETIME NOT NULL,
    UNIQUE(identifier, token)
);

-- Project (Purrpurr Architecture)
CREATE TABLE IF NOT EXISTS Project (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'DRAFT',
    architecture TEXT NOT NULL,
    integrations TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- ProjectVersion
CREATE TABLE IF NOT EXISTS ProjectVersion (
    id TEXT PRIMARY KEY,
    projectId TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    architecture TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projectId) REFERENCES Project(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_projectversion_projectid ON ProjectVersion(projectId);

-- Domain
CREATE TABLE IF NOT EXISTS Domain (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'PENDING',
    userId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Subscription
CREATE TABLE IF NOT EXISTS Subscription (
    id TEXT PRIMARY KEY,
    plan TEXT DEFAULT 'FREE',
    status TEXT DEFAULT 'ACTIVE',
    userId TEXT UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Analytics
CREATE TABLE IF NOT EXISTS Analytics (
    id TEXT PRIMARY KEY,
    eventType TEXT NOT NULL,
    projectId TEXT,
    userId TEXT,
    path TEXT,
    userAgent TEXT,
    ipHash TEXT,
    referer TEXT,
    country TEXT,
    responseTime INTEGER,
    bytesTransferred INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_analytics_projectid ON Analytics(projectId);
CREATE INDEX IF NOT EXISTS idx_analytics_userid ON Analytics(userId);
CREATE INDEX IF NOT EXISTS idx_analytics_createdat ON Analytics(createdAt);
CREATE INDEX IF NOT EXISTS idx_analytics_eventtype ON Analytics(eventType);

-- UsageStats
CREATE TABLE IF NOT EXISTS UsageStats (
    id TEXT PRIMARY KEY,
    userId TEXT UNIQUE NOT NULL,
    totalPageViews INTEGER DEFAULT 0,
    uniqueVisitors INTEGER DEFAULT 0,
    totalBandwidth INTEGER DEFAULT 0,
    totalApiCalls INTEGER DEFAULT 0,
    avgResponseTime INTEGER DEFAULT 0,
    storageUsed INTEGER DEFAULT 0,
    periodStart DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_usagestats_userid ON UsageStats(userId);

-- ColorPalette
CREATE TABLE IF NOT EXISTS ColorPalette (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    primary TEXT NOT NULL,
    secondary TEXT NOT NULL,
    accent TEXT NOT NULL,
    background TEXT NOT NULL,
    category TEXT,
    isActive INTEGER DEFAULT 1,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- LayoutOption
CREATE TABLE IF NOT EXISTS LayoutOption (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    config TEXT,
    isActive INTEGER DEFAULT 1,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- SectionTemplate
CREATE TABLE IF NOT EXISTS SectionTemplate (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    schema TEXT,
    defaultContent TEXT,
    category TEXT,
    isActive INTEGER DEFAULT 1,
    isPremium INTEGER DEFAULT 0,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- VisualEffect
CREATE TABLE IF NOT EXISTS VisualEffect (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'OVERLAY',
    cssClass TEXT,
    config TEXT,
    isActive INTEGER DEFAULT 1,
    isPremium INTEGER DEFAULT 0,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- GenerativePattern
CREATE TABLE IF NOT EXISTS GenerativePattern (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    generator TEXT NOT NULL,
    preview TEXT,
    isActive INTEGER DEFAULT 1,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- FontPairing
CREATE TABLE IF NOT EXISTS FontPairing (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    displayFont TEXT NOT NULL,
    bodyFont TEXT NOT NULL,
    tracking REAL DEFAULT 0,
    leading REAL DEFAULT 1.0,
    category TEXT,
    isActive INTEGER DEFAULT 1,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Archetype
CREATE TABLE IF NOT EXISTS Archetype (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT NOT NULL,
    defaultPaletteId TEXT,
    defaultLayoutId TEXT,
    isActive INTEGER DEFAULT 1,
    sortOrder INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
