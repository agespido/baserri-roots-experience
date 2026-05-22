import { Link } from "@tanstack/react-router";
import { useState } from "react";

// Top navigation shared across all pages
export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/experiencias", label: "Experiencias" },
    { to: "/productor", label: "Soy productor" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-lg">🌿</span>
          </div>
          <div className="leading-tight">
            <p className="font-serif text-lg font-semibold text-foreground">Baserri</p>
            <p className="-mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Experience · Bizkaia
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/productor"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Acceso productor
          </Link>
        </nav>

        <button
          className="md:hidden"
          aria-label="Abrir menú"
          onClick={() => setOpen(!open)}
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-serif text-base text-foreground">
            Baserri Experience · Conecta con la raíz.
          </p>
          <p className="text-xs text-muted-foreground">
            Prototipo demostrativo · Bizkaia 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
