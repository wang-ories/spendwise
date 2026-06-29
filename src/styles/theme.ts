import { StyleSheet } from "react-native";

export const themes = {
  background: "#0F172A",
  header: "#1E293B",
  surface: "#334155",
  primary: "#10B981",
  text: "#F8FAFC",
  textSecondary: "#94A3B8",
  success: "#34D399",
  accent: "#F59E0B",
  // Status Colors
  warning: "#f59e0b", // Yellow
  orange: "#f97316", // Orange (for 50-75% range)
  alert: "#ff5252", // Red
};

export const themeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.background,
    paddingTop: 60,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: themes.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: themes.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: themes.textSecondary,
    fontSize: 14,
  },
  /*header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },*/
  header: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  greeting: {
    color: themes.textSecondary,
    fontSize: 14,
  },
  name: {
    color: themes.text,
    fontSize: 22,
    fontWeight: "bold",
  },
  bell: { 
    backgroundColor: themes.surface, 
    padding: 10, 
    borderRadius: 12 
  },
  input: { 
    backgroundColor: '#2a2a4a', 
    padding: 20, 
    borderRadius: 15, 
    color: '#fff', 
    marginBottom: 15 
  },
  amount: { 
    fontSize: 32, 
    textAlign: 'center' 
  },
  btn: { 
    padding: 20, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 20 
  },
  emptyContainer: { 
    padding: 30, 
    alignItems: 'center', 
    backgroundColor: themes.surface, 
    borderRadius: 20 
  },
  amountContainer: { flexDirection: 'row',  marginBottom: 20 },
  currency: { color: themes.primary, fontSize: 32, fontWeight: 'bold', marginRight: 10 },
  amountInput: { color: '#fff', fontSize: 48, fontWeight: 'bold', textAlign: 'center' },
  titleInput: { backgroundColor: themes.surface, padding: 20, borderRadius: 20, color: '#fff', fontSize: 16, marginBottom: 30 },
  sectionLabel: { color: themes.textSecondary, fontSize: 14, marginBottom: 15, fontWeight: '600' },
  categoryContainer: { marginBottom: 40 },
  categoryChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 25, 
    marginRight: 12 
  },
  categoryLabel: { marginLeft: 8, fontWeight: '600', fontSize: 14 },
  saveBtn: { padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 10, elevation: 5 },
  saveBtnText: { color: themes.background, fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { marginTop: 20, alignItems: 'center' }

});
