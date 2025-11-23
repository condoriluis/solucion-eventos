import Link from "next/link";
import { dataEmpresa } from "@/lib/constants/dataEmpresa";
import { iconsWeb } from "./iconsWeb";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  const redes = dataEmpresa.redes.map((r) => {
    let url = r.url;
    let icon = iconsWeb.facebook;

    switch (r.network.toLowerCase()) {
      case "facebook":
        icon = iconsWeb.facebook;
        break;

      case "tiktok":
        icon = iconsWeb.tiktok;
        url = `https://www.tiktok.com/@${r.url.replace(/@/g, "")}`;
        break;

      case "whatsapp":
        icon = iconsWeb.whatsapp;
        url = `https://wa.me/${r.url.replace(/[^\d]/g, "")}`;
        break;
    }

    return { ...r, icon, url };
  });

  return (
    <footer className="bg-muted/30 border-t pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">

        {/* Col 1: Brand */}
        <div className="space-y-4">
          <Link href="/" className="block w-fit">
            <img
              src={dataEmpresa.basics.logoWeb}
              alt={dataEmpresa.basics.name}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {dataEmpresa.basics.description}
          </p>
          <div className="flex gap-3 pt-2">
            {redes.map((r) => (
              <a
                key={r.network}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-background border hover:border-primary hover:text-primary transition-colors"
                aria-label={r.network}
              >
                {r.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Links */}
        <div>
          <h3 className="font-semibold text-foreground mb-6">Navegación</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/productos" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Productos
              </Link>
            </li>
            <li>
              <Link href="/cotizacion" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Cotización
              </Link>
            </li>
            <li>
              <Link href="/sobre-nosotros" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                Sobre Nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div>
          <h3 className="font-semibold text-foreground mb-6">Contacto</h3>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>{dataEmpresa.location.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>{dataEmpresa.contact.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>{dataEmpresa.contact.email}</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal / Extra */}
        <div>
          <h3 className="font-semibold text-foreground mb-6">Horario de Atención</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Lunes a Viernes</p>
            <p className="font-medium text-foreground">9:00 AM - 6:00 PM</p>
            <div className="h-px bg-border w-full my-3" />
            <p>Sábados</p>
            <p className="font-medium text-foreground">9:00 AM - 1:00 PM</p>
          </div>
        </div>

      </div>

      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {dataEmpresa.basics.name}. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Términos y Condiciones</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
