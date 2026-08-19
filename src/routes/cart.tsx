import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart-context";
import { formatKsh } from "@/lib/currency";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Your Bag — Muthonies Little World" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotalCents, updateQuantity, removeItem } = useCart();

  return (
    <div>
      <SiteHeader variant="solid" />
      <div className="pt-32" />

      <section className="mx-auto max-w-4xl px-6 pb-32">
        <h1 className="font-display text-5xl md:text-6xl">
          Your{" "}
          <span className="font-script" style={{ color: "var(--maroon)" }}>
            bag.
          </span>
        </h1>

        {lines.length === 0 ? (
          <div className="py-20 text-center">
            <p className="opacity-60">Your bag is empty.</p>
            <Link
              to="/shop"
              className="btn-outline mt-8 inline-flex"
              style={{ color: "var(--maroon)" }}
            >
              <span>Browse the Collection</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-12 divide-y divide-border border-t border-border">
              {lines.map((line) => (
                <div key={line.variantId} className="flex items-center gap-6 py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-secondary">
                    <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl">{line.name}</h3>
                    <p className="text-xs opacity-60">{line.size}</p>
                    <p className="mt-1 text-sm">{formatKsh(line.unitPriceCents)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
                      className="text-lg"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{line.quantity}</span>
                    <button
                      onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
                      className="text-lg"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-24 text-right text-sm">
                    {formatKsh(line.unitPriceCents * line.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(line.variantId)}
                    className="text-xs opacity-50 hover:opacity-100"
                    aria-label={`Remove ${line.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
              <span className="eyebrow" style={{ opacity: 0.6 }}>
                Subtotal
              </span>
              <span className="font-display text-3xl">{formatKsh(subtotalCents)}</span>
            </div>
            <p className="mt-2 text-xs opacity-50">Shipping and taxes calculated at checkout.</p>

            {/* Checkout wiring (Paystack) lands in the next build phase. */}
            <button className="btn-primary mt-8 w-full sm:w-auto" disabled>
              <span>Checkout — coming soon</span>
            </button>
          </>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
