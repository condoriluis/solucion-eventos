import type { Metadata } from "next";
import Team from "./Team";

export const metadata: Metadata = { title: "Sobre Nosotros" };

const features = [
  { t: "Misión", d: "Brindar soluciones de alquiler y montaje confiables y elegantes." },
  { t: "Visión", d: "Ser referentes en calidad y servicio en eventos." },
  { t: "Valores", d: "Compromiso, honestidad, excelencia y cercanía." },
];

const teamMembers = [
  {
    n: "Luis Alberto",
    r: "Operaciones & Sistemas",
    img: "https://res.cloudinary.com/dpyrrgou3/image/upload/v1763596633/b081c6780b3725_v3vmfs.png",
  },
  {
    n: "Efraín Franz",
    r: "Montaje & Análisis",
    img: "https://res.cloudinary.com/dpyrrgou3/image/upload/v1763596633/b081c6780b3725_v3vmfs.png",
  },
  {
    n: "Equipo",
    r: "Logística",
    img: "https://res.cloudinary.com/dpyrrgou3/image/upload/v1763596633/b081c6780b3725_v3vmfs.png",
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-14 grid gap-12">
      {/* Nuestra Historia */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Nuestra Historia</h1>
        <p className="mt-3 text-muted-foreground text-lg leading-relaxed">
          Nacimos con el propósito de crear experiencias inolvidables. Con años de trabajo en eventos, brindamos alquiler y montaje profesional con enfoque humano.
        </p>
      </section>

      {/* Misión / Visión / Valores */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.t}
            className="rounded-2xl border bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <p className="font-semibold text-lg">{f.t}</p>
            <p className="mt-2 text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </section>

      {/* Equipo */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Nuestro Equipo</h2>
        <Team members={teamMembers} />
      </section>
    </main>
  );
}
