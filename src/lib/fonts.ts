import {
    // Sans Serif
    Inter, Roboto, Open_Sans, Montserrat, Poppins, Raleway, Oswald, Space_Grotesk, Syne, Unbounded,

    // Serif
    Playfair_Display, Merriweather, Lora, PT_Serif, Cinzel, Libre_Baskerville, Cormorant_Garamond,

    // Display
    Bebas_Neue, Anton, Abril_Fatface, Righteous, Bangers, Monoton, Press_Start_2P,

    // Handwriting
    Dancing_Script, Caveat, Satisfy, Permanent_Marker, Indie_Flower,

    // Monospace
    Roboto_Mono, Space_Mono, JetBrains_Mono, Fira_Code, Inconsolata
} from 'next/font/google';

// --- INITIALIZE FONTS (Curated Selection) ---

// Sans Serif
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
export const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
export const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-poppins' });
export const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });
export const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
export const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
export const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
export const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded' });

// Serif
export const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
export const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' });
export const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
export const ptSerif = PT_Serif({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-pt-serif' });
export const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
export const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-libre-baskerville' });
export const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cormorant' });

// Display
export const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebas-neue' });
export const anton = Anton({ subsets: ['latin'], weight: ['400'], variable: '--font-anton' });
export const abrilFatface = Abril_Fatface({ subsets: ['latin'], weight: ['400'], variable: '--font-abril' });
export const righteous = Righteous({ subsets: ['latin'], weight: ['400'], variable: '--font-righteous' });
export const bangers = Bangers({ subsets: ['latin'], weight: ['400'], variable: '--font-bangers' });
export const monoton = Monoton({ subsets: ['latin'], weight: ['400'], variable: '--font-monoton' });
export const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: ['400'], variable: '--font-press-start' });

// Handwriting
export const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' });
export const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });
export const satisfy = Satisfy({ subsets: ['latin'], weight: ['400'], variable: '--font-satisfy' });
export const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: ['400'], variable: '--font-permanent-marker' });
export const indieFlower = Indie_Flower({ subsets: ['latin'], weight: ['400'], variable: '--font-indie-flower' });

// Monospace
export const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' });
export const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono-origin' });
export const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });
export const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });
export const inconsolata = Inconsolata({ subsets: ['latin'], variable: '--font-inconsolata' });

// Map of Fonts for dynamic access
export const fontMap: Record<string, any> = {
    'Inter': inter,
    'Roboto': roboto,
    'Open Sans': openSans,
    'Montserrat': montserrat,
    'Poppins': poppins,
    'Raleway': raleway,
    'Oswald': oswald,
    'Space Grotesk': spaceGrotesk,
    'Syne': syne,
    'Unbounded': unbounded,
    'Playfair Display': playfairDisplay,
    'Merriweather': merriweather,
    'Lora': lora,
    'PT Serif': ptSerif,
    'Cinzel': cinzel,
    'Libre Baskerville': libreBaskerville,
    'Cormorant Garamond': cormorantGaramond,
    'Bebas Neue': bebasNeue,
    'Anton': anton,
    'Abril Fatface': abrilFatface,
    'Righteous': righteous,
    'Bangers': bangers,
    'Monoton': monoton,
    'Press Start 2P': pressStart2P,
    'Dancing Script': dancingScript,
    'Caveat': caveat,
    'Satisfy': satisfy,
    'Permanent Marker': permanentMarker,
    'Indie Flower': indieFlower,
    'Roboto Mono': robotoMono,
    'Space Mono': spaceMono,
    'JetBrains Mono': jetBrainsMono,
    'Fira Code': firaCode,
    'Inconsolata': inconsolata
};

// Map of human names to CSS Variable NAMES (strings), not the font objects
export const fontVariableNames: Record<string, string> = {
    'Inter': '--font-inter',
    'Roboto': '--font-roboto',
    'Open Sans': '--font-open-sans',
    'Montserrat': '--font-montserrat',
    'Poppins': '--font-poppins',
    'Raleway': '--font-raleway',
    'Oswald': '--font-oswald',
    'Space Grotesk': '--font-space-grotesk',
    'Syne': '--font-syne',
    'Unbounded': '--font-unbounded',
    'Playfair Display': '--font-playfair',
    'Merriweather': '--font-merriweather',
    'Lora': '--font-lora',
    'PT Serif': '--font-pt-serif',
    'Cinzel': '--font-cinzel',
    'Libre Baskerville': '--font-libre-baskerville',
    'Cormorant Garamond': '--font-cormorant',
    'Bebas Neue': '--font-bebas-neue',
    'Anton': '--font-anton',
    'Abril Fatface': '--font-abril',
    'Righteous': '--font-righteous',
    'Bangers': '--font-bangers',
    'Monoton': '--font-monoton',
    'Press Start 2P': '--font-press-start',
    'Dancing Script': '--font-dancing',
    'Caveat': '--font-caveat',
    'Satisfy': '--font-satisfy',
    'Permanent Marker': '--font-permanent-marker',
    'Indie Flower': '--font-indie-flower',
    'Roboto Mono': '--font-roboto-mono',
    'Space Mono': '--font-space-mono-origin',
    'JetBrains Mono': '--font-jetbrains',
    'Fira Code': '--font-fira-code',
    'Inconsolata': '--font-inconsolata'
};

// Joined variables string for Body className
export const allFontVariables = [
    inter, roboto, openSans, montserrat, poppins, raleway, oswald, spaceGrotesk, syne, unbounded,
    playfairDisplay, merriweather, lora, ptSerif, cinzel, libreBaskerville, cormorantGaramond,
    bebasNeue, anton, abrilFatface, righteous, bangers, monoton, pressStart2P,
    dancingScript, caveat, satisfy, permanentMarker, indieFlower,
    robotoMono, spaceMono, jetBrainsMono, firaCode, inconsolata
].map(f => f.variable).join(' ');
