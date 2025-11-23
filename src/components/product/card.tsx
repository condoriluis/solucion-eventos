import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatBs } from "@/lib/utils"
import { ArrowRight, Sparkles } from "lucide-react"

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
    <Link href={`/productos/${p.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-0 bg-card shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 rounded-2xl flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {p.images?.[0] ? (
            <Image
              src={p.images[0]}
              alt={p.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Sparkles className="w-10 h-10 opacity-20" />
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="backdrop-blur-md bg-white/80 dark:bg-black/50 hover:bg-white/90 font-medium capitalize shadow-sm">
              {p.category}
            </Badge>
          </div>

          {/* Stock Badge */}
          {p.stock <= 5 && p.stock > 0 && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive" className="shadow-sm">¡Últimas unidades!</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5 flex-grow">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
            {p.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {p.description}
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Precio por día</span>
            <span className="text-xl font-bold text-primary">{formatBs(p.price)}</span>
          </div>

          <Button size="icon" className="rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-lg">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}