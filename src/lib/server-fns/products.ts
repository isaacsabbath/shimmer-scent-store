import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { products, productVariants } from "@/lib/db/schema";

export type VariantDTO = {
  id: number;
  size: string;
  priceCents: number;
  stockQty: number;
};

export type ProductDTO = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  ingredients: string;
  notes: string[];
  imageUrl: string;
  variants: VariantDTO[];
  // Lowest-priced variant, used for "from KSh X" display on listing cards.
  fromPriceCents: number;
};

function toDTO(
  product: typeof products.$inferSelect,
  variants: (typeof productVariants.$inferSelect)[],
): ProductDTO {
  const sorted = [...variants].sort((a, b) => a.priceCents - b.priceCents);
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    category: product.category,
    description: product.description,
    ingredients: product.ingredients,
    notes: product.notes,
    imageUrl: product.imageUrl,
    variants: sorted.map((v) => ({
      id: v.id,
      size: v.size,
      priceCents: v.priceCents,
      stockQty: v.stockQty,
    })),
    fromPriceCents: sorted[0]?.priceCents ?? 0,
  };
}

// GET /api/products — active catalog for the shop grid & homepage.
export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await db.query.products.findMany({
    where: eq(products.isActive, true),
    with: { variants: true },
    orderBy: (p, { asc }) => [asc(p.id)],
  });
  return rows.map((r) => toDTO(r, r.variants));
});

// GET /api/products/:slug — single product detail page.
export const getProductBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const row = await db.query.products.findFirst({
      where: eq(products.slug, data.slug),
      with: { variants: true },
    });
    if (!row) return null;
    return toDTO(row, row.variants);
  });
