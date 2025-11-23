"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Building2, Send, MessageSquare } from "lucide-react";
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

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!valid) {
      e.preventDefault();
      toast.error("Completa los campos obligatorios", {
        description: "Por favor revisa que tu nombre, email y mensaje sean válidos.",
      });
    } else {
      toast.success("¡Mensaje listo!", { description: "Abriendo WhatsApp para enviar..." });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contáctanos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte a hacer realidad tu próximo evento. Escríbenos y te responderemos a la brevedad.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-12">

        {/* Left Column: Form */}
        <section>
          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Envíanos un mensaje
              </CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo vía WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input
                  id="nombre"
                  placeholder="Ej. Juan Pérez"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    placeholder="juan@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono (Opcional)</Label>
                  <Input
                    id="telefono"
                    placeholder="Ej. 77712345"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  placeholder="Cuéntanos sobre tu evento..."
                  className="min-h-[150px] resize-none"
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                />
              </div>

              <Button asChild className="w-full h-12 text-lg" size="lg">
                <a
                  href={valid ? href : "#"}
                  onClick={handleSubmit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Enviar Mensaje
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Right Column: Info & Map */}
        <section className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-sm text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Llámanos</h3>
                <p className="text-sm text-muted-foreground">{dataEmpresa.contact.phone}</p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-sm text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Escríbenos</h3>
                <p className="text-sm text-muted-foreground">{dataEmpresa.contact.email}</p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-sm text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Visítanos</h3>
                <p className="text-sm text-muted-foreground">{dataEmpresa.location.address}</p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-sm text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Horario</h3>
                <p className="text-sm text-muted-foreground">Lun - Vie: 9:00 - 18:00</p>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden shadow-lg border-0">
            <iframe
              src={dataEmpresa.contact.mapUrl}
              className="w-full h-80"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
            />
          </Card>
        </section>

      </main>
    </div>
  );
}
