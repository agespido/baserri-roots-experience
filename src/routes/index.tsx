import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar, Footer } from "../components/Navbar";
import { experiences } from "../lib/experiences";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Baserri Experience — Agroturismo auténtico en Bizkaia" },
      {
        name: "description",
        content:
          "Marketplace de experiencias rurales en Bizkaia: talleres de queso, catas de txakoli, apicultura y más con productores locales.",
      },
    ],
  }),
});

function HomePage() {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("");

  // Filter experiences by simple text/zone match
  const filtered = experiences.filter((e) => {
    const matchesQ =
      !query ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.type.toLowerCase().includes(query.toLowerCase());
    const matchesZ = !zone || e.zone === zone;
    return matchesQ && matchesZ;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/80 via-white/60 to-background" />

        <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-black/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground backdrop-blur">
              Agroturismo · Bizkaia
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-foreground md:text-6xl">
              Conecta con la raíz. Vive experiencias rurales auténticas en Bizkaia.
            </h1>
            <p className="mt-2 font-serif text-lg italic text-foreground/90 md:text-xl">
              Tradizioaren etorkizuna
            </p>
            <p className="mt-4 max-w-xl text-base text-foreground/80 md:text-lg">
              Talleres, catas y vivencias junto a productores locales. Pásalo en
              familia, en pareja o con amigos.
            </p>

            {/* Search bar */}
            <form
              className="mt-8 grid gap-2 rounded-2xl bg-card p-3 shadow-2xl md:grid-cols-[1fr_1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                document
                  .getElementById("experiencias")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
                <span>🔍</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tipo de actividad (queso, txakoli...)"
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
                <span>📍</span>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                >
                  <option value="">Cualquier zona</option>
                  <option value="Duranguesado">Duranguesado</option>
                  <option value="Costa de Bizkaia">Costa de Bizkaia</option>
                  <option value="Parque Natural">Parque Natural</option>
                </select>
              </div>
              <button
                type="submit"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FEATURED EXPERIENCES */}
      <section id="experiencias" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">
              Experiencias destacadas
            </p>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Vive Bizkaia desde dentro
            </h2>
          </div>
          <p className="hidden text-sm text-muted-foreground md:block">
            {filtered.length} experiencias disponibles
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-12 text-center text-muted-foreground">
              No hay experiencias con esos filtros.
            </p>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-accent">
              Cómo funciona
            </p>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Sencillo para ti, sencillo para el baserri
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-card p-8 shadow-sm">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Para visitantes
              </span>
              <h3 className="mt-4 font-serif text-2xl text-foreground">
                Reserva en 3 pasos
              </h3>
              <ol className="mt-6 space-y-4">
                {[
                  ["Explora", "Filtra experiencias por zona, tipo o fecha."],
                  ["Reserva", "Elige día y personas. Paga con tarjeta o Bizum."],
                  ["Disfruta", "Recibe los detalles y vive un día en el campo."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{t}</p>
                      <p className="text-sm text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-sm">
              <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                Para productores
              </span>
              <h3 className="mt-4 font-serif text-2xl text-foreground">
                100% analógico, sin apps
              </h3>
              <ol className="mt-6 space-y-4">
                {[
                  ["Nos llamas", "Te damos de alta y publicamos tu actividad."],
                  ["WhatsApp", "Recibes cada reserva con un aviso por WhatsApp."],
                  ["Solo dedicarte", "Confirmas con un clic y nos encargamos del resto."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{t}</p>
                      <p className="text-sm text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                to="/productor"
                className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
              >
                Ver panel del productor →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Card component for an experience
function ExperienceCard({ exp }: { exp: (typeof experiences)[number] }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <img
          src={exp.image}
          alt={exp.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-foreground">
          {exp.price}€/pers
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-accent">{exp.type}</p>
        <h3 className="mt-2 font-serif text-lg text-foreground">{exp.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          📍 {exp.location} · {exp.zone}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-foreground">
            <span className="text-accent">★</span>
            <span className="font-semibold">{exp.rating}</span>
            <span className="text-muted-foreground">({exp.reviews})</span>
          </div>
          <Link
            to="/experiencia/$id"
            params={{ id: exp.id }}
            className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
          >
            Ver experiencia
          </Link>
        </div>
      </div>
    </article>
  );
}
