import { StyleSheet } from "react-native";

export const gradients = {
  levelCard: ["#fcd34d", "#fbbf24"],
  scoreBox: ["#34d399", "#10b981"],
};

export const styles = StyleSheet.create({
  levelCard: {
    alignItems: "center",
    marginBottom: 16,
  },
  levelCardInner: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
  },
  levelLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#92400e",
  },
  scoreContainer: {
    width: '100%',            // Full width
    marginBottom: 16,
    paddingHorizontal: 20,    // Optional: for spacing from edges
  },
  scoreBox: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreLabel: {
    fontSize: 18,
    color: "#065f46",
    fontWeight: "bold",
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#065f46",
  },
});
