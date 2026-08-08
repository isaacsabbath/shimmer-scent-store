import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import heroImg from "@/assets/hero-butters.jpg";
import lifestyle from "@/assets/lifestyle-glow.jpg";
import botanicals from "@/assets/story-botanicals.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muthonies Little World — Whipped Body Butters" },
      {
        name: "description",
        content:
          "Small-batch whipped body butters, hand-blended in Nairobi. A ritual of glow — Sakura, Minty Bliss, Sweet Orange, Mocha Harmony.",
      },
      { property: "og:title", content: "Muthonies Little World — Whipped Body Butters" },
      {
        property: "og:description",
        content: "Small-batch whipped body butters, hand-blended in Nairobi.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Muthonies Little World body oils"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,10,8,0.35), rgba(20,10,8,0.55))" }} />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center" style={{ color: "var(--cream)" }}>
          <span className="eyebrow" style={{ color: "var(--cream)", opacity: 0.85 }}>
            <span className="rule-thin mr-4 opacity-60" />
            Handcrafted in Nairobi
            <span className="rule-thin ml-4 opacity-60" />
          </span>
          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]">
            A little world of
            <br />
            <span className="font-script text-6xl md:text-8xl lg:text-9xl" style={{ color: "#e8b0a8" }}>
              whipped
            </span>
            <br />
            body butters.
          </h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed opacity-85">
            Slow-whipped in small batches. Raw shea, mango butter, cold-pressed oils, and the ritual of glow.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/shop" className="btn-primary">
              <span>Shop the Collection</span>
            </Link>
            <Link to="/about" className="btn-outline" style={{ color: "var(--cream)" }}>
              <span>Our Story</span>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest-x" style={{ color: "var(--cream)", opacity: 0.7 }}>
          SCROLL
        </div>
      </section>

      {/* WELCOME STRIP */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <span className="eyebrow">Welcome</span>
        <p className="mt-8 font-display text-3xl leading-relaxed italic md:text-5xl md:leading-[1.25]">
          "For the woman who moves through her days like a ritual —
          <span className="font-script not-italic" style={{ color: "var(--maroon)" }}> unhurried, radiant, </span>
          rooted in her own softness."
        </p>
        <p className="mt-8 eyebrow" style={{ color: "var(--ink)", opacity: 0.5 }}>— Muthoni, Founder</p>
      </section>

      {/* SIGNATURE COLLECTION */}
      <section className="bg-cream px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="eyebrow">The Collection</span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Four signature butters</h2>
            <p className="mt-6 max-w-xl text-sm opacity-70">
              Each whip a mood — a botanical, a season, a memory scooped into a jar.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <span className="eyebrow" style={{ opacity: 0.5 }}>N°0{i + 1}</span>
                  <span className="text-xs opacity-60">{p.price}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                <p className="mt-1 font-script text-xl" style={{ color: "var(--maroon)" }}>{p.tagline}</p>
              </Link>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/shop" className="btn-outline" style={{ color: "var(--maroon)" }}>
              <span>View All Butters</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STORY SPLIT */}
      <section className="grid md:grid-cols-2">
        <div className="order-2 flex items-center justify-center px-6 py-24 md:order-1 md:px-16 md:py-32">
          <div className="max-w-lg">
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              A little world,
              <br />
              <span className="font-script" style={{ color: "var(--maroon)" }}>slowly made.</span>
            </h2>
            <p className="mt-8 leading-relaxed opacity-80">
              Muthonies Little World began on a kitchen table in Nairobi, with three amber bottles and a
              question: what if care could feel like a small ceremony? Every oil is still blended by hand,
              in batches of forty, poured under the same warm light.
            </p>
            <p className="mt-4 leading-relaxed opacity-80">
              We source from women-led farms across East Africa and Morocco — argan from the Souss valley,
              rose from the Rift, jasmine from Lamu.
            </p>
            <Link to="/about" className="btn-outline mt-10" style={{ color: "var(--maroon)" }}>
              <span>Read More</span>
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img src={botanicals} alt="Botanical ingredients" loading="lazy" className="h-full min-h-[500px] w-full object-cover" />
        </div>
      </section>

      {/* RITUAL BAND */}
      <section
        className="relative overflow-hidden py-32 text-center"
        style={{ backgroundColor: "var(--maroon)", color: "var(--cream)" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <span className="eyebrow" style={{ color: "var(--cream)", opacity: 0.8 }}>The Ritual</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl">
            Warm three drops between your palms.
          </h2>
          <p className="mt-6 font-script text-3xl md:text-4xl">Press. Breathe. Belong to yourself.</p>
        </div>
      </section>

      {/* LIFESTYLE FEATURE */}
      <section className="grid md:grid-cols-2">
        <div>
          <img src={lifestyle} alt="Applying body oil" loading="lazy" className="h-full min-h-[600px] w-full object-cover" />
        </div>
        <div className="flex items-center justify-center px-6 py-24 md:px-16 md:py-32">
          <div className="max-w-lg">
            <span className="eyebrow">Made With Care</span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.1]">
              Cold-pressed. Never diluted. Always with intention.
            </h2>
            <ul className="mt-10 space-y-6">
              {[
                ["01", "Wild-harvested botanicals", "From women-led cooperatives across East Africa and Morocco."],
                ["02", "Small batches of forty", "Blended by hand, poured by hand, labeled by hand."],
                ["03", "Amber apothecary glass", "To protect the oils from light — refillable and returnable."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-6 border-b border-border pb-6">
                  <span className="font-display text-3xl italic" style={{ color: "var(--maroon)" }}>{n}</span>
                  <div>
                    <h3 className="font-display text-xl">{t}</h3>
                    <p className="mt-1 text-sm opacity-70">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-6 py-24 text-center md:py-32">
        <div className="mx-auto max-w-2xl">
          <span className="eyebrow">Letters From The Studio</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">
            Join our <span className="font-script" style={{ color: "var(--maroon)" }}>little world.</span>
          </h2>
          <p className="mt-6 opacity-70">
            New drops, rituals, and quiet notes — sent once a month, never more.
          </p>
          <form className="mx-auto mt-10 flex max-w-md items-center border-b border-ink pb-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-transparent px-2 py-2 text-sm outline-none"
            />
            <button type="button" className="eyebrow" style={{ color: "var(--maroon)" }}>Subscribe →</button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
