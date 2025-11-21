"use client";
import { products } from "@/data/products";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Trash } from "lucide-react";
import QuotePDF from "@/components/quote/QuotePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { formatBs } from "@/lib/utils";
import { toast } from "sonner";

const clientSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre es demasiado corto")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, "El nombre solo debe contener letras"),
  phone: z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),
  email: z.string().email("Correo inválido"),
});

export default function QuotePage() {
  const [client, setClient] = useState({ name: "", phone: "", email: "" });
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState<{ id: string; name: string; qty: number; price: number }[]>([]);

  const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const phoneError =
    client.phone.length > 0 && client.phone.length < 7
      ? "El teléfono debe tener al menos 7 dígitos"
      : ""
  
  const emailError =
    client.email.length > 0 && !clientSchema.shape.email.safeParse(client.email).success
      ? "Correo inválido"
      : ""

  const selected = useMemo(() => products.find((p) => p.id === selectedId), [selectedId]);

  // Función para agregar producto con validación de stock
  const addItem = () => {
    if (!selected) return;

    const existing = items.find((i) => i.id === selected.id);
    const totalQty = (existing?.qty ?? 0) + qty;

    if (totalQty > selected.stock) {
      toast.error(`No puedes agregar más de ${selected.stock} unidades de ${selected.name}`);
      return;
    }

    if (existing) {
      setItems(items.map((i) => i.id === selected.id ? { ...i, qty: i.qty + qty } : i));
    } else {
      setItems([...items, { id: selected.id, name: selected.name, qty, price: selected.price }]);
    }

    setQty(1);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const validClient = clientSchema.safeParse(client).success;
  const canDownload = validClient && items.length > 0;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Cotización</h1>

      <div className="mt-6 grid md:grid-cols-2 gap-6">

        {/* ------------------ Selección de productos ------------------ */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Selecciona productos</h2>

          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger aria-label="Producto" className="w-full">
              <SelectValue placeholder="Producto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} - {formatBs(p.price)} - Stock: {p.stock}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-3">
            <span className="text-sm">Cantidad :</span>

            <Input
              type="number"
              min={1}
              max={selected?.stock ?? 1}
              value={qty}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!value || value < 1) setQty(1);
                else if (value > (selected?.stock ?? 1)) setQty(selected?.stock ?? 1);
                else setQty(value);
              }}
              className="w-28"
            />

            <Button onClick={addItem}>Agregar</Button>
          </div>

          {/* Tabla de productos agregados */}
          <div className="mt-4 border bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 py-2 px-3 font-semibold text-sm">
              <span>Producto</span>
              <span className="text-center">Cantidad</span>
              <span className="text-right">Subtotal</span>
              <span className="text-right">Acción</span>
            </div>

            {items.length > 0 ? (
              items.map((i) => (
                <div key={i.id} className="grid grid-cols-4 items-center py-2 px-3 border-t text-sm">
                  <span>{i.name}</span>
                  <span className="text-center">{i.qty}</span>
                  <span className="text-right">{formatBs(i.price * i.qty)}</span>

                  <button
                    onClick={() => removeItem(i.id)}
                    className="text-red-500 hover:text-red-700 ml-auto"
                    title="Quitar producto"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm text-gray-500">
                Aún no hay productos agregados a la cotización
              </div>
            )}
          </div>
        </div>

        {/* ------------------ Datos del cliente ------------------ */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Datos del cliente</h2>

         <div className="space-y-1">
            <Input
              placeholder="Nombre"
              value={client.name}
              onChange={(e) => {
                const onlyText = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, "")
                setClient({ ...client, name: toTitleCase(onlyText) })
              }}
            />
  
            {!clientSchema.shape.name.safeParse(client.name).success && client.name.length > 0 && (
              <p className="text-red-500 text-sm">El nombre solo debe contener letras</p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Teléfono"
              value={client.phone}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "")
                setClient({ ...client, phone: onlyNumbers })
              }}
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Email"
              value={client.email}
              onChange={(e) => setClient({ ...client, email: e.target.value })}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          {canDownload ? (
            <PDFDownloadLink
              document={<QuotePDF client={client} items={items} />}
              fileName={(() => {

                const now = new Date();
                const formatted = now.toLocaleString("es-BO", {
                  timeZone: "America/La_Paz",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })

                const [datePart, timePart] = formatted.split(", ");
                const [day, month, year] = datePart.split("/");
                const [hour, minute, second] = timePart.split(":");

                const clientName = client.name.trim().replace(/\s+/g, "_");

                return `cotizacion_${clientName}_${day}-${month}-${year}-${hour}${minute}${second}.pdf`;
              })()}
            >
              <Button
                onClick={() =>
                  toast.success("Cotización lista", { description: "Generando PDF..." })
                }
              >
                Generar Cotización en PDF
              </Button>
            </PDFDownloadLink>
          ) : (
            <Button onClick={() => toast.error("Completa la cotización", { description: "Añade productos y datos del cliente" })}>
              Generar Cotización en PDF
            </Button>
          )}
        </div>

      </div>
    </main>
  );
}
