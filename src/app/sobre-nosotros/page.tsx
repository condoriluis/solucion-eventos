import type { Metadata } from "next";
import Team from "./Team";
import { Target, Eye, Heart, History, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Solución Eventos",
  description: "Conoce nuestra historia, misión y el equipo detrás de tus mejores eventos."
};

const features = [
  {
    t: "Misión",
    d: "Brindar soluciones de alquiler y montaje confiables y elegantes, superando las expectativas de nuestros clientes en cada evento.",
    icon: Target
  },
  {
    t: "Visión",
    d: "Ser la empresa referente en calidad y servicio en la industria de eventos a nivel nacional, innovando constantemente.",
    icon: Eye
  },
  {
    t: "Valores",
    d: "Compromiso inquebrantable, honestidad transparente, búsqueda de la excelencia y cercanía con cada cliente.",
    icon: Heart
  },
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
    n: "Equipo Logístico",
    r: "Ejecución y Transporte",
    img: "https://res.cloudinary.com/dpyrrgou3/image/upload/v1763596633/b081c6780b3725_v3vmfs.png",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Creamos Experiencias <span className="text-primary">Memorables</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Más que alquiler de equipos, somos tus aliados estratégicos para transformar cualquier espacio en el escenario perfecto.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 space-y-24">

        {/* Misión / Visión / Valores Cards */}
        <section className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.t}
              className="bg-card rounded-2xl border p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl mb-4">{f.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </section>

        {/* Nuestra Historia */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <History className="w-4 h-4" /> Nuestra Trayectoria
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Una historia de pasión por los detalles</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Nacimos con el propósito de elevar el estándar en la industria de eventos. Lo que comenzó como un pequeño emprendimiento familiar, hoy se ha convertido en una referencia de calidad y cumplimiento.
              </p>
              <p>
                Con años de experiencia en el sector, hemos aprendido que el éxito de un evento no solo depende de los equipos, sino de la tranquilidad que brindamos a nuestros clientes a través de un servicio puntual y profesional.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-3" />
            <img
              src="https://res.cloudinary.com/dpyrrgou3/image/upload/v1763588019/6e0f90130562d8_iporle.jpg"
              alt="Nuestra Historia"
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-video transform -rotate-3 transition-transform hover:rotate-0 duration-500"
            />
          </div>
        </section>

        {/* Equipo */}
        <section className="text-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="w-4 h-4" /> Talento Humano
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conoce a nuestro equipo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profesionales dedicados que trabajan incansablemente detrás de escena para asegurar que todo salga perfecto.
            </p>
          </div>
          <Team members={teamMembers} />
        </section>

      </main>
    </div>
  );
}
