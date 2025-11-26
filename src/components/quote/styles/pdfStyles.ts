import { StyleSheet } from '@react-pdf/renderer';
import { dataEmpresa } from "@/lib/constants/dataEmpresa";

export const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 130,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#222",
    backgroundColor: "#fafafa",
  },

  header: {
    backgroundColor: dataEmpresa.template.backgroundColor,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: dataEmpresa.template.color,
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  brand: {
    fontSize: 18,
    fontWeight: "bold",
    color: dataEmpresa.template.color,
    marginBottom: 2,
    textAlign: "center",
  },

  tagline: {
    fontSize: 10,
    color: "#d1d5db",
    marginBottom: 6,
    fontStyle: "italic",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
  },

  sectionBox: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
  },

  clientDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  clientDataColumn: {
    width: '48%',
  },

  row: {
    marginBottom: 4,
    color: "#374151",
  },

  table: {
    marginTop: 0,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
  },

  colProduct: { width: "45%" },
  colQty: { width: "15%", textAlign: "right" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right", fontWeight: 700 },

  totalBox: {
    marginTop: 18,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: "30%",
    alignSelf: "flex-end",
  },

  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "right",
  },

  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "right",
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f9fa',
    paddingVertical: 15,
    paddingHorizontal: 32,
  },

  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  termsContainer: {
    flex: 1,
    paddingRight: 20,
  },

  termsTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  termItem: {
    fontSize: 7,
    color: '#6c757d',
    marginBottom: 2,
    lineHeight: 1.3,
  },

  qrContainer: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },

  qrImage: {
    width: 60,
    height: 60,
  },

  qrText: {
    fontSize: 6,
    color: '#868e96',
    marginTop: 2,
    textAlign: 'center',
    fontWeight: 'medium',
  },

  pageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },

  pageInfoText: {
    fontSize: 7,
    color: '#adb5bd',
    fontStyle: 'italic',
  },
});
