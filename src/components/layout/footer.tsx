import Link from "next/link";
import { dataEmpresa } from "@/lib/constants/dataEmpresa";
import { iconsWeb } from "./iconsWeb";

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
    <footer className="border-t border-border bg-background mt-14 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-3">

        <div>
          <p className="text-xl font-semibold tracking-tight">
            {dataEmpresa.basics.name}
          </p>

          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {dataEmpresa.basics.description}
          </p>

          <div className="flex gap-4 mt-5">
            {redes.map((r) => (
              <a
                key={r.network}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10 flex items-center justify-center rounded-full border border-border
                  hover:bg-primary hover:text-primary-foreground
                  dark:hover:bg-primary dark:hover:text-primary-foreground
                  transition-colors shadow-sm
                "
              >
                {r.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3 text-lg">Contacto</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Teléfono:</span> {dataEmpresa.contact.phone}
            </li>

            <li>
              <span className="font-medium text-foreground">Email:</span> {dataEmpresa.contact.email}
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3 text-lg">Enlaces</p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li><Link href="/productos" className="hover:text-primary transition-colors">Productos</Link></li>
            <li><Link href="/cotizacion" className="hover:text-primary transition-colors">Cotización</Link></li>
            <li><Link href="/sobre-nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-muted-foreground pb-8">
        © {new Date().getFullYear()} {dataEmpresa.basics.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
