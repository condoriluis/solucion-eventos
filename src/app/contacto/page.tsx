"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Phone, Mail, User, MapPin, Building2 } from "lucide-react";
import { toast } from "sonner";
import { dataEmpresa } from "@/lib/constants/dataEmpresa";

const schema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.union([z.string().min(7), z.literal("")]),
  mensaje: z.string().min(5),
});

export default function ContactPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const valid = useMemo(() => schema.safeParse(form).success, [form]);
  const number = dataEmpresa.contact.phone.replace(/[^\d]/g, "");

  const text = useMemo(() => {
    const lines = [
      `📩 *Contacto - ${dataEmpresa.basics.name}*`,
      `*Nombre:* ${form.nombre}`,
      `*Email:* ${form.email}`,
      form.telefono ? `*Teléfono:* +591 ${form.telefono}` : undefined,
      `*Mensaje:* ${form.mensaje}`,
      "\n🟢 Enviado desde la web",
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  }, [form]);

  const href = `https://wa.me/${number}?text=${text}`;

  /** -----------------------------------------
   *  VALIDACIÓN PARA BOTÓN ENVIAR
   * ----------------------------------------- */
  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!valid) {
      e.preventDefault();
      toast.error("Completa los campos obligatorios", {
        description: "No puedes enviar el mensaje sin completar los campos.",
      });
    } else {
      toast.success("Mensaje listo, abriendo WhatsApp");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-12">
      {/* FORMULARIO */}
      <section className="space-y-6 backdrop-blur-lg p-8 rounded-2xl shadow-lg border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contáctanos</h1>
          <p className="text-muted-foreground mt-1">
            Te responderemos lo antes posible.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            placeholder="Teléfono (opcional)"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />

          <Textarea
            placeholder="Mensaje"
            className="h-28"
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          />
        </div>

        <div className="flex gap-3">
          <Button asChild>
            <a
              href={valid ? href : "#"}
              onClick={handleSubmit}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
             Enviar
            </a>
          </Button>
        </div>
      </section>

      {/* INFO Y MAPA */}
      <section className="space-y-6">
        <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Información</h2>

          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-center gap-3">
              <User className="size-5 text-primary" />
              <span>{dataEmpresa.basics.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="size-5 text-primary" />
              <span>{dataEmpresa.contact.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="size-5 text-primary" />
              <span>{dataEmpresa.contact.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-primary" />
              <span>{dataEmpresa.location.address}</span>
            </div>

            <div className="flex items-center gap-3">
              <Building2 className="size-5 text-primary" />
              <span>{dataEmpresa.basics.description}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border h-64">
          <iframe
            src={dataEmpresa.contact.mapUrl}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
