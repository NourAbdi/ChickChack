import React,{useState} from "react";
import { View,Button } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { groupBy } from 'lodash'; // Import the groupBy function from Lodash
import ModalSelector from 'react-native-modal-selector';



import {
    IteamCard,
    Shadow,
    Row,
    Field,
    HeaderImage,
    Category,
    OrderInfoCard,
    Time,
    TimeCard,
    Center,
    ConfirmingQus,
    ButtonCard,
  } from "../components/ownerShopNewOrders.screen.style";
  
export const printOrderinfo = (order) =>{
    return(
        <View>
            <View style={{marginVertical:10}}>
            <Row>
                <Field>Order ID:</Field>
                <Field>{order.orderId}</Field>
            </Row>
            <Row>
                <Field>Order Time:</Field>
                <Field>{new Date(order.orderTime).toLocaleString('en-US', { hour12: false })}</Field>
            </Row>
            <Row>
                <Field>Order Option:</Field>
                <Field>{order.orderOption}</Field>
            </Row>
            <Row>
                <Field>Order Total Price:</Field>
                <Field>{order.orderTotalPrice}₪</Field>
            </Row>
            <Row>
                <Field>Pay Option:</Field>
                <Field>{order.payOption}</Field>
            </Row>
            </View>
        </View>
    );
};

export const printCartIteam = (cartItems) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa",cartItems)
    const cartItemsByCategory = groupBy(cartItems, 'item.itemCategory');
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",cartItemsByCategory)

  return Object.entries(cartItemsByCategory).map(([category, items]) => (
    <View key={category}>
      <Category>{category}:</Category>
      {items.map((cartItem, itemIndex) => (
        <Shadow key={itemIndex}>
          <IteamCard>
            <HeaderImage source={{ uri: cartItem.item.itemPhoto }} />
            <View style={{ marginVertical: 10 }}>
              <Row>
                <Field>Item Name:</Field>
                <Field>{cartItem.item.itemName}</Field>
              </Row>
              <Row>
                <Field>Item Price:</Field>
                <Field>{cartItem.item.itemPrice}₪</Field>
              </Row>
              <Row>
                <Field>Item Addition:</Field>
                <Field>{cartItem.item.itemAddition.toString()}</Field>
              </Row>
              <Row>
                <Field>Quantity:</Field>
                <Field>{cartItem.quantity}</Field>
              </Row>
            </View>
          </IteamCard>
        </Shadow>
      ))}
    </View>
  ));
};

export const PrintConfirmingOrder = ({preparationTime}) => {
    const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
    const [selectedIsConfirmin, setSelectedIsConfirmin] = useState("Yes");
    const [selectedHour, setSelectedHour] = useState(preparationTime.substring(0, 2));
    const [selectedMinute, setSelectedMinute] = useState(preparationTime.substring(3, 5));
    const Confirming = ["Yes", "No"];
  
    return (
      <View>
        {/* print confirming */}
        <Row>
          <ConfirmingQus>Can you prepare the order? </ConfirmingQus>
          <ModalSelector
            key="confirmingSelector"
            data={Confirming.map((open) => ({ key: open, label: open }))}
            initValue={selectedIsConfirmin}
            onChange={(option) => {
              setSelectedIsConfirmin(option.label);
            }}
          >
            <TimeCard>
              <Time>{selectedIsConfirmin}</Time>
            </TimeCard>
          </ModalSelector>
        </Row>
        <Row>
          <ConfirmingQus>After how long time will the order be ready?</ConfirmingQus>
          <ModalSelector
            key="hourSelector"
            data={hours.map((hour) => ({ key: hour, label: hour }))}
            initValue={selectedHour}
            onChange={(option) => {
              setSelectedHour(option.label);
            }}
          >
            <TimeCard>
              <Time>{selectedHour}</Time>
            </TimeCard>
          </ModalSelector>

          <Center> : </Center>
          <ModalSelector
            key="minuteSelector"
            data={minutes.map((minute) => ({ key: minute, label: minute }))}
            initValue={selectedMinute}
            onChange={(option) => {
              setSelectedMinute(option.label);
            }}
          >
            <TimeCard>
              <Time>{selectedMinute}</Time>
            </TimeCard>
          </ModalSelector>
        </Row>
        <ButtonCard>
          <Button title={"Confirm"} onPress={() => null} color={colors.mainblue} />
        </ButtonCard>
      </View>
    );
  };
  


  