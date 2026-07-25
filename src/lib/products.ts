import rose from "@/assets/product-rose.jpg";
import argan from "@/assets/product-argan.jpg";
import jasmine from "@/assets/product-jasmine.jpg";
import vanilla from "@/assets/product-vanilla.jpg";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  image: string;
  notes: string[];
  description: string;
  ingredients: string;
};

export const products: Product[] = [
  {
    slug: "rose",
    name: "Damask Rose",
    tagline: "The romantic",
    price: "KSh 2,400",
    image: rose,
    notes: ["Bulgarian rose", "Sweet almond", "Vitamin E"],
    description:
      "A honeyed, floral oil pressed with wild-harvested Damask rose petals. Softens skin, quiets the mind, and lingers like a memory of a warm evening.",
    ingredients: "Prunus amygdalus dulcis oil, Rosa damascena flower oil, Tocopherol.",
  },
  {
    slug: "argan",
    name: "Golden Argan",
    tagline: "The nourisher",
    price: "KSh 2,600",
    image: argan,
    notes: ["Moroccan argan", "Jojoba", "Neroli"],
    description:
      "Cold-pressed argan folded with jojoba for a fast-drinking, weightless glow. For dry skin that wants to feel silk again.",
    ingredients: "Argania spinosa kernel oil, Simmondsia chinensis, Citrus aurantium.",
  },
  {
    slug: "jasmine",
    name: "Night Jasmine",
    tagline: "The seductress",
    price: "KSh 2,800",
    image: jasmine,
    notes: ["Sambac jasmine", "Coconut", "Ylang ylang"],
    description:
      "Intoxicating jasmine sambac melted into virgin coconut. A warm, indolic hush of an oil for slow evenings and bare shoulders.",
    ingredients: "Cocos nucifera oil, Jasminum sambac, Cananga odorata flower oil.",
  },
  {
    slug: "vanilla",
    name: "Burnt Vanilla",
    tagline: "The comfort",
    price: "KSh 2,500",
    image: vanilla,
    notes: ["Madagascar vanilla", "Sweet almond", "Sandalwood"],
    description:
      "A soft gourmand — vanilla pods steeped in almond, warmed with a whisper of sandalwood. Skin like caramel light.",
    ingredients: "Prunus amygdalus dulcis oil, Vanilla planifolia, Santalum album.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
