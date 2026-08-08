import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getProduct, products } from "@/lib/products";
import { useState } from "react";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Muthonies Little World` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Muthonies Little World` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Product — Muthonies Little World" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("250ml");
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div>
      <SiteHeader variant="solid" />
      <div className="pt-24" />

      <nav className="mx-auto max-w-[1400px] px-6 py-6 text-xs opacity-60 md:px-12">
        <Link to="/">Home</Link> <span className="mx-2">/</span>
        <Link to="/shop">Shop</Link> <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="bg-secondary">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center py-8">
            <span className="eyebrow">Signature Oil</span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">{product.name}</h1>
            <p className="mt-2 font-script text-3xl" style={{ color: "var(--maroon)" }}>{product.tagline}</p>

            <div className="my-8 h-px bg-border" />

            <p className="leading-relaxed opacity-80">{product.description}</p>

            <div className="mt-8">
              <p className="eyebrow" style={{ color: "var(--ink)", opacity: 0.5 }}>Notes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.notes.map((n: string) => (
                  <span key={n} className="border border-border px-3 py-1 text-xs">{n}</span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="eyebrow" style={{ color: "var(--ink)", opacity: 0.5 }}>Size</p>
              <div className="mt-3 flex gap-3">
                {["30ml", "50ml", "100ml"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="px-4 py-2 text-xs tracking-widest-x uppercase transition-colors"
                    style={{
                      border: `1px solid ${size === s ? "var(--maroon)" : "var(--border)"}`,
                      color: size === s ? "var(--maroon)" : "var(--ink)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-y border-border py-4">
              <span className="font-display text-3xl">{product.price}</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-lg">−</button>
                <span className="w-6 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-lg">+</button>
              </div>
            </div>

            <button className="btn-primary mt-8">
              <span>Add to Bag</span>
            </button>

            <div className="mt-10 space-y-4 text-sm">
              <details className="border-b border-border pb-4">
                <summary className="cursor-pointer eyebrow" style={{ color: "var(--ink)" }}>Ingredients</summary>
                <p className="mt-3 opacity-70">{product.ingredients}</p>
              </details>
              <details className="border-b border-border pb-4">
                <summary className="cursor-pointer eyebrow" style={{ color: "var(--ink)" }}>How to Use</summary>
                <p className="mt-3 opacity-70">
                  Warm three drops between your palms. Press onto damp skin after bathing, from
                  shoulders to feet. Breathe.
                </p>
              </details>
              <details className="border-b border-border pb-4">
                <summary className="cursor-pointer eyebrow" style={{ color: "var(--ink)" }}>Shipping & Returns</summary>
                <p className="mt-3 opacity-70">
                  Free shipping within Kenya on orders above KSh 5,000. International: 5–8 business days.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="eyebrow">You Might Also Love</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">More from the collection</h2>
            </div>
            <Link to="/shop" className="eyebrow hidden md:inline" style={{ color: "var(--maroon)" }}>
              View All →
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
                <p className="mt-1 font-script text-lg" style={{ color: "var(--maroon)" }}>{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
