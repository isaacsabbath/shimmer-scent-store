// One-time / idempotent seed script. Run with: npm run db:seed
// Populates the products & product_variants tables with the original four
// body butters that used to live in the hardcoded src/lib/products.ts file.
import "dotenv/config";
import { db } from "./client";
import { products, productVariants } from "./schema";
import { eq } from "drizzle-orm";

type SeedProduct = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  notes: string[];
  description: string;
  ingredients: string;
  imageUrl: string;
  // base price for the default 250ml size, in KSh
  basePriceKsh: number;
};

const seedProducts: SeedProduct[] = [
  {
    slug: "sakura",
    name: "Sakura",
    tagline: "The romantic",
    category: "Floral",
    notes: ["Cherry blossom", "Shea butter", "Squalane"],
    description:
      "A soft, petal-pink whip of shea and mango butter kissed with cherry blossom. Heals, moisturises and rejuvenates — light enough for everyday, tender enough for a ritual.",
    ingredients: "Shea Butter, Coconut Oil, Mango Butter, Squalane, Sakura fragrance.",
    imageUrl: "/assets/product-sakura.png",
    basePriceKsh: 2400,
  },
  {
    slug: "minty-bliss",
    name: "Minty Bliss",
    tagline: "The awakener",
    category: "Nourishing",
    notes: ["Peppermint", "Shea butter", "pH balanced"],
    description:
      "Cool, clean and reviving. Whipped shea folded with peppermint for tired legs and warm mornings — sinks in fast, leaves skin breathing.",
    ingredients: "Purified Water, Shea Butter, Coconut Oil, Peppermint Oil, Squalane.",
    imageUrl: "/assets/product-minty-bliss.png",
    basePriceKsh: 2500,
  },
  {
    slug: "sweet-orange",
    name: "Sweet Orange",
    tagline: "The sunshine",
    category: "Warm",
    notes: ["Sweet orange", "Shea butter", "Maca"],
    description:
      "Citrus-bright and buttery. A golden whip that lifts the mood while it softens elbows, knees and everything in between.",
    ingredients: "Shea Butter, Maca, Coconut Oil, Sweet Orange essential oil.",
    imageUrl: "/assets/product-sweet-orange.png",
    basePriceKsh: 2500,
  },
  {
    slug: "mocha-harmony",
    name: "Mocha Harmony",
    tagline: "The comfort",
    category: "Warm",
    notes: ["Cocoa", "Coffee", "Shea butter"],
    description:
      "A warm gourmand — cocoa and roasted coffee whipped into shea. Rich, grounding, and made for slow evenings and bare shoulders.",
    ingredients: "Purified Water, Shea Butter, Cocoa Butter, Coffee extract, Squalane.",
    imageUrl: "/assets/product-mocha-harmony.png",
    basePriceKsh: 2600,
  },
];

// Size multipliers relative to the 250ml base price, and starting stock.
const sizes: { size: string; multiplier: number; stockQty: number }[] = [
  { size: "100ml", multiplier: 0.55, stockQty: 40 },
  { size: "250ml", multiplier: 1, stockQty: 30 },
  { size: "500ml", multiplier: 1.8, stockQty: 15 },
];

async function seed() {
  console.log("Seeding products...");

  for (const p of seedProducts) {
    const existing = await db.query.products.findFirst({
      where: eq(products.slug, p.slug),
    });

    const [product] = existing
      ? [existing]
      : await db
          .insert(products)
          .values({
            slug: p.slug,
            name: p.name,
            tagline: p.tagline,
            category: p.category,
            description: p.description,
            ingredients: p.ingredients,
            notes: p.notes,
            imageUrl: p.imageUrl,
          })
          .returning();

    for (const s of sizes) {
      const sku = `${p.slug}-${s.size}`.toUpperCase();
      const existingVariant = await db.query.productVariants.findFirst({
        where: eq(productVariants.sku, sku),
      });
      if (existingVariant) continue;

      const priceCents = Math.round(p.basePriceKsh * s.multiplier * 100);
      await db.insert(productVariants).values({
        productId: product.id,
        size: s.size,
        priceCents,
        stockQty: s.stockQty,
        sku,
      });
    }

    console.log(`  ✓ ${p.name}`);
  }

  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
