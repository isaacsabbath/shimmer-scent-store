import { Link } from "@tanstack/react-router";
import logo from "@/assets/mlw-logo.jpeg.asset.json";

export function SiteFooter() {
  return (
    <footer
      className="bg-ink text-cream"
      style={{ backgroundColor: "#1a0f0d", color: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12">
        <div className="grid gap-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <img
              src={logo.url}
              alt="Muthonies Little World"
              className="h-24 w-auto mix-blend-screen opacity-95"
            />
            <p
              className="mt-6 max-w-sm font-display text-2xl leading-snug"
              style={{ color: "var(--cream)" }}
            >
              A little world of botanical body oils, crafted slowly for the ritual of glow.
            </p>
          </div>

          <div>
            <p className="eyebrow" style={{ color: "var(--maroon)" }}>
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/shop" className="hover:opacity-70">
                  The Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:opacity-70">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:opacity-70">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:opacity-70">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow" style={{ color: "var(--maroon)" }}>
              Stay Close
            </p>
            <p className="mt-5 text-sm opacity-80">
              Letters from the studio — new drops, rituals, small stories.
            </p>
            <form className="mt-5 flex items-center border-b border-cream/30 pb-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent text-sm outline-none placeholder:opacity-50"
              />
              <button type="button" className="eyebrow" style={{ color: "var(--cream)" }}>
                Join →
              </button>
            </form>
            <div className="mt-8 flex gap-4 text-xs opacity-70">
              <span>Instagram</span>
              <span>TikTok</span>
              <span>Pinterest</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-xs opacity-60 md:flex-row">
          <p>© {new Date().getFullYear()} Muthonies Little World. All rights reserved.</p>
          <p>Nairobi · Handcrafted in small batches</p>
        </div>
      </div>
    </footer>
  );
}
