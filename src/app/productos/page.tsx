"use client"
import { products } from "@/data/products"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product/card"
import { motion, AnimatePresence } from "framer-motion"
import { Search, PackageX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = ["todos", "carpas", "mesas", "sillas", "manteles", "equipos"] as const

export default function ProductosPage() {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState<(typeof categories)[number]>("todos")

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.stock > 0)
      .filter((p) => {
        const byCat = cat === "todos" ? true : p.category === cat
        const byText = q ? (p.name + p.description).toLowerCase().includes(q.toLowerCase()) : true
        return byCat && byText
      })
  }, [q, cat])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Section */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Productos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explora nuestro catálogo de mobiliario y equipos de alta calidad para hacer de tu evento una experiencia inolvidable.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Controls Section */}
        <div className="bg-card rounded-xl shadow-lg border p-4 md:p-6 mb-10 space-y-6">

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              className="pl-12 h-12 text-lg bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20 transition-all"
              placeholder="¿Qué estás buscando? (ej. Carpa 3x3)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Category Filters (Pills) */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize border",
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard p={p as any} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <PackageX className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Intenta ajustar tu búsqueda o cambiar los filtros de categoría.
              </p>
              <Button variant="outline" onClick={() => { setQ(""); setCat("todos"); }}>
                Limpiar filtros
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}