import { Document, Page, Text, View, Image, Link } from "@react-pdf/renderer";
import { formatBs } from "@/lib/utils";
import { dataEmpresa } from "@/lib/constants/dataEmpresa";
import { styles } from './styles/pdfStyles';
import { IconText } from './iconsPdf';

type Item = { name: string; qty: number; price: number };
type Props = { client: { name: string; phone: string; email: string }; items: Item[] };

export default function QuotePDF({ client, items }: Props) {
  const subtotal = items.reduce((acc, i) => acc + i.qty * i.price, 0);

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

        {/* --------- DATOS DEL CLIENTE --------- */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>
          <Text style={styles.row}>Nombre: {client.name}</Text>
          <Text style={styles.row}>Teléfono: (+591) {client.phone}</Text>
          <Text style={styles.row}>Email: {client.email}</Text>
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

        {/* --------- NOTA Y MENSAJE FINAL --------- */}
        <View
          style={{
            marginTop: 28,
            padding: 12,
            borderRadius: 6,
            backgroundColor: "#f7f7f7",
            borderLeftWidth: 3,
            borderLeftColor: dataEmpresa.template.backgroundColor,
          }}
        >
          {/* Nota */}
          <Text
            style={{
              fontSize: 11,
              marginBottom: 6,
              lineHeight: 1.4,
              color: "#444",
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
              fontSize: 11,
              color: "#333",
              fontWeight: "medium",
              textAlign: "center",
              fontStyle: "italic",
              marginTop: 4,
            }}
          >
            Gracias por confiar en nosotros. Para reservas o confirmaciones, estaremos encantados de atenderle.
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 40,
          }}
        >
          <Text style={{ fontSize: 10, color: "#555", fontStyle: "italic" }}>
            Fecha y hora: {new Date().toLocaleString("es-BO", { timeZone: "America/La_Paz" })}
          </Text>

          <Text
            style={{ fontSize: 10, color: "#555", fontStyle: "italic" }}
            render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`}
          />
        </View>

      </Page>
    </Document>
  );
}
