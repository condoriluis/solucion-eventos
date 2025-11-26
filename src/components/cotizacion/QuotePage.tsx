import { products } from "@/data/products";
import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import { Trash, Plus, FileDown, ShoppingCart, User, Phone, Mail, CreditCard } from "lucide-react";
import QuotePDF from "@/components/quote/QuotePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { formatBs } from "@/lib/utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { dataEmpresa } from "@/lib/constants/dataEmpresa";
import { Checkbox } from "@/components/ui/checkbox";

const clientSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre es demasiado corto")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, "El nombre solo debe contener letras"),
    ci: z.string().min(5, "El CI es requerido").regex(/^\d+\s*LP$/, "El CI debe terminar en 'LP' (Ej: 123456 LP)"),
    phone: z.string().min(7, "El teléfono es requerido y debe tener al menos 7 dígitos"),
    email: z.string().email("Correo inválido").optional().or(z.literal("")),
});

export default function QuotePage() {
    const [client, setClient] = useState({ name: "", phone: "", email: "", ci: "" });
    const [selectedId, setSelectedId] = useState("");
    const [qty, setQty] = useState(1);
    const [items, setItems] = useState<{ id: string; name: string; qty: number; price: number }[]>([]);
    const [isReservation, setIsReservation] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toTitleCase = (text: string) =>
        text
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());

    const nameError =
        client.name.length > 0 && client.name.length < 2
            ? "El nombre es demasiado corto"
            : "";

    const phoneError =
        client.phone.length > 0 && client.phone.length < 7
            ? "El teléfono debe tener al menos 7 dígitos"
            : "";

    const emailError =
        client.email.length > 0 && !clientSchema.shape.email.safeParse(client.email).success
            ? "Correo inválido"
            : ""

    const ciError =
        client.ci.length > 0 && !clientSchema.shape.ci.safeParse(client.ci).success
            ? "El CI debe terminar en 'LP' (Ej: 123456 LP)"
            : ""

    const selected = useMemo(() => products.find((p) => p.id === selectedId), [selectedId]);

    // Función para agregar producto con validación de stock
    const addItem = () => {
        if (!selected) return;

        const existing = items.find((i) => i.id === selected.id);
        const totalQty = (existing?.qty ?? 0) + qty;

        if (totalQty > selected.stock) {
            toast.error(`Stock insuficiente`, { description: `Solo quedan ${selected.stock} unidades de ${selected.name}` });
            return;
        }

        if (existing) {
            setItems(items.map((i) => i.id === selected.id ? { ...i, qty: i.qty + qty } : i));
        } else {
            setItems([...items, { id: selected.id, name: selected.name, qty, price: selected.price }]);
        }

        setQty(1);
        toast.success("Producto agregado");
    };

    const removeItem = (id: string) => {
        setItems(items.filter((i) => i.id !== id));
    };

    const handleWhatsApp = () => {
        if (items.length === 0) {
            toast.error("Agrega productos a la cotización");
            return;
        }

        if (!clientSchema.safeParse(client).success) {
            toast.error("Por favor completa los datos del cliente con formato válido");
            return;
        }

        const itemsList = items
            .map((i) => `- ${i.name} (${i.qty} x ${formatBs(i.price)}) = ${formatBs(i.qty * i.price)}`)
            .join("%0A");

        const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

        const message = `Hola, quisiera cotizar lo siguiente:%0A%0A*Cliente:* ${client.name}%0A*CI:* ${client.ci}%0A*Teléfono:* ${client.phone || "Sin teléfono"}%0A*Email:* ${client.email || "Sin email"}%0A%0A*Detalle:*%0A${itemsList}%0A%0A*Total Estimado:* ${formatBs(total)}%0A%0AQuedo atento a su confirmación.`;

        const whatsappUrl = `https://wa.me/${dataEmpresa.contact.phone.replace('+', '')}?text=${message}`;

        window.open(whatsappUrl, "_blank");
    };

    const validClient = clientSchema.safeParse(client).success;
    const canDownload = validClient && items.length > 0;
    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="min-h-screen bg-muted/30 pb-20">
            <div className="bg-background border-b">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold">Generador de Cotizaciones</h1>
                    <p className="text-muted-foreground mt-1">Crea y descarga tu cotización en segundos.</p>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* ------------------ Left Column: Product Selection ------------------ */}
                    <div className="lg:col-span-7 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-primary" />
                                    Agregar Productos
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label>Producto</Label>
                                        <Select value={selectedId} onValueChange={setSelectedId}>
                                            <SelectTrigger aria-label="Seleccionar producto">
                                                <SelectValue placeholder="Selecciona un producto..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((p) => (
                                                    <SelectItem key={p.id} value={p.id} disabled={p.stock === 0}>
                                                        <div className="flex justify-between w-full gap-4">
                                                            <span>{p.name}</span>
                                                            <span className="text-muted-foreground font-mono">{formatBs(p.price)}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Cantidad</Label>
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
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <Button onClick={addItem} className="w-full" disabled={!selected}>
                                            <Plus className="w-4 h-4 mr-2" /> Agregar
                                        </Button>
                                    </div>
                                </div>

                                {selected && (
                                    <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md flex justify-between">
                                        <span>Stock disponible: <strong>{selected.stock}</strong></span>
                                        <span>Precio unitario: <strong>{formatBs(selected.price)}</strong></span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Datos del Cliente
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Nombre Completo <span className="text-destructive">*</span></Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-9"
                                            placeholder="Ej. Juan Pérez"
                                            value={client.name}
                                            onChange={(e) => {
                                                const onlyText = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, "")
                                                setClient({ ...client, name: toTitleCase(onlyText) })
                                            }}
                                        />
                                    </div>
                                    {nameError && <p className="text-destructive text-xs">{nameError}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Teléfono <span className="text-destructive">*</span></Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-9"
                                            placeholder="Ej. 77712345"
                                            value={client.phone}
                                            onChange={(e) => {
                                                const onlyNumbers = e.target.value.replace(/\D/g, "")
                                                setClient({ ...client, phone: onlyNumbers })
                                            }}
                                        />
                                    </div>
                                    {phoneError && <p className="text-destructive text-xs">{phoneError}</p>}
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Cédula de Identidad <span className="text-destructive">*</span></Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                className="pl-9"
                                                placeholder="Ej. 123456 LP"
                                                value={client.ci}
                                                onChange={(e) => {
                                                    let val = e.target.value.toUpperCase();
                                                    setClient({ ...client, ci: val })
                                                }}
                                            />
                                        </div>
                                        {ciError && <p className="text-destructive text-xs">{ciError}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Correo Electrónico <span className="text-muted-foreground text-xs">(Opcional)</span></Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                className="pl-9"
                                                placeholder="Ej. juan@email.com"
                                                value={client.email}
                                                onChange={(e) => setClient({ ...client, email: e.target.value })}
                                            />
                                        </div>
                                        {emailError && <p className="text-destructive text-xs">{emailError}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* ------------------ Right Column: Summary ------------------ */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-8">
                            <Card className="shadow-lg border-primary/20 overflow-hidden">
                                <div className="bg-primary/5 p-6 border-b border-primary/10">
                                    <h2 className="text-xl font-bold text-primary">Resumen de Cotización</h2>
                                    <p className="text-sm text-muted-foreground">Revisa los ítems antes de descargar.</p>
                                </div>

                                <CardContent className="p-0">
                                    {items.length > 0 ? (
                                        <div className="divide-y max-h-[400px] overflow-y-auto">
                                            {items.map((i) => (
                                                <div key={i.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                                    <div className="flex-1 min-w-0 mr-4">
                                                        <p className="font-medium truncate">{i.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {i.qty} x {formatBs(i.price)}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-semibold">{formatBs(i.price * i.qty)}</span>
                                                        <button
                                                            onClick={() => removeItem(i.id)}
                                                            className="text-muted-foreground hover:text-destructive transition-colors p-1 hover:bg-destructive/10 rounded"
                                                        >
                                                            <Trash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-muted-foreground border-dashed border-2 m-4 rounded-lg bg-muted/30">
                                            <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <p>Tu carrito está vacío</p>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="flex flex-col gap-4 bg-muted/30 p-6 border-t">
                                    <div className="flex justify-between w-full text-lg font-bold">
                                        <span>Total Estimado</span>
                                        <span>{formatBs(total)}</span>
                                    </div>

                                    <Button
                                        onClick={handleWhatsApp}
                                        className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
                                        size="lg"
                                        disabled={items.length === 0}
                                    >
                                        <Phone className="w-5 h-5 mr-2" /> Enviar Cotización por WhatsApp
                                    </Button>

                                    <div className="flex items-center space-x-2 py-2">
                                        <Checkbox
                                            id="reservation"
                                            checked={isReservation}
                                            onCheckedChange={(checked) => setIsReservation(checked as boolean)}
                                        />
                                        <label
                                            htmlFor="reservation"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Generar como Reserva Confirmada
                                        </label>
                                    </div>

                                    {canDownload && isMounted ? (
                                        <PDFDownloadLink
                                            document={<QuotePDF client={client} items={items} isReservation={isReservation} />}
                                            fileName={`${isReservation ? 'reserva' : 'cotizacion'}_${client.name.trim().replace(/\s+/g, "_") || 'cliente'}_${client.phone}.pdf`}
                                            className="w-full"
                                        >
                                            <Button className="w-full h-12 text-lg shadow-md" size="lg" variant="outline">
                                                <FileDown className="w-5 h-5 mr-2" /> Descargar PDF Oficial
                                            </Button>
                                        </PDFDownloadLink>
                                    ) : (
                                        <Button
                                            className="w-full h-12 text-lg"
                                            size="lg"
                                            disabled
                                            variant="secondary"
                                        >
                                            <FileDown className="w-5 h-5 mr-2" /> Descargar PDF Oficial
                                        </Button>
                                    )}

                                    {!validClient && items.length > 0 && (
                                        <p className="text-xs text-center text-muted-foreground">
                                            Completa los datos del cliente (Nombre, CI y Teléfono) para descargar el PDF.
                                        </p>
                                    )}
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
