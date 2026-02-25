export const PIGMENTO_DATA = {
  contact: {
    whatsapp: "+57 316 0535247",
    whatsappUrl: "https://wa.me/573160535247",
    email: "designedbypigmento@gmail.com",
    catalogUrl: "https://wa.me/c/573160535247",
    hours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM"
    }
  },
  paymentMethods: [
    { name: "Bancolombia", detail: "Ahorros 204 795227 91" },
    { name: "Nequi/Daviplata", detail: "3160535247" },
    { name: "Efecty", detail: "CC 1019089803" }
  ],
  shipping: {
    cundinamarca: { price: 9000, time: "1 día" },
    nacional: { price: 18800, time: "2-3 días" }
  },
  services: [
    {
      id: "stickers-custom",
      title: "Stickers Personalizados",
      description: "Vinilo blanco, transparente, tornasol y de corte.",
      priceStart: "$135,000/m²",
      icon: "Sticker"
    },
    {
      id: "plotter",
      title: "Plotter de Corte",
      description: "Servicio profesional. Incluye vinilo + transfer + corte.",
      priceStart: "$35,000/mt",
      icon: "Scissors"
    },
    {
      id: "design",
      title: "Servicios de Diseño",
      description: "Desde vectorización básica hasta branding completo.",
      priceStart: "$75,000",
      icon: "PenTool"
    },
    {
      id: "cubreplacas",
      title: "Cubreplacas",
      description: "Personalización y protección para tu moto.",
      priceStart: "$55,000/par",
      icon: "Shield"
    }
  ],
  pricing: {
    materials: [
      { name: "Vinilo Blanco", price: 134900, memberPrice: 75000, unit: "m²" },
      { name: "Transparente", price: 134900, memberPrice: 75000, unit: "m²" },
      { name: "Tornasol", price: 161700, memberPrice: 80850, unit: "m²" },
      { name: "Vinilo de Corte", price: 155000, memberPrice: 77500, unit: "m²" }
    ],
    packs: [
      { qty: 12, price: 25000 },
      { qty: 30, price: 45000 },
      { qty: 60, price: 78000 }
    ],
    megaPacks: [
      { name: "Mega Pack", qty: 100, price: 98000 },
      { name: "Ultra Pack", qty: 300, price: 240000 },
      { name: "Legendario", qty: 500, price: 350000 }
    ],
    collectionPacks: [
      {
        slug: "gameboy-pack",
        name: "Gameboy Pack",
        qty: 12,
        price: 25000,
        description: "12 Stickers Retro Mate (Vinilo Blanco)",
        longDescription: "Revive la nostalgia con este pack de 12 stickers inspirados en la era retro del gaming. Cada sticker está impreso en vinilo blanco de alta calidad con acabado mate, resistente al agua y rayones. Perfectos para decorar tu laptop, botella, cuaderno o cualquier superficie lisa.",
        finish: "Mate",
        material: "Vinilo Blanco",
        size: "4-6 cm",
        waterproof: true,
        tags: ["retro", "gaming", "nintendo", "pixel art"],
        image: "/fotos stickers coleccion/Gameboy Pack/IMG_7373.jpg",
        gallery: [
          "/fotos stickers coleccion/Gameboy Pack/IMG_7373.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7374.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7377.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7379.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7380.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7381.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7383.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7384.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7385.jpg",
          "/fotos stickers coleccion/Gameboy Pack/IMG_7388.jpg",
        ],
      },
      {
        slug: "sushi-pack",
        name: "Sushi Pack",
        qty: 12,
        price: 25000,
        description: "12 Stickers Kawaii Mate (Vinilo Blanco)",
        longDescription: "¡Para los amantes del sushi y la cultura kawaii! 12 stickers adorables con diseños de sushi, maki, nigiri y más. Impresos en vinilo blanco premium con acabado mate ultra suave. Resistentes al agua, ideales para botellas, laptops y cuadernos.",
        finish: "Mate",
        material: "Vinilo Blanco",
        size: "4-6 cm",
        waterproof: true,
        tags: ["kawaii", "sushi", "food", "japonés", "cute"],
        image: "/fotos stickers coleccion/Sushi Pack/IMG_7401.jpg",
        gallery: [
          "/fotos stickers coleccion/Sushi Pack/IMG_7401.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7402.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7403.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7404.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7405.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7406.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7408.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7409.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7410.jpg",
          "/fotos stickers coleccion/Sushi Pack/IMG_7411.jpg",
        ],
      },
      {
        slug: "unicorn-pack",
        name: "Unicorn Pack",
        qty: 9,
        price: 22000,
        description: "9 Stickers Fantasía Mate (Vinilo Blanco)",
        longDescription: "Un pack mágico con 9 stickers de unicornios, arcoíris y fantasía. Cada diseño está impreso en vinilo blanco de alta calidad con acabado mate. Perfectos para regalar o para añadir un toque de magia a tus objetos favoritos. Resistentes al agua.",
        finish: "Mate",
        material: "Vinilo Blanco",
        size: "4-6 cm",
        waterproof: true,
        tags: ["unicornio", "fantasía", "arcoíris", "cute", "regalo"],
        image: "/fotos stickers coleccion/Unicorn Pack/IMG_7392.jpg",
        gallery: [
          "/fotos stickers coleccion/Unicorn Pack/IMG_7392.jpg",
          "/fotos stickers coleccion/Unicorn Pack/IMG_7390.jpg",
          "/fotos stickers coleccion/Unicorn Pack/IMG_7391.jpg",
          "/fotos stickers coleccion/Unicorn Pack/IMG_7393.jpg",
          "/fotos stickers coleccion/Unicorn Pack/IMG_7394.jpg",
          "/fotos stickers coleccion/Unicorn Pack/IMG_7395.jpg",
          "/fotos stickers coleccion/Unicorn Pack/IMG_7396.jpg",
          "/fotos stickers coleccion/Unicorn Pack/IMG_7397.jpg",
        ],
      },
      {
        slug: "tornasol-pack",
        name: "Tornasol Pack",
        qty: 6,
        price: 18000,
        description: "6 Stickers Efecto Tornasol Brillante",
        longDescription: "El pack más llamativo de la colección. 6 stickers con efecto tornasol iridiscente que cambia de color según el ángulo de la luz. Acabado brillante ultra premium en vinilo tornasol. Un must-have para quienes buscan stickers únicos y deslumbrantes.",
        finish: "Brillante",
        material: "Vinilo Tornasol",
        size: "4-6 cm",
        waterproof: true,
        tags: ["tornasol", "holográfico", "iridiscente", "premium", "brillante"],
        image: "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4482.JPG",
        gallery: [
          "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4482.JPG",
        ],
      },
    ]
  },
  faqs: [
    {
      q: "¿Cuál es el tamaño mínimo?",
      a: "4x4 cm para garantizar calidad."
    },
    {
      q: "¿Tiempos de entrega?",
      a: "1 día en Cundinamarca, 2-3 días a nivel nacional."
    },
    {
      q: "¿Política de devoluciones?",
      a: "48 horas para reportar defectos. Reimpresión sin costo si es error nuestro."
    },
    {
      q: "¿De qué material son los cubreplacas?",
      a: "Base en acrílico y vinilo de alta resistencia. Disponibles en Negro, Fibra de Carbono, PPF o diseños personalizados."
    },
    {
      q: "¿Son legales para transitar?",
      a: "Sí, nuestros diseños aseguran que la placa sea visible y cumpla con la normativa, protegiéndola del desgaste."
    },
    {
      q: "¿Qué precio tienen los cubreplacas?",
      a: "Desde $55.000 el par. El precio varía según el material (Fibra, PPF) y el acabado que elijas."
    }
  ]
};