// --- MOCK AI ENGINE (SEMANTIC VIBE MATCHING) ---
// Replaces random math with curated Brand Archetypes.
// Ensures every result feels professionally designed, not randomly generated.

// 1. DEFINED BRAND ARCHETYPES (Curated Palettes)
const ARCHETYPES = {
    LUXURY: {
        name: 'Luxury',
        colors: { color1: '#09090b', color2: '#18181b', color3: '#d4af37', color4: '#504015' } // Black & Gold
    },
    TRUST: {
        name: 'Trust',
        colors: { color1: '#0f172a', color2: '#1e293b', color3: '#38bdf8', color4: '#0c4a6e' } // Navy & Sky
    },
    GROWTH: {
        name: 'Growth',
        colors: { color1: '#052e16', color2: '#14532d', color3: '#4ade80', color4: '#166534' } // Deep Green
    },
    ENERGY: {
        name: 'Energy',
        colors: { color1: '#450a0a', color2: '#7f1d1d', color3: '#f87171', color4: '#991b1b' } // Deep Red
    },
    WARMTH: {
        name: 'Warmth',
        colors: { color1: '#2a1b15', color2: '#431407', color3: '#fb923c', color4: '#7c2d12' } // Coffee/Orange
    },
    FUTURE: {
        name: 'Future',
        colors: { color1: '#172554', color2: '#1e1b4b', color3: '#60a5fa', color4: '#7c3aed' } // Blue/Purple
    },
    SOFT: {
        name: 'Soft',
        colors: { color1: '#2e1065', color2: '#4c1d95', color3: '#f472b6', color4: '#831843' } // Purple/Pink
    },
    MINIMAL: {
        name: 'Minimal',
        colors: { color1: '#000000', color2: '#18181b', color3: '#ffffff', color4: '#52525b' } // B&W
    }
};

// 2. KEYWORD MAPPING
const KEYWORDS: Record<string, keyof typeof ARCHETYPES> = {
    // LUXURY (Cars, Jewelry, Law, High-end)
    'auto': 'LUXURY', 'car': 'LUXURY', 'coche': 'LUXURY', 'luxury': 'LUXURY',
    'law': 'LUXURY', 'legal': 'LUXURY', 'jewelry': 'LUXURY', 'joyas': 'LUXURY',
    'estate': 'LUXURY', 'mansion': 'LUXURY', 'vip': 'LUXURY', 'exclusive': 'LUXURY',

    // TRUST (Finance, Health, Corporate)
    'bank': 'TRUST', 'finance': 'TRUST', 'money': 'TRUST', 'audit': 'TRUST',
    'medical': 'TRUST', 'doctor': 'TRUST', 'health': 'TRUST', 'salud': 'TRUST',
    'dentist': 'TRUST', 'consulting': 'TRUST', 'agency': 'TRUST', 'seguro': 'TRUST',

    // GROWTH (Eco, Garden, Food, nature)
    'eco': 'GROWTH', 'green': 'GROWTH', 'plant': 'GROWTH', 'garden': 'GROWTH',
    'bio': 'GROWTH', 'farm': 'GROWTH', 'food': 'GROWTH', 'fresh': 'GROWTH',
    'comida': 'GROWTH', 'nature': 'GROWTH', 'vegan': 'GROWTH', 'salad': 'GROWTH',

    // ENERGY (Gym, Sports, Fast Food, Action)
    'gym': 'ENERGY', 'fitness': 'ENERGY', 'sport': 'ENERGY', 'crossfit': 'ENERGY',
    'burger': 'ENERGY', 'pizza': 'ENERGY', 'grill': 'ENERGY', 'fuego': 'ENERGY',
    'action': 'ENERGY', 'game': 'ENERGY', 'race': 'ENERGY', 'speed': 'ENERGY',

    // WARMTH (Cafe, Bakery, Home, artisanal)
    'coffee': 'WARMTH', 'cafe': 'WARMTH', 'bread': 'WARMTH', 'bakery': 'WARMTH',
    'pan': 'WARMTH', 'home': 'WARMTH', 'wood': 'WARMTH', 'craft': 'WARMTH',
    'beer': 'WARMTH', 'cerveza': 'WARMTH', 'book': 'WARMTH', 'libro': 'WARMTH',

    // FUTURE (Tech, AI, SaaS, Startup)
    'tech': 'FUTURE', 'app': 'FUTURE', 'saas': 'FUTURE', 'ai': 'FUTURE',
    'cyber': 'FUTURE', 'crypto': 'FUTURE', 'data': 'FUTURE', 'code': 'FUTURE',
    'software': 'FUTURE', 'cloud': 'FUTURE', 'robot': 'FUTURE', 'start': 'FUTURE',

    // SOFT (Beauty, Spa, Kids, Fashion)
    'beauty': 'SOFT', 'spa': 'SOFT', 'makeup': 'SOFT', 'fashion': 'SOFT',
    'moda': 'SOFT', 'kids': 'SOFT', 'baby': 'SOFT', 'flower': 'SOFT',
    'yoga': 'SOFT', 'peace': 'SOFT', 'care': 'SOFT', 'love': 'SOFT'
};

export const generateDesignFromInput = (input: string) => {
    const text = input.trim();
    if (!text) return null;

    // 1. ANALYZE COPY
    const words = text.split(' ');
    const significantWords = words.filter(w => w.length > 3);
    const mainSubject = significantWords.length > 0
        ? significantWords[significantWords.length - 1].toUpperCase().replace(/[^A-Z]/g, '')
        : "PROJECT";

    // Copy Logic
    const title = mainSubject || "GENESIS";
    const description = text.length < 100 ? text : text.substring(0, 97) + "...";

    const firstWord = words[0].toLowerCase();
    let pre = "BUILD";
    let post = "THE FUTURE";

    if (['buy', 'sell', 'shop', 'store', 'venta', 'comprar'].some(v => firstWord.includes(v))) {
        pre = "STOREFRONT";
        post = "ONLINE";
    } else if (['create', 'make', 'build', 'crear', 'hacer'].some(v => firstWord.includes(v))) {
        pre = "CRAFT";
        post = "REALITY";
    } else if (['we', 'us', 'our', 'somos'].some(v => firstWord.includes(v))) {
        pre = "WE ARE";
        post = "LEGEND";
    }

    // 2. DETERMINE ARCHETYPE
    const lowerText = text.toLowerCase();
    let selectedArchetype: keyof typeof ARCHETYPES = 'MINIMAL'; // Default Safe Fallback

    // Check for exact matches in our keyword dictionary
    for (const [key, archetype] of Object.entries(KEYWORDS)) {
        if (lowerText.includes(key)) {
            selectedArchetype = archetype;
            break; // First match wins (Priority could be improved but works for speed)
        }
    }

    // 3. RETURN RESULT
    const themeParams = ARCHETYPES[selectedArchetype].colors;

    return {
        updates: {
            'hero.title_1': title,
            'hero.description': description,
            'hero.title_2_pre': pre,
            'hero.title_2_post': post
        },
        theme: themeParams
    };
};

// Helper: HSL to Hex
function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
