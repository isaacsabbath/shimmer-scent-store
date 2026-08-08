import sakura from "@/assets/product-sakura.png.asset.json";
import minty from "@/assets/product-minty-bliss.png.asset.json";
import sweetOrange from "@/assets/product-sweet-orange.png.asset.json";
import mocha from "@/assets/product-mocha-harmony.png.asset.json";

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
    slug: "sakura",
    name: "Sakura",
    tagline: "The romantic",
    price: "KSh 2,400",
    image: sakura.url,
    notes: ["Cherry blossom", "Shea butter", "Squalane"],
    description:
      "A soft, petal-pink whip of shea and mango butter kissed with cherry blossom. Heals, moisturises and rejuvenates — light enough for everyday, tender enough for a ritual.",
    ingredients: "Shea Butter, Coconut Oil, Mango Butter, Squalane, Sakura fragrance.",
  },
  {
    slug: "minty-bliss",
    name: "Minty Bliss",
    tagline: "The awakener",
    price: "KSh 2,500",
    image: minty.url,
    notes: ["Peppermint", "Shea butter", "pH balanced"],
    description:
      "Cool, clean and reviving. Whipped shea folded with peppermint for tired legs and warm mornings — sinks in fast, leaves skin breathing.",
    ingredients: "Purified Water, Shea Butter, Coconut Oil, Peppermint Oil, Squalane.",
  },
  {
    slug: "sweet-orange",
    name: "Sweet Orange",
    tagline: "The sunshine",
    price: "KSh 2,500",
    image: sweetOrange.url,
    notes: ["Sweet orange", "Shea butter", "Maca"],
    description:
      "Citrus-bright and buttery. A golden whip that lifts the mood while it softens elbows, knees and everything in between.",
    ingredients: "Shea Butter, Maca, Coconut Oil, Sweet Orange essential oil.",
  },
  {
    slug: "mocha-harmony",
    name: "Mocha Harmony",
    tagline: "The comfort",
    price: "KSh 2,600",
    image: mocha.url,
    notes: ["Cocoa", "Coffee", "Shea butter"],
    description:
      "A warm gourmand — cocoa and roasted coffee whipped into shea. Rich, grounding, and made for slow evenings and bare shoulders.",
    ingredients: "Purified Water, Shea Butter, Cocoa Butter, Coffee extract, Squalane.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
