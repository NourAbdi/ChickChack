

import styled from "styled-components/native";
import { Image,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin:${(props) => props.theme.space[2]};
  align-self:center;
`;

export const ItemName = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin-bottom:${(props) => props.theme.space[1]};
`;

export const AvailableOptionsText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  margin-bottom:${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const AvailableOptionsButton = styled(TouchableOpacity)`
  margin-bottom: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:5px;
  padding:5px;
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
`;

export const SummaryInfo = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const Info = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const Price = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const ViewItem = styled.View`
  width:100%; 
  marginBottom:50px;
  borderColor:${(props) => props.theme.colors.mainblue};
  borderWidth:0px;
`;

export const Row = styled.View`
  flex-direction:row;
  align-items:center;
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const ItemCard = styled.View`
  flex-direction:row;
  align-items:center;
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: rgba(200, 200, 200, 0.2);
`;

export const ViewCounter = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color:black;
  padding: 6px;
  border-radius: 10px;
  margin:${(props) => props.theme.space[1]};
  margin-left:${(props) => props.theme.space[4]};
  align-self: flex-end;
`;

export const CounterButton = styled(TouchableOpacity)`
  background-color: white;
  width: 30px;
  aspect-ratio:1;
  align-items: center;
  justify-content: center;
  border-radius: 34px;
`;

export const CheckOutButton = styled(TouchableOpacity)`
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.mainblue};
  align-items: center;
  justify-content: center;
  border-radius:10px;
  align-self:center;
  width:90%;
  height:50px;
`;

export const CheckOutText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  fontSize:  ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const Count = styled.Text`
  fontSize:  ${(props) => props.theme.fontSizes.button};
  fontWeight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const LeftIcon = styled(Icon)`
  margin:${(props) => props.theme.space[2]};
  align-self:center;
`;

export const ShopIcon = styled(Image)`
  width:50px;
  height:50px;
  margin:${(props) => props.theme.space[2]};
  border-radius: 34px;
  border-width: 1px;
  border-color:  ${(props) => props.theme.colors.ui.secondary};
  
`;
export const ItemImage = styled(Image)`
  width: 80px;
  height: 80px;
  borderRadius: 8px;
  marginRight: 8px;
  align-self:center;

`;

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
    alignItems:'center',
    alignSelf:'center'
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
    alignSelf:'center'
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 16,
    alignItems:'center',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    alignSelf:'center',
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