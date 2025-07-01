import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEEDB", // light peach tone
    padding: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  category: {
    color: "#FF6B00",
    fontWeight: "bold",
    fontSize: 16,
  },
  counter: {
    fontSize: 14,
    color: "#FF6B00",
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  questionBox: {
    backgroundColor: "#FF6B00",
    color: "#fff",
    padding: 20,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  selectLabel: {
    color: "#FF6B00",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF6B00",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: "#FF6B00",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  skipButton: {
    flex: 1,
    backgroundColor: "#FF914D", // orange-ish
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#00C881", // green save
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  skipText: {
    color: "#000",
    fontWeight: "bold",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
    resultList: {
    marginTop: 20,
  },
  retryButton: {
    marginTop: 30,
    backgroundColor: "#00C881",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  retry: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#FF6600', // Orange background
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    // Removed alignSelf: 'center' as width: '100%' makes it full-width
    marginTop: '100%', // Space above the button from the grid
     // Space below the button before bottom nav
    width: '100%', // Make it full width
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  




});

export default styles;
