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
      { name: "Gameboy Pack", qty: 12, price: 25000, description: "12 Stickers Retro Mate (Vinilo Blanco)", finish: "Mate", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7373.jpg" },
      { name: "Sushi Pack", qty: 12, price: 25000, description: "12 Stickers Kawaii Mate (Vinilo Blanco)", finish: "Mate", image: "/fotos stickers coleccion/Sushi Pack/IMG_7401.jpg" },
      { name: "Unicorn Pack", qty: 9, price: 22000, description: "9 Stickers Fantasía Mate (Vinilo Blanco)", finish: "Mate", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7392.jpg" },
      { name: "Tornasol Pack", qty: 6, price: 18000, description: "6 Stickers Efecto Tornasol Brillante", finish: "Brillante", image: "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4482.JPG" }
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