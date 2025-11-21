import { StyleSheet } from '@react-pdf/renderer';
import { dataEmpresa } from "@/lib/constants/dataEmpresa";

export const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#222",
    backgroundColor: "#fafafa",
  },

  header: {
    backgroundColor: dataEmpresa.template.backgroundColor,
    padding: 20,
    borderRadius: 8,
    marginBottom: 14,
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
    padding: 14,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 18,
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
    marginTop: 20,
    padding: 14,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: "40%",
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
    marginTop: 5,
    textAlign: "center",
    fontSize: 9,
    color: "#6b7280",
  },
})