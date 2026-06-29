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
  bell: { backgroundColor: themes.surface, padding: 10, borderRadius: 12 },
});
