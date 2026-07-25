import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Muthonies Little World" },
      { name: "description", content: "Browse our collection of small-batch botanical body oils." },
      { property: "og:title", content: "Shop — Muthonies Little World" },
      { property: "og:description", content: "Browse our collection of small-batch botanical body oils." },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div>
      <SiteHeader variant="solid" />
      <div className="pt-32" />

      <section className="mx-auto max-w-5xl px-6 py-16 text-center md:py-24">
        <span className="eyebrow">The Collection</span>
        <h1 className="mt-6 font-display text-5xl md:text-7xl">
          Every oil is a <span className="font-script" style={{ color: "var(--maroon)" }}>mood.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl opacity-70">
          Four signature blends, each pressed from wild-harvested botanicals and poured by hand in
          batches of forty.
        </p>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between border-y border-border py-4">
            <span className="text-xs opacity-60">{products.length} products</span>
            <div className="flex gap-6 text-xs">
              <button className="eyebrow" style={{ color: "var(--maroon)" }}>All</button>
              <button className="eyebrow opacity-50">Floral</button>
              <button className="eyebrow opacity-50">Warm</button>
              <button className="eyebrow opacity-50">Nourishing</button>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={p.image}
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
                    <p className="mt-1 font-script text-xl" style={{ color: "var(--maroon)" }}>{p.tagline}</p>
                  </div>
                  <span className="text-sm opacity-70">{p.price}</span>
                </div>
                <p className="mt-3 text-xs opacity-60">{p.notes.join(" · ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
