export interface Sticker {
  id: number;
  name: string;
  price: number; // en centavos
  displayPrice: string;
  image: string;
  category: string;
  description: string;
  features: string[];
  fileUrl?: string;
  fileName?: string;
}

export const stickers: Sticker[] = [
  // GAMEBOY PACK
  { id: 1, name: "Gameboy Sticker 1", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7373.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 2, name: "Gameboy Sticker 2", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7374.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 3, name: "Gameboy Sticker 3", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7377.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 4, name: "Gameboy Sticker 4", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7379.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 5, name: "Gameboy Sticker 5", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7380.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 6, name: "Gameboy Sticker 6", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7381.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 7, name: "Gameboy Sticker 7", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7383.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 8, name: "Gameboy Sticker 8", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7384.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 9, name: "Gameboy Sticker 9", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7385.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 10, name: "Gameboy Sticker 10", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7388.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 11, name: "Gameboy Sticker 11", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7593.jpg", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 12, name: "Gameboy Sticker 12", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/2.png", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },
  { id: 13, name: "Gameboy Sticker 13", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Gameboy Pack/IMG_7190.JPG", category: "Gameboy Pack", description: "Diseño retro de colección", features: ["Mate"] },

  // SUSHI PACK
  { id: 14, name: "Sushi Sticker 1", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7401.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 15, name: "Sushi Sticker 2", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7402.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 16, name: "Sushi Sticker 3", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7403.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 17, name: "Sushi Sticker 4", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7404.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 18, name: "Sushi Sticker 5", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7405.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 19, name: "Sushi Sticker 6", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7406.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 20, name: "Sushi Sticker 7", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7408.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 21, name: "Sushi Sticker 8", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7409.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 22, name: "Sushi Sticker 9", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7410.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 23, name: "Sushi Sticker 10", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7411.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 24, name: "Sushi Sticker 11", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7412.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 25, name: "Sushi Sticker 12", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7413.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 26, name: "Sushi Sticker 13", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7414.jpg", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 27, name: "Sushi Sticker 14", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/3.png", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 28, name: "Sushi Sticker 15", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7187.JPG", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },
  { id: 29, name: "Sushi Sticker 16", price: 3000, displayPrice: "$3.000", image: "/fotos stickers coleccion/Sushi Pack/IMG_7188.JPG", category: "Sushi Pack", description: "Diseño japonés de colección", features: ["Brillante"] },

  // UNICORN PACK
  { id: 30, name: "Unicorn Sticker 1", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7390.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 31, name: "Unicorn Sticker 2", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7391.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 32, name: "Unicorn Sticker 3", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7392.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 33, name: "Unicorn Sticker 4", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7393.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 34, name: "Unicorn Sticker 5", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7394.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 35, name: "Unicorn Sticker 6", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7395.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 36, name: "Unicorn Sticker 7", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7396.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 37, name: "Unicorn Sticker 8", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7397.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 38, name: "Unicorn Sticker 9", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7398.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 39, name: "Unicorn Sticker 10", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7399.jpg", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 40, name: "Unicorn Sticker 11", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/1.png", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },
  { id: 41, name: "Unicorn Sticker 12", price: 4000, displayPrice: "$4.000", image: "/fotos stickers coleccion/Unicorn Pack/IMG_7189.JPG", category: "Unicorn Pack", description: "Diseño de fantasía", features: ["Holográfico"] },

  // VARIOS
  { id: 42, name: "Pigmento Sticker 1", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/IMG_7192.JPG", category: "Varios", description: "Diseño exclusivo", features: ["Vinilo"] },
  { id: 43, name: "Pigmento Sticker 2", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/IMG_7195.JPG", category: "Varios", description: "Diseño exclusivo", features: ["Vinilo"] },
  { id: 44, name: "Pigmento Sticker 3", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/IMG_7196.JPG", category: "Varios", description: "Diseño exclusivo", features: ["Vinilo"] },

  // COLECCIONES
  { id: 46, name: "Colección Sticker 1", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/102903675_600653260841161_668525023461267894_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 47, name: "Colección Sticker 2", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/102916552_150494769929037_6362986208508194703_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 48, name: "Colección Sticker 3", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/103386137_270471817499986_5133967861443628538_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 49, name: "Colección Sticker 4", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/103498180_689783888528245_4196568405226025324_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 50, name: "Colección Sticker 5", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/105947560_143713320658895_7929927611525277151_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 51, name: "Colección Sticker 6", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/105956105_702826993607539_4364859636267868010_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 52, name: "Colección Sticker 7", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/105977405_1512252985628976_8007058317372044773_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 53, name: "Colección Sticker 8", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/106246045_728585207958255_6886324527497364891_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 54, name: "Colección Sticker 9", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/109724523_327212195115556_2442367407618015314_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 55, name: "Colección Sticker 10", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/109820685_351069822957160_6480856910773356024_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 57, name: "Colección Sticker 12", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/IMG_6401.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 58, name: "Colección Sticker 13", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/PDF-exportado-grupo-1.jpg", category: "Colecciones", description: "Planilla de colección", features: ["Lote"] },
  { id: 59, name: "Colección Sticker 14", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/PDF-exportado-grupo-4.jpg", category: "Colecciones", description: "Planilla de colección", features: ["Lote"] },

  // TORNASOL
  { id: 60, name: "Tornasol Sticker 1", price: 4500, displayPrice: "$4.500", image: "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4482.JPG", category: "Tornasol", description: "Efecto tornasol", features: ["Holográfico"] },
  { id: 61, name: "Tornasol Sticker 2", price: 4500, displayPrice: "$4.500", image: "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4483.JPG", category: "Tornasol", description: "Efecto tornasol", features: ["Holográfico"] },
  { id: 62, name: "Tornasol Sticker 3", price: 4500, displayPrice: "$4.500", image: "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4487.JPG", category: "Tornasol", description: "Efecto tornasol", features: ["Holográfico"] },
  { id: 63, name: "Tornasol Sticker 4", price: 4500, displayPrice: "$4.500", image: "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4489.JPG", category: "Tornasol", description: "Efecto tornasol", features: ["Holográfico"] },
  { id: 80, name: "Tornasol Sticker 5", price: 4500, displayPrice: "$4.500", image: "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4492.JPG", category: "Tornasol", description: "Efecto tornasol", features: ["Holográfico"] },
  { id: 81, name: "Tornasol Sticker 6", price: 4500, displayPrice: "$4.500", image: "/fotos stickers coleccion/Colecciones img/coleccion tornasol/IMG_4495.JPG", category: "Tornasol", description: "Efecto tornasol", features: ["Holográfico"] },
  { id: 64, name: "Colección Sticker 15", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/117169218_3167823053313094_1240927142905771606_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 65, name: "Colección Sticker 16", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/117176522_244429636541518_1593358344681072600_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 66, name: "Colección Sticker 17", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/117406443_736563907132954_397276093351744674_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 67, name: "Colección Sticker 18", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/117420767_322411328807884_7146646819827618515_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 68, name: "Colección Sticker 19", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/117563562_122093455989289_7785190827655452988_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 69, name: "Colección Sticker 20", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/117603542_113462523654506_6294200711736379080_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 70, name: "Colección Sticker 21", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/120260439_868927766971962_4303868868094883239_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 71, name: "Colección Sticker 22", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/120444909_689483284993489_5390140583883642966_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 72, name: "Colección Sticker 23", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/120455789_631238590907087_5413404293831917997_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 73, name: "Colección Sticker 24", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/121025644_394994321524851_4610942741275401387_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 74, name: "Colección Sticker 25", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/121126801_2697684570494389_5057712746741746019_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 75, name: "Colección Sticker 26", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/121273449_204010267823344_2012259389178705846_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 76, name: "Colección Sticker 27", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/121727526_627277087922372_5712484889002516851_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 77, name: "Colección Sticker 28", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/122107060_811767842698662_7771322624252063426_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 78, name: "Colección Sticker 29", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/123131206_361789228370930_2292119880224689389_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
  { id: 79, name: "Colección Sticker 30", price: 3500, displayPrice: "$3.500", image: "/fotos stickers coleccion/Colecciones img/160685446_186534753003439_5694184048318954783_n.jpg", category: "Colecciones", description: "Diseño de colección", features: ["Premium"] },
];

export function getStickerById(id: number): Sticker | undefined {
  return stickers.find((s) => s.id === id);
}
