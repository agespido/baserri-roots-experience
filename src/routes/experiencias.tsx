import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar, Footer } from "../components/Navbar";
import { experiences } from "../lib/experiences";

export const Route = createFileRoute("/experiencias")({
  component: ExperiencesPage,
});

function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h1 className="font-serif text-4xl text-foreground">Todas las experiencias</h1>
        <p className="mt-2 text-muted-foreground">
          Descubre actividades rurales auténticas en Bizkaia.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              to="/experiencia/$id"
              params={{ id: exp.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold">
                  {exp.price}€/pers
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-accent">{exp.type}</p>
                <h3 className="mt-2 font-serif text-lg text-foreground">{exp.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">📍 {exp.location}</p>
                <div className="mt-3 flex items-center gap-1 text-sm">
                  <span className="text-accent">★</span>
                  <span className="font-semibold">{exp.rating}</span>
                  <span className="text-muted-foreground">({exp.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
