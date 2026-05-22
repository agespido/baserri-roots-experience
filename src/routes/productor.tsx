import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar, Footer } from "../components/Navbar";
import { upcomingBookings } from "../lib/experiences";

export const Route = createFileRoute("/productor")({
  component: ProducerPanel,
});

type Status = "pending" | "confirmed" | "cancelled";

function ProducerPanel() {
  const [statuses, setStatuses] = useState<Record<string, Status>>(
    Object.fromEntries(upcomingBookings.map((b) => [b.id, "pending" as Status])),
  );
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const updateStatus = (id: string, status: Status, name: string) => {
    setStatuses((s) => ({ ...s, [id]: status }));
    showToast(
      status === "confirmed"
        ? `✅ WhatsApp enviado a ${name}: reserva confirmada.`
        : `❌ WhatsApp enviado a ${name}: reserva cancelada.`,
    );
  };

  const confirmedCount = Object.values(statuses).filter((s) => s !== "cancelled").length;
  const visitors = upcomingBookings
    .filter((b) => statuses[b.id] !== "cancelled")
    .reduce((acc, b) => acc + b.people, 0);
  const revenue = visitors * 35;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">
              Panel del productor
            </p>
            <h1 className="mt-1 font-serif text-3xl text-foreground md:text-4xl">
              Kaixo, Mikel 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Lo justo para gestionar tu baserri. Sin complicaciones.
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            🟢 Avisos por WhatsApp activos
          </span>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Ingresos de este mes
            </p>
            <p className="mt-2 font-serif text-4xl text-foreground">{revenue}€</p>
            <p className="mt-1 text-xs text-primary">+18% vs mes anterior</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Próximos visitantes
            </p>
            <p className="mt-2 font-serif text-4xl text-foreground">{visitors}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              en {confirmedCount} reservas activas
            </p>
          </div>
        </div>

        {/* Bookings */}
        <div className="mt-10">
          <h2 className="font-serif text-2xl text-foreground">Próximas reservas</h2>
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {upcomingBookings.map((b) => {
              const status = statuses[b.id];
              return (
                <div
                  key={b.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-foreground">{b.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {b.date} · {b.time} · {b.people} personas
                    </p>
                  </div>

                  {status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(b.id, "confirmed", b.name)}
                        className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, "cancelled", b.name)}
                        className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                  {status === "confirmed" && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      ✓ Confirmada · WhatsApp enviado
                    </span>
                  )}
                  {status === "cancelled" && (
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                      ✕ Cancelada
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          ¿Prefieres no usar esta pantalla? Llámanos al 📞 944 00 00 00 y lo
          gestionamos por ti.
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-5 py-3 text-sm text-background shadow-2xl">
          {toast}
        </div>
      )}

      <Footer />
    </div>
  );
}
