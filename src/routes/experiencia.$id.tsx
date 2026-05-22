import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar, Footer } from "../components/Navbar";
import { experiences, type Experience } from "../lib/experiences";

export const Route = createFileRoute("/experiencia/$id")({
  component: ExperienceDetail,
  loader: ({ params }) => {
    const exp = experiences.find((e) => e.id === params.id);
    if (!exp) throw notFound();
    return exp;
  },
});

function ExperienceDetail() {
  const exp = Route.useLoaderData() as Experience;
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [paid, setPaid] = useState(false);
  const [method, setMethod] = useState<"card" | "bizum">("card");

  const total = people * exp.price;

  const handlePay = () => {
    // Simulate payment processing
    setTimeout(() => setPaid(true), 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </Link>

        {/* Gallery */}
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          <img
            src={exp.gallery[0] ?? exp.image}
            alt={exp.title}
            className="h-72 w-full rounded-2xl object-cover md:col-span-2 md:h-96"
          />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {(exp.gallery.slice(1, 3).length
              ? exp.gallery.slice(1, 3)
              : [exp.image, exp.image]
            ).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-32 w-full rounded-xl object-cover md:h-[11.75rem]"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">{exp.type}</p>
            <h1 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              {exp.title}
            </h1>
            <p className="mt-2 text-muted-foreground">
              📍 {exp.location}, Bizkaia · 👤 Anfitrión: {exp.host}
            </p>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <span className="text-accent">★</span>
                <span className="font-semibold">{exp.rating}</span>
                <span className="text-muted-foreground">({exp.reviews} valoraciones)</span>
              </span>
              <span className="text-muted-foreground">·</span>
              <span>⏱ {exp.duration}</span>
            </div>

            <hr className="my-6 border-border" />

            <h2 className="font-serif text-xl text-foreground">Sobre la experiencia</h2>
            <p className="mt-2 leading-relaxed text-foreground/80">{exp.description}</p>

            <h2 className="mt-8 font-serif text-xl text-foreground">Qué incluye</h2>
            <ul className="mt-3 grid gap-2 md:grid-cols-2">
              {exp.includes.map((inc) => (
                <li
                  key={inc}
                  className="flex items-start gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                >
                  <span className="text-primary">✓</span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>

          {/* Booking widget */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
              <div className="flex items-baseline justify-between">
                <p className="font-serif text-3xl text-foreground">{exp.price}€</p>
                <span className="text-sm text-muted-foreground">por persona</span>
              </div>

              <label className="mt-5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />

              <label className="mt-4 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Personas
              </label>
              <div className="mt-1 flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <button
                  onClick={() => setPeople(Math.max(1, people - 1))}
                  className="h-7 w-7 rounded-full bg-secondary text-foreground"
                >
                  −
                </button>
                <span className="text-sm font-semibold">{people}</span>
                <button
                  onClick={() => setPeople(Math.min(10, people + 1))}
                  className="h-7 w-7 rounded-full bg-secondary text-foreground"
                >
                  +
                </button>
              </div>

              <div className="mt-5 flex justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold text-foreground">{total}€</span>
              </div>

              <button
                onClick={() => {
                  setPaid(false);
                  setShowModal(true);
                }}
                disabled={!date}
                className="mt-5 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                Reservar ahora
              </button>
              {!date && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Selecciona una fecha
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Payment modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {!paid ? (
              <>
                <h3 className="font-serif text-2xl text-foreground">Confirmar reserva</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {exp.title} · {people} pers · {date}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setMethod("card")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                      method === "card"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border"
                    }`}
                  >
                    💳 Tarjeta
                  </button>
                  <button
                    onClick={() => setMethod("bizum")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                      method === "bizum"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border"
                    }`}
                  >
                    📱 Bizum
                  </button>
                </div>

                {method === "card" ? (
                  <div className="mt-4 space-y-2">
                    <input
                      placeholder="Número de tarjeta"
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        placeholder="MM/AA"
                        className="rounded-lg border border-border px-3 py-2 text-sm"
                      />
                      <input
                        placeholder="CVC"
                        className="rounded-lg border border-border px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <input
                      placeholder="Teléfono móvil (Bizum)"
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                    />
                  </div>
                )}

                <div className="mt-5 flex justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">Total a pagar</span>
                  <span className="font-semibold">{total}€</span>
                </div>

                <button
                  onClick={handlePay}
                  className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Pagar {total}€
                </button>
              </>
            ) : (
              <div className="py-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                  ✓
                </div>
                <h3 className="mt-4 font-serif text-2xl text-foreground">
                  ¡Reserva confirmada!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Hemos enviado los detalles al productor por WhatsApp. Recibirás un
                  email con la confirmación.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-5 w-full rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
