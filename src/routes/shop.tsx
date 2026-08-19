import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { listProducts } from "@/lib/server-fns/products";
import { formatKsh } from "@/lib/currency";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/shop")({
  loader: async () => ({ products: await listProducts() }),
  head: () => ({
    meta: [
      { title: "Shop — Muthonies Little World" },
      {
        name: "description",
        content: "Browse our collection of small-batch whipped body butters.",
      },
      { property: "og:title", content: "Shop — Muthonies Little World" },
      {
        property: "og:description",
        content: "Browse our collection of small-batch whipped body butters.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { products } = Route.useLoaderData();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <div>
      <SiteHeader variant="solid" />
      <div className="pt-32" />

      <section className="mx-auto max-w-5xl px-6 py-16 text-center md:py-24">
        <span className="eyebrow">The Collection</span>
        <h1 className="mt-6 font-display text-5xl md:text-7xl">
          Every butter is a{" "}
          <span className="font-script" style={{ color: "var(--maroon)" }}>
            mood.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl opacity-70">
          Whipped body butters, each blended from shea, mango and coconut, and whipped by hand in
          small batches.
        </p>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between border-y border-border py-4">
            <span className="text-xs opacity-60">{filtered.length} products</span>
            <div className="flex gap-6 text-xs">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className="eyebrow transition-opacity"
                  style={{
                    color: category === c ? "var(--maroon)" : "var(--ink)",
                    opacity: category === c ? 1 : 0.5,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="py-24 text-center opacity-60">No products in this category yet.</p>
          ) : (
            <div className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Link
                  key={p.slug}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] tracking-widest-x uppercase"
                      style={{ backgroundColor: "var(--cream)", color: "var(--maroon)" }}
                    >
                      N°0{i + 1}
                    </span>
                  </div>
                  <div className="mt-6 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl">{p.name}</h3>
                      <p className="mt-1 font-script text-xl" style={{ color: "var(--maroon)" }}>
                        {p.tagline}
                      </p>
                    </div>
                    <span className="text-sm opacity-70">from {formatKsh(p.fromPriceCents)}</span>
                  </div>
                  <p className="mt-3 text-xs opacity-60">{p.notes.join(" · ")}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
