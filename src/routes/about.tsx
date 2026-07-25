import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import botanicals from "@/assets/story-botanicals.jpg";
import lifestyle from "@/assets/lifestyle-glow.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Muthonies Little World" },
      { name: "description", content: "A kitchen-table brand born in Nairobi. Small-batch botanical body oils, blended slowly by hand." },
      { property: "og:title", content: "Our Story — Muthonies Little World" },
      { property: "og:description", content: "A kitchen-table brand born in Nairobi." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <SiteHeader variant="solid" />
      <div className="pt-32" />

      <section className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
        <span className="eyebrow">Our Story</span>
        <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05]">
          Small hands.
          <br />
          <span className="font-script" style={{ color: "var(--maroon)" }}>Slow rituals.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl leading-relaxed opacity-75">
          Muthonies Little World began on a kitchen table in Nairobi, with three amber bottles and a
          quiet question — what if care could feel like a small ceremony?
        </p>
      </section>

      <section className="px-6 pb-16">
        <img src={botanicals} alt="Botanicals" className="mx-auto max-h-[70vh] w-full max-w-6xl object-cover" />
      </section>

      <section className="grid gap-16 px-6 py-24 md:grid-cols-2 md:px-12">
        <div className="max-w-lg justify-self-end">
          <span className="eyebrow">The Founder</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Meet Muthoni.</h2>
        </div>
        <div className="max-w-lg space-y-5 leading-relaxed opacity-80">
          <p>
            I grew up between my grandmother's garden in Nyeri and a bathroom shelf crowded with tiny
            bottles. Every evening she would rub coconut oil warmed with rosemary into my sister's
            hair, humming. That was my first lesson in ritual.
          </p>
          <p>
            Years later, in a rented flat in Kilimani, I started blending oils for friends. A rose
            oil for a wedding. An argan for a mother-to-be. A vanilla for a friend who needed
            comfort. The little world grew, one bottle at a time.
          </p>
          <p>
            Today, everything you receive is still made in that same slow, tender way — by four pairs
            of hands, in batches of forty, poured under the same warm light.
          </p>
        </div>
      </section>

      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: "var(--maroon)", color: "var(--cream)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="eyebrow" style={{ color: "var(--cream)", opacity: 0.75 }}>What We Believe</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Four small promises.</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Slowly made", "Batches of forty, never more. Poured, capped, and labeled by hand."],
              ["Wildly sourced", "Direct from women-led farms in Kenya, Morocco, and Madagascar."],
              ["Naked formulas", "No fragrance, no fillers, no synthetic anything. Ever."],
              ["Kindly returned", "Refill your bottles at half price. Send them back when done."],
            ].map(([t, d], i) => (
              <div key={t}>
                <span className="font-display text-3xl italic opacity-70">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-80">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div>
          <img src={lifestyle} alt="Ritual" className="h-full min-h-[500px] w-full object-cover" />
        </div>
        <div className="flex items-center justify-center px-6 py-24 md:px-16">
          <div className="max-w-md">
            <span className="eyebrow">The Ritual</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1]">
              Bathe. Warm. Press.
              <br />
              <span className="font-script" style={{ color: "var(--maroon)" }}>Belong.</span>
            </h2>
            <p className="mt-6 leading-relaxed opacity-75">
              Our oils are best applied on damp skin, after a warm bath. Three drops between the
              palms, pressed rather than rubbed — from shoulders to feet, in slow, kind sweeps.
            </p>
            <Link to="/shop" className="btn-outline mt-8" style={{ color: "var(--maroon)" }}>
              <span>Begin Your Ritual</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
