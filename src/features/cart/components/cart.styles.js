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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  optionButtonHighlighted: {
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
    marginRight: 8,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
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
    fontSize: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 8,
  },
  itemQuantity: {
    fontSize: 16,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
