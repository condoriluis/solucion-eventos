"use client"
import { products } from "@/data/products"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/product/card"
import { motion } from "framer-motion"

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
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Productos</h1>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Input aria-label="Buscar" placeholder="Buscar" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={cat} onValueChange={(v) => setCat(v as any)}>
          <SelectTrigger aria-label="Categoría">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <motion.div layout className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <motion.div key={p.id} layout>
            <ProductCard p={p as any} />
          </motion.div>
        ))}
      </motion.div>
    </main>
  )
}