import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatBs } from "@/lib/utils"

type Product = {
  id: string
  slug: string
  name: string
  category: string
  price: number
  description: string
  images: string[]
  stock: number
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/productos/${p.slug}`} aria-label={`Ver ${p.name}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            {p.name}
            <Badge variant="outline" className="capitalize">{p.category}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-lg overflow-hidden bg-muted h-40">
            {p.images?.[0] && (
              <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
            )}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold">{formatBs(p.price)} / día</span>
            <span className="text-xs text-muted-foreground">Stock: {p.stock}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}