"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { ArrowRight, CheckCircle2, Star, Calendar, ShieldCheck, Sparkles } from "lucide-react";

export default function HomeClient() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <main className="flex flex-col min-h-screen overflow-hidden bg-background">

            {/* ---------------- Hero Section ---------------- */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
                    <img
                        src="https://res.cloudinary.com/dpyrrgou3/image/upload/v1763588019/6e0f90130562d8_iporle.jpg"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Hero Content */}
                <div className="relative z-20 container mx-auto px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span>Experiencias Inolvidables</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                            Transformamos Espacios en <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                                Momentos Mágicos
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            Expertos en alquiler de mobiliario y estructuras para eventos de clase mundial. Calidad premium y servicio impecable.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105" asChild>
                                <a href="/productos">
                                    Explorar Catálogo <ArrowRight className="ml-2 w-5 h-5" />
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105" asChild>
                                <a href="/cotizacion">
                                    Solicitar Cotización
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50"
                >
                    <span className="text-xs uppercase tracking-widest">Descubre más</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
                </motion.div>
            </section>

            {/* ---------------- Stats / Trust Section ---------------- */}
            <section className="py-12 border-y bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Eventos Realizados", value: "+100" },
                            { label: "Años de Experiencia", value: "4+" },
                            { label: "Clientes Felices", value: "100%" },
                            { label: "Productos Premium", value: "+50" },
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <h3 className="text-4xl font-bold text-foreground">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Services Section (Bento Grid) ---------------- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Todo para tu Evento</h2>
                        <p className="text-muted-foreground text-lg">
                            Ofrecemos una solución integral con equipamiento de alta gama para garantizar el éxito de tu celebración.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                        {/* Large Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl bg-muted"
                        >
                            <img
                                src="https://mcusercontent.com/7c7389f78fa075b10d8a4618a/images/d0cd9984-f3b7-54e1-5b24-b0bdf619c722.jpg"
                                alt="Carpas de Lujo"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                                <h3 className="text-3xl font-bold mb-2">Carpas Estructurales</h3>
                                <p className="text-gray-200">Protección y elegancia para eventos al aire libre. Diferentes tamaños y configuraciones.</p>
                            </div>
                        </motion.div>

                        {/* Tall Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-1 row-span-2 relative group overflow-hidden rounded-3xl bg-muted"
                        >
                            <img
                                src="https://dbhg6mekyuoi1.cloudfront.net/images/upload/2166/card/6552485580fdd1.10715564.jpg"
                                alt="Mobiliario"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                                <h3 className="text-2xl font-bold mb-2">Mobiliario Exclusivo</h3>
                                <p className="text-gray-200 text-sm">Sillas Tiffany, mesas vintage y salas lounge.</p>
                            </div>
                        </motion.div>

                        {/* Small Card 1 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative group overflow-hidden rounded-3xl bg-primary/5 border p-8 flex flex-col justify-center items-start"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Mantelería Fina</h3>
                            <p className="text-muted-foreground text-sm">Textiles de alta calidad en variedad de colores.</p>
                        </motion.div>

                        {/* Small Card 2 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="relative group overflow-hidden rounded-3xl bg-primary/5 border p-8 flex flex-col justify-center items-start"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Asesoría Integral</h3>
                            <p className="text-muted-foreground text-sm">Te ayudamos a planificar cada detalle.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ---------------- Features / Why Us ---------------- */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                ¿Por qué elegirnos para tu gran día?
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                No solo alquilamos equipos, creamos atmósferas. Nuestro compromiso con la excelencia nos distingue en cada evento.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: ShieldCheck, title: "Garantía de Calidad", desc: "Equipos en perfecto estado y limpieza impecable." },
                                    { icon: Calendar, title: "Puntualidad Absoluta", desc: "Entrega y montaje en los tiempos acordados." },
                                    { icon: Star, title: "Atención Premium", desc: "Soporte dedicado antes, durante y después del evento." },
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-background border shadow-sm flex items-center justify-center shrink-0">
                                            <feature.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{feature.title}</h4>
                                            <p className="text-muted-foreground">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-500 rounded-[2rem] opacity-20 blur-2xl" />
                            <img
                                src="https://res.cloudinary.com/dpyrrgou3/image/upload/v1763588019/6e0f90130562d8_iporle.jpg"
                                alt="Why Us"
                                className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-square"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- Testimonials ---------------- */}
            <section className="py-24 overflow-hidden">
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
                    <p className="text-muted-foreground">La satisfacción de nuestros clientes es nuestra mejor carta de presentación.</p>
                </div>

                <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:animate-scroll-slow hover:pause pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="min-w-[85vw] sm:min-w-[350px] md:min-w-[400px] snap-center p-8 rounded-3xl bg-muted/30 border hover:border-primary/50 transition-colors"
                        >
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-lg italic mb-6 text-foreground/80">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold">{t.name}</h4>
                                    <p className="text-sm text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------------- CTA Section ---------------- */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="relative rounded-[3rem] overflow-hidden bg-primary text-primary-foreground px-6 py-20 text-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-6xl font-bold">¿Listo para crear magia?</h2>
                            <p className="text-xl md:text-2xl opacity-90">
                                Déjanos encargarnos de los detalles mientras tú disfrutas de tu evento.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full shadow-xl hover:scale-105 transition-transform" asChild>
                                    <a href="/cotizacion">
                                        Solicitar Cotización Ahora
                                    </a>
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/30 text-gray-700 hover:bg-white/10 hover:text-white" asChild>
                                    <a href="/contacto">
                                        Contáctanos
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
