import { notFound } from "next/navigation"
import { products } from "@/data/products"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatBs } from "@/lib/utils"
import ProductGallery from "@/components/layout/ProductGallery"
import ProductCard from "@/components/product/card"
import { ChevronRight, Home, Check, ShieldCheck, Truck, CreditCard } from "lucide-react"
import { dataEmpresa } from "@/lib/constants/dataEmpresa"

export const dynamic = "force-static";
export const dynamicParams = false;

type Product = typeof products[number]

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  const p = products.find((x) => x.slug === slug)
  if (!p) return { title: "Producto" }

  return {
    title: p.name,
    description: p.description,
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p: Product | undefined = products.find((x) => x.slug === slug)

  if (!p || p.stock <= 0) return notFound()

  // Find related products (same category, excluding current)
  const relatedProducts = products
    .filter((x) => x.category === p.category && x.id !== p.id && x.stock > 0)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" /> Inicio
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/productos" className="hover:text-primary transition-colors">
            Productos
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{p.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Gallery */}
          <div className="space-y-4">
            <ProductGallery images={p.images} />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Garantía de Calidad</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Entrega Segura</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Pago Flexible</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 text-sm px-3 py-1 capitalize">
                {p.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {p.name}
              </h1>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-primary">{formatBs(p.price)}</span>
                <span className="text-muted-foreground">/ día</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <h3 className="font-semibold text-foreground">Características:</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {p.features?.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-4 p-6 bg-muted/30 rounded-2xl border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Disponibilidad:</span>
                <span className="font-medium text-green-600 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                  {p.stock} unidades disponibles
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="flex-1 text-lg h-12" asChild>
                  <Link href="/cotizacion">Solicitar Cotización</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Productos Relacionados</h2>
              <Button variant="ghost" asChild>
                <Link href="/productos" className="flex items-center gap-2">
                  Ver todos <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} p={rp} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}