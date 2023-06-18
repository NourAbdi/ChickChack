// Styles
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  shopContainer: {
    marginBottom: 16,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  shopOptionsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  optionButton: {
    marginRight: 8,
    marginBottom: 8, // Add margin bottom to create space between options
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#f0f0f0",
  },
  optionLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 4,
  },
  itemQuantity: {
    fontSize: 16,
  },
  removeButton: {
    fontSize: 16,
    color: "red",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  availableOptions: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 16,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
});