import { notFound } from "next/navigation"
import { products } from "@/data/products"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatBs } from "@/lib/utils"
import ProductGallery from "@/components/layout/ProductGallery";

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

export default async function ProductDetail({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p: Product | undefined = products.find((x) => x.slug === slug)
  if (!p || p.stock <= 0) return notFound()

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          <ProductGallery images={p.images} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold">{p.name}</h1>
            <Badge variant="outline" className="capitalize">{p.category}</Badge>
          </div>
          <p className="mt-3 text-muted-foreground">{p.description}</p>
          <p className="mt-3 text-xl font-semibold">{formatBs(p.price)} / día</p>
          <p className="mt-1 text-sm text-muted-foreground">Stock: {p.stock}</p>
          <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
            {p.features?.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/cotizacion">Solicitar cotización</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/productos">Volver a productos</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}