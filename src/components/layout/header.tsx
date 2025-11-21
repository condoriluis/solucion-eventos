"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, Phone } from "lucide-react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/layout/theme-toggle"
import { dataEmpresa } from "@/lib/constants/dataEmpresa";

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Inicio"
          className="font-semibold text-xl tracking-tight flex items-center gap-2"
        >
          <img
            src={dataEmpresa.basics.logoWeb}
            alt={dataEmpresa.basics.name}
            className="w-[230px] h-[75px] md:w-[230px] md:h-[75px] object-contain"
          />

        </Link>

        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="px-3 py-2">Inicio</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/productos" className="px-3 py-2">Productos</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/cotizacion" className="px-3 py-2">Cotización</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/sobre-nosotros" className="px-3 py-2">Sobre Nosotros</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contacto" className="px-3 py-2">Contacto</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center gap-2">
          {/* Botón WhatsApp para desktop */}
          <Button asChild variant="outline" aria-label="WhatsApp" className="hidden md:flex">
            <a
              href={`https://wa.me/${dataEmpresa.contact.phone.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
          </Button>

          {/* Solo icono Phone para mobile */}
          <Button asChild variant="outline" aria-label="WhatsApp" className="flex md:hidden">
            <a
              href={`https://wa.me/${dataEmpresa.contact.phone.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Phone className="w-5 h-5" />
            </a>
          </Button>

          <ThemeToggle />
          {/* Sheet / menú mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" aria-label="Abrir navegación">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              </SheetHeader>
              <div className="grid gap-3 mt-2">
                <Link href="/" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-muted">Inicio</Link>
                <Link href="/productos" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-muted">Productos</Link>
                <Link href="/cotizacion" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-muted">Cotización</Link>
                <Link href="/sobre-nosotros" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-muted">Sobre Nosotros</Link>
                <Link href="/contacto" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-muted">Contacto</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}