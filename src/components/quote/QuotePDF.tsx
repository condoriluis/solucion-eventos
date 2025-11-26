import { Document, Page, Text, View, Image, Link } from "@react-pdf/renderer";
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { formatBs } from "@/lib/utils";
import { dataEmpresa } from "@/lib/constants/dataEmpresa";
import { styles } from './styles/pdfStyles';
import { IconText } from './iconsPdf';

type Item = { name: string; qty: number; price: number };
type Props = { client: { name: string; phone: string; email: string; ci?: string }; items: Item[] };

export default function QuotePDF({ client, items, isReservation = false }: Props & { isReservation?: boolean }) {
    const subtotal = items.reduce((acc, i) => acc + i.qty * i.price, 0);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    useEffect(() => {
        const generateQR = async () => {
            try {
                const url = await QRCode.toDataURL(dataEmpresa.contact.url, {
                    margin: 1,
                    color: {
                        dark: dataEmpresa.template.backgroundColor || '#000000',
                        light: '#ffffff',
                    },
                });
                setQrCodeUrl(url);
            } catch (err) {
                console.error('Error generating QR code:', err);
            }
        };
        generateQR();
    }, []);

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* --------- HEADER --------- */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <Image src={dataEmpresa.basics.logoPdf} style={styles.logo} />

                        <View style={{ marginLeft: 12, flex: 1 }}>
                            <Text style={styles.brand}>{dataEmpresa.basics.name}</Text>
                            <Text style={styles.tagline}>{dataEmpresa.basics.description}</Text>

                            <Link src={`tel:${dataEmpresa.contact.phone}`} style={{ textDecoration: 'none' }}>
                                <IconText icon="phone" text={dataEmpresa.contact.phone} />
                            </Link>

                            <Link src={`mailto:${dataEmpresa.contact.email}`} style={{ textDecoration: 'none' }}>
                                <IconText icon="email" text={dataEmpresa.contact.email} />
                            </Link>

                            <Link src={`https://${dataEmpresa.contact.url.replace(/^https?:\/\//, '')}`} style={{ textDecoration: 'none' }}>
                                <IconText icon="link" text={`https://${dataEmpresa.contact.url}`} />
                            </Link>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 14 }}>
                        {dataEmpresa.redes.map((r, idx) => {
                            let icon: 'facebook' | 'tiktok' | 'whatsapp' = 'facebook';
                            let url = r.url;
                            let displayText = r.name;

                            if (r.network.toLowerCase() === 'facebook') icon = 'facebook';
                            else if (r.network.toLowerCase() === 'tiktok') {
                                icon = 'tiktok';
                                url = `https://www.tiktok.com/${r.url}`;
                                displayText = r.url;
                            } else if (r.network.toLowerCase() === 'whatsapp') {
                                icon = 'whatsapp';
                                url = `https://wa.me/${r.url}`;
                                displayText = r.url;
                            }

                            return (
                                <Link key={idx} src={url} style={{ textDecoration: 'none' }}>
                                    <IconText icon={icon} text={displayText} />
                                </Link>
                            );
                        })}
                    </View>
                </View>

                {/* --------- TITLE --------- */}
                <View style={{ marginBottom: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: dataEmpresa.template.backgroundColor }}>
                        {isReservation ? 'CONFIRMACIÓN DE ALQUILER' : 'COTIZACIÓN'}
                    </Text>
                </View>

                {/* --------- DATOS DEL CLIENTE --------- */}
                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>Datos del Cliente</Text>
                    <View style={styles.clientDataContainer}>
                        <View style={styles.clientDataColumn}>
                            <Text style={styles.row}>Nombre: {client.name}</Text>
                            {client.ci && <Text style={styles.row}>CI: {client.ci}</Text>}
                        </View>
                        <View style={styles.clientDataColumn}>
                            <Text style={styles.row}>Teléfono: {client.phone ? `(+591) ${client.phone}` : 'Sin teléfono'}</Text>
                            <Text style={styles.row}>Email: {client.email || 'Sin email'}</Text>
                        </View>
                    </View>
                </View>

                {/* --------- DETALLE DE PRODUCTOS --------- */}
                <View>
                    <Text style={styles.sectionTitle}>Detalle de Productos</Text>

                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.colProduct}>Producto</Text>
                            <Text style={styles.colQty}>Cantidad</Text>
                            <Text style={styles.colPrice}>Precio</Text>
                            <Text style={styles.colTotal}>Total</Text>
                        </View>

                        {items.map((i, idx) => (
                            <View key={idx} style={styles.tableRow}>
                                <Text style={styles.colProduct}>{i.name}</Text>
                                <Text style={styles.colQty}>{i.qty}</Text>
                                <Text style={styles.colPrice}>{formatBs(i.price)}</Text>
                                <Text style={styles.colTotal}>{formatBs(i.qty * i.price)}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* --------- TOTAL --------- */}
                <View style={styles.totalBox}>
                    <Text style={styles.totalLabel}>Importe Total</Text>
                    <Text style={styles.totalValue}>{formatBs(subtotal)}</Text>
                </View>

                {isReservation ? (
                    <View
                        style={{
                            marginTop: 28,
                            padding: 12,
                            borderRadius: 6,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#eee",
                            borderLeftWidth: 3,
                            borderLeftColor: dataEmpresa.template.backgroundColor,
                        }}
                    >
                        {/* Nota Reserva */}
                        <Text
                            style={{
                                fontSize: 10,
                                marginBottom: 6,
                                lineHeight: 1.4,
                                color: "#555",
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>Nota: </Text>
                            <Text>
                                Contamos con servicio de transporte con un costo adicional, el cual varía
                                según la cantidad solicitada y la ubicación exacta de entrega.
                            </Text>
                        </Text>

                        {/* Mensaje de agradecimiento */}
                        <Text
                            style={{
                                fontSize: 10,
                                color: "#666",
                                fontWeight: "medium",
                                textAlign: "center",
                                fontStyle: "italic",
                                marginTop: 4,
                            }}
                        >
                            Gracias por confiar en nosotros.
                        </Text>
                    </View>
                ) : (
                    <View
                        style={{
                            marginTop: 28,
                            padding: 12,
                            borderRadius: 6,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#eee",
                            borderLeftWidth: 3,
                            borderLeftColor: dataEmpresa.template.backgroundColor,
                        }}
                    >
                        {/* Nota Cotización */}
                        <Text
                            style={{
                                fontSize: 10,
                                marginBottom: 6,
                                lineHeight: 1.4,
                                color: "#555",
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>Importante: </Text>
                            <Text>
                                Este documento es una estimación de costos y no garantiza la reserva del stock.
                                La disponibilidad de los productos está sujeta a confirmación al momento de realizar el pago del anticipo.
                            </Text>
                        </Text>

                        <Text
                            style={{
                                fontSize: 10,
                                color: "#666",
                                fontStyle: "italic",
                                marginTop: 2,
                            }}
                        >
                            * Los precios tienen una validez de 3 días.
                        </Text>
                    </View>
                )}

                {/* --------- FOOTER (Fixed on every page) --------- */}

                <View style={styles.footer} fixed>

                    {isReservation && (
                        <View style={{ ...styles.footerContent, paddingVertical: 5, borderTopWidth: 1, borderTopColor: '#e9ecef', }}>
                            {/* Terms and Conditions */}
                            <View style={styles.termsContainer}>
                                <Text style={styles.termsTitle}>Términos y Condiciones</Text>
                                <View>
                                    <Text style={styles.termItem}>1. Responsabilidad: El cliente asume total responsabilidad por pérdida o daño de los equipos.</Text>
                                    <Text style={styles.termItem}>2. Reservas: Se requiere 50% de anticipo. Cancelaciones con 48h de anticipación.</Text>
                                    <Text style={styles.termItem}>3. Devolución: Los equipos deben retornarse en las mismas condiciones de entrega.</Text>
                                </View>
                            </View>

                            {/* QR Code */}
                            <View style={styles.qrContainer}>
                                {qrCodeUrl ? (
                                    <>
                                        <Image src={qrCodeUrl} style={styles.qrImage} />
                                        <Text style={styles.qrText}>Escanéame</Text>
                                    </>
                                ) : null}
                            </View>
                        </View>
                    )}

                    {/* Page Info & Date - Always shown */}
                    <View style={styles.pageInfo}>
                        <Text style={styles.pageInfoText}>
                            Generado el: {new Date().toLocaleString("es-BO", { timeZone: "America/La_Paz" })}
                        </Text>
                        <Text
                            style={styles.pageInfoText}
                            render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`}
                        />
                    </View>
                </View>

                {isReservation ? (
                    <View
                        style={{
                            position: 'absolute',
                            top: '45%',
                            left: '10%',
                            transform: 'rotate(-45deg)',
                            opacity: 0.3,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 70,
                                color: dataEmpresa.template.backgroundColor,
                                fontWeight: 'bold',
                            }}
                        >
                            CONFIRMADO
                        </Text>
                    </View>
                ) : (
                    <View
                        style={{
                            position: 'absolute',
                            top: '45%',
                            left: '15%',
                            transform: 'rotate(-45deg)',
                            opacity: 0.3,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 70,
                                color: dataEmpresa.template.backgroundColor,
                                fontWeight: 'bold',
                            }}
                        >
                            COTIZACIÓN
                        </Text>
                    </View>
                )}

            </Page>
        </Document>
    );
}
