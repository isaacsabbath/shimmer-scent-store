import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/mlw-logo.jpeg.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = variant === "solid" || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isSolid
          ? "bg-cream/95 backdrop-blur border-b border-border py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <nav className="hidden flex-1 items-center gap-10 md:flex">
          {nav.slice(0, 2).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`eyebrow transition-opacity hover:opacity-60 ${
                isSolid ? "text-ink" : "text-cream"
              }`}
              style={{ color: isSolid ? "var(--ink)" : "var(--cream)" }}
              activeProps={{ style: { color: "var(--maroon)" } }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="flex-shrink-0">
          <img
            src={logo.url}
            alt="Muthonies Little World"
            className={`transition-all duration-500 ${isSolid ? "h-14" : "h-20"} w-auto`}
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-10 md:flex">
          {nav.slice(2).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="eyebrow transition-opacity hover:opacity-60"
              style={{ color: isSolid ? "var(--ink)" : "var(--cream)" }}
              activeProps={{ style: { color: "var(--maroon)" } }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/shop"
            className="eyebrow"
            style={{ color: isSolid ? "var(--maroon)" : "var(--cream)" }}
          >
            Bag (0)
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          style={{ color: isSolid ? "var(--ink)" : "var(--cream)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M3 7h18" />
                <path d="M3 12h18" />
                <path d="M3 17h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream md:hidden">
          <div className="flex flex-col px-6 py-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="eyebrow py-3"
                style={{ color: "var(--ink)" }}
                activeProps={{ style: { color: "var(--maroon)" } }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
