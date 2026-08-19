import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Muthonies Little World" },
      { name: "description", content: "Say hello. We'd love to hear from you." },
      { property: "og:title", content: "Contact — Muthonies Little World" },
      { property: "og:description", content: "Say hello. We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      <SiteHeader variant="solid" />
      <div className="pt-32" />

      <section className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
        <span className="eyebrow">Contact</span>
        <h1 className="mt-6 font-display text-5xl md:text-7xl">
          Say{" "}
          <span className="font-script" style={{ color: "var(--maroon)" }}>
            hello.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg opacity-70">
          For orders, gifting, wholesale, or just to chat about oils and rituals — we love a good
          letter.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-16 md:grid-cols-5">
          <form className="space-y-6 md:col-span-3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Your name" placeholder="Jane Muthoni" />
              <Field label="Your email" type="email" placeholder="jane@example.com" />
            </div>
            <Field label="Subject" placeholder="A little note about…" />
            <div>
              <label className="eyebrow" style={{ color: "var(--ink)", opacity: 0.5 }}>
                Message
              </label>
              <textarea
                rows={6}
                placeholder="Write here…"
                className="mt-3 w-full border-b border-ink bg-transparent py-2 outline-none placeholder:opacity-40 focus:border-[var(--maroon)]"
              />
            </div>
            <button type="submit" className="btn-primary">
              <span>Send Letter</span>
            </button>
          </form>

          <aside className="space-y-10 md:col-span-2 md:border-l md:border-border md:pl-12">
            <div>
              <span className="eyebrow">The Studio</span>
              <p className="mt-4 font-display text-2xl leading-snug">
                Riverside Drive
                <br />
                Nairobi, Kenya
              </p>
            </div>
            <div>
              <span className="eyebrow">Write To Us</span>
              <p className="mt-4 font-display text-2xl">hello@muthonieslittleworld.co</p>
            </div>
            <div>
              <span className="eyebrow">Studio Hours</span>
              <p className="mt-4 leading-relaxed opacity-75">
                Tuesday – Saturday
                <br />
                10:00 – 18:00 EAT
              </p>
            </div>
            <div>
              <span className="eyebrow">Wholesale</span>
              <p className="mt-4 leading-relaxed opacity-75">
                Boutiques, spas, and thoughtful shops — we'd love to work with you.
                <br />
                <span style={{ color: "var(--maroon)" }}>wholesale@muthonieslittleworld.co</span>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="eyebrow" style={{ color: "var(--ink)", opacity: 0.5 }}>
        {label}
      </label>
      <input
        {...rest}
        className="mt-3 w-full border-b border-ink bg-transparent py-2 outline-none placeholder:opacity-40 focus:border-[var(--maroon)]"
      />
    </div>
  );
}
