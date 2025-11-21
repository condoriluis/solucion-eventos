"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { testimonials } from "@/data/testimonials";
import { useState, useEffect } from "react";

const heroImages = [
  "https://res.cloudinary.com/dpyrrgou3/image/upload/v1763588019/6e0f90130562d8_iporle.jpg",
  "https://mcusercontent.com/7c7389f78fa075b10d8a4618a/images/d0cd9984-f3b7-54e1-5b24-b0bdf619c722.jpg",
  "https://dbhg6mekyuoi1.cloudfront.net/images/upload/2166/card/6552485580fdd1.10715564.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  // Slider automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 space-y-32">

      {/* ---------------- Hero Premium ---------------- */}
      <section className="relative h-[550px] md:h-[650px] w-full overflow-hidden rounded-3xl shadow-2xl">
        {heroImages.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Hero ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-3xl transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* Overlay oscuro para que el texto resalte */}
        <div className="absolute inset-0 bg-black/40 rounded-3xl z-20" />

        {/* Contenido del hero centrado vertical y horizontal */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 z-30 text-white">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Creamos <span className="text-primary">momentos inolvidables</span>
          </motion.h1>
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl max-w-lg"
          >
            Alquiler de carpas, mesas, sillas, manteles y equipos con montaje profesional y atención personalizada.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Button asChild>
              <Link href="/productos">Ver Productos</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cotizacion">Solicitar Cotización</Link>
            </Button>
          </motion.div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-4 h-4 rounded-full transition-all ${
                current === idx ? "bg-primary scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>


      {/* ---------------- Servicios Premium ---------------- */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Nuestros Servicios</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { t: "Alquiler de Carpas" },
            { t: "Mesas y Sillas" },
            { t: "Mantelería" },
            { t: "Sonido e Iluminación" },
          ].map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.15)" }}
              className="rounded-3xl border p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg transition-transform duration-300"
            >
              <p className="font-semibold text-lg">{s.t}</p>
              <p className="text-sm text-muted-foreground mt-2">Montaje y asesoría incluidos.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- Testimonios Premium ---------------- */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Testimonios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -5, scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              className="rounded-3xl border p-6 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg transition-transform duration-300"
            >
              <p className="text-sm text-primary font-medium">{t.role}</p>
              <p className="mt-2 text-gray-400 italic">“{t.text}”</p>
              <p className="mt-4 font-semibold">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA Destacado ---------------- */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl p-12 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para tu evento?</h2>
        <p className="text-lg md:text-xl mb-6">Alquila todo lo que necesitas y haz de tu evento una experiencia inolvidable.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild>
            <Link href="/productos">Ver Productos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cotizacion">Solicitar Cotización</Link>
          </Button>
        </div>
      </section>

    </main>
  );
}
