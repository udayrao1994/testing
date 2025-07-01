import { StyleSheet } from "react-native";

export default StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
  },
  emptyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  header: {
    padding: 16,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 30,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#FFF",
    fontSize: 16,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#2563eb",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#6A5ACD",
    borderRadius: 4,
  },
  contentContainer: {
    padding: 20,
  },
  questionBox: {
    backgroundColor: "#ECECFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  questionText: {
    fontSize: 20,
    color: "#333366",
    fontWeight: "600",
    textAlign: "center",
  },
  answerLabel: {
    fontSize: 16,
    color: "#4B0082",
    fontWeight: "500",
    marginBottom: 10,
  },
  inputBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D6D6FF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  inputText: {
    fontSize: 20,
    color: "#222",
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  keypadButton: {
    width: "30%",
    margin: "1.5%",
    backgroundColor: "#e0e7ff",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
  },
  keypadText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  backspaceButton: {
    width: "63%",
    margin: "1.5%",
    backgroundColor: "#fef3c7",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
  },
  backspaceText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#b45309",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  actionButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
  fullWidthCenter: {
    width: "100%",
    alignItems: "center",
  },
  flexOne: {
    flex: 1,
    marginLeft: 10,
  },
  backContainer: {
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
