// Mock data for Baserri Experience marketplace
export type Experience = {
  id: string;
  title: string;
  location: string;
  zone: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  host: string;
  image: string;
  gallery: string[];
  description: string;
  includes: string[];
};

export const experiences: Experience[] = [
  {
    id: "queso-idiazabal",
    title: "Taller artesanal de Queso Idiazabal y visita al pastizal",
    location: "Axpe (Valle de Atxondo)",
    zone: "Duranguesado",
    type: "Taller gastronómico",
    price: 35,
    rating: 4.9,
    reviews: 128,
    duration: "3 horas",
    host: "Mikel — Pastor local",
    image:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Acompaña a Mikel al pastizal donde pastan sus ovejas latxas. Aprenderás el proceso completo de elaboración del Queso Idiazabal D.O., desde el ordeño hasta el cuajo, y terminarás con una cata maridada con sidra natural.",
    includes: [
      "Visita al pastizal con las ovejas",
      "Materiales para elaborar tu propio queso",
      "Cata de quesos en distintas curaciones",
      "Receta tradicional para llevar a casa",
    ],
  },
  {
    id: "txakoli-bakio",
    title: "Vendimia y cata de Txakoli sobre el Cantábrico",
    location: "Bakio",
    zone: "Costa de Bizkaia",
    type: "Cata y vendimia",
    price: 45,
    rating: 4.8,
    reviews: 94,
    duration: "4 horas",
    host: "Aitor — Bodeguero",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Vive una jornada de vendimia en viñedos con vistas al Cantábrico y descubre los secretos del Txakoli de Bizkaia.",
    includes: ["Vendimia participativa", "Cata de 4 vinos", "Pintxos locales"],
  },
  {
    id: "apicultura-gorbeia",
    title: "Iniciación a la Apicultura y recogida de miel forestal",
    location: "Gorbeia",
    zone: "Parque Natural",
    type: "Naturaleza",
    price: 30,
    rating: 4.95,
    reviews: 76,
    duration: "2,5 horas",
    host: "Nerea — Apicultora",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Descubre el mundo de las abejas en pleno Parque Natural del Gorbeia. Te equiparemos para que puedas acercarte a las colmenas con seguridad y recoger miel forestal recién extraída.",
    includes: ["Equipo de apicultor", "Tarro de miel forestal", "Degustación"],
  },
];

export const upcomingBookings = [
  { id: "r1", name: "Laura Etxeberria", people: 2, date: "Sáb 24 May", time: "10:00" },
  { id: "r2", name: "Familia Garmendia", people: 4, date: "Dom 25 May", time: "11:30" },
  { id: "r3", name: "Jon Aranburu", people: 2, date: "Sáb 31 May", time: "10:00" },
];
