"use client"
import { useState, useEffect } from "react"
import { Menu, Phone, X, Home, ShoppingBag, FileText, Users, Mail } from "lucide-react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/layout/ThemeToggle"
import { dataEmpresa } from "@/lib/constants/dataEmpresa"
import { cn } from "@/lib/utils"

export default function Header() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { href: "/", label: "Inicio", icon: Home },
        { href: "/productos", label: "Productos", icon: ShoppingBag },
        { href: "/sobre-nosotros", label: "Nosotros", icon: Users },
        { href: "/contacto", label: "Contacto", icon: Mail },
    ]

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 border-b",
                scrolled
                    ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm py-2"
                    : "bg-background/50 backdrop-blur-sm py-4 border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="/"
                    aria-label="Inicio"
                    className="relative z-10 flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <img
                        src={dataEmpresa.basics.logoWeb}
                        alt={dataEmpresa.basics.name}
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-1">
                            {navLinks.map((link) => (
                                <NavigationMenuItem key={link.href}>
                                    <NavigationMenuLink asChild>
                                        <a
                                            href={link.href}
                                            className={cn(
                                                "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                            )}
                                        >
                                            {link.label}
                                        </a>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm" className="hidden lg:flex gap-2">
                            <a
                                href={`https://wa.me/${dataEmpresa.contact.phone.replace(/[^\d]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Phone className="w-4 h-4" />
                                <span className="text-xs">{dataEmpresa.contact.phone}</span>
                            </a>
                        </Button>

                        <Button asChild size="sm" className="shadow-sm">
                            <a href="/cotizacion">
                                <FileText className="w-4 h-4 mr-2" />
                                Cotizar
                            </a>
                        </Button>
                    </div>

                    <ThemeToggle />

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-80 p-0 border-l">
                            <SheetHeader className="p-6 border-b bg-muted/30">
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <img
                                        src={dataEmpresa.basics.logoWeb}
                                        alt="Logo"
                                        className="h-8 w-auto"
                                    />
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col h-full">
                                <div className="flex-1 overflow-y-auto py-6 px-4">
                                    <nav className="grid gap-2">
                                        {navLinks.map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-4 px-4 py-3 text-lg font-medium rounded-xl hover:bg-accent transition-colors"
                                            >
                                                <div className="p-2 rounded-full bg-primary/10 text-primary">
                                                    <link.icon className="w-5 h-5" />
                                                </div>
                                                {link.label}
                                            </a>
                                        ))}
                                        <a
                                            href="/cotizacion"
                                            onClick={() => setOpen(false)}
                                            className="flex items-center gap-4 px-4 py-3 text-lg font-medium rounded-xl hover:bg-accent transition-colors"
                                        >
                                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            Cotización
                                        </a>
                                    </nav>
                                </div>

                                <div className="p-6 border-t bg-muted/30 mt-auto">
                                    <Button asChild className="w-full h-12 text-lg mb-4" size="lg">
                                        <a
                                            href={`https://wa.me/${dataEmpresa.contact.phone.replace(/[^\d]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <Phone className="w-5 h-5" /> WhatsApp
                                        </a>
                                    </Button>
                                    <p className="text-center text-xs text-muted-foreground">
                                        © {new Date().getFullYear()} {dataEmpresa.basics.name}
                                    </p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
