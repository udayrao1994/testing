import { StyleSheet, Platform } from "react-native";

export const gradients = {
  container: ["#3B82F6", "#2563EB"],
  levelCard: ["#fcd34d", "#fbbf24"],
  scoreBox: ["#34d399", "#10b981"],
  resultCard: ["#e0f2fe", "#bae6fd"],
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 60,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  resultList: {
    marginTop: 10,
    marginBottom: 20,
  },
  resultCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1e3a8a",
  },
  answerText: {
    fontSize: 14,
    color: "#334155",
  },
  icon: {
    marginLeft: 10,
  },
  leaderboardButton: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  leaderboardButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  retryButton: {
    marginTop: 12,
    backgroundColor: "#f97316",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  correctBorder: {
    borderColor: "#22c55e",
    borderWidth: 2,
  },
  incorrectBorder: {
    borderColor: "#ef4444",
    borderWidth: 2,
  },
});

// Helper function for AntDesign icon props
export const getIconStyle = (correct) => ({
  name: correct ? "checkcircle" : "closecircle",
  size: 24,
  color: correct ? "#22c55e" : "#ef4444",
});
