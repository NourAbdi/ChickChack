import React,{useState,useEffect} from "react";
import { View,Button,Alert } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { groupBy } from 'lodash'; 
import ModalSelector from 'react-native-modal-selector';

import {
    IteamCard,
    Shadow,
    Row,
    Field,
    HeaderImage,
    Category,
    Time,
    TimeCard,
    Center,
    ConfirmingQus,
    ButtonCard,
    Timer,
  } from "./ownerShopOrders.style";
  
export const printOrderinfo = (order, t) =>{
    return(
        <View>
            <View style={{marginVertical:10}}>
            <Row>
                <Field>{t("Order ID")} :</Field>
                <Field>{order.orderId}</Field>
            </Row>
            <Row>
                <Field>{t("Order Time")} :</Field>
                <Field>{new Date(order.orderTime).toLocaleString('en-US', { hour12: false })}</Field>
            </Row>
            <Row>
                <Field>{t("Order Option")} :</Field>
                <Field>{order.orderOption}</Field>
            </Row>
            <Row>
                <Field>{t("Order Total Price")} :</Field>
                <Field>{order.orderTotalPrice}₪</Field>
            </Row>
            <Row>
                <Field>{t("Pay Option")} :</Field>
                <Field>{order.payOption}</Field>
            </Row>
            <Row>
                <Field>{t("Order Stage")} :</Field>
                <Field>{order.orderStage}</Field>
            </Row>
            </View>
        </View>
    );
};

export const printCartIteam = (cartItems, t) => {
  const cartItemsByCategory = groupBy(cartItems, 'item.itemCategory');
  return Object.entries(cartItemsByCategory).map(([category, items]) => (
    <View key={category}>
      <Category>{category}:</Category>
      {items.map((cartItem, itemIndex) => (
        <Shadow key={itemIndex}>
          <IteamCard>
            <HeaderImage source={{ uri: cartItem.item.itemPhoto }} />
            <View style={{ marginVertical: 10 }}>
              <Row>
                <Field>{t("Item Name")} :</Field>
                <Field>{cartItem.item.itemName}</Field>
              </Row>
              <Row>
                <Field>{t("Item Price")} :</Field>
                <Field>{cartItem.item.itemPrice}₪</Field>
              </Row>
              {Object.keys(cartItem.additions).length > 0 && (
                <Row>
                  <Field>{t("Item Addition")} :</Field>
                  <View>
                    {Object.entries(cartItem.additions).map(([additionName, additionPrice]) => (
                      <Field key={additionName}>
                        {additionName}: {additionPrice}₪
                      </Field>
                    ))}
                  </View>
                </Row>
              )}
              {Object.keys(cartItem.additions).length === 0 && (
                <Row>
                  <Field>{t("Item Addition")} :</Field>
                  <Field>{t("no additions")}!</Field>
                </Row>
              )}
              <Row>
                <Field>{t("Quantity")} :</Field>
                <Field>{cartItem.quantity}</Field>
              </Row>
            </View>
          </IteamCard>
        </Shadow>
      ))}
    </View>
  ));
};

export const PrintConfirmingOrder = ({ orderId, preparationTime, updateOrder, t }) => {
  const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
  const [selectedHour, setSelectedHour] = useState(preparationTime.substring(0, 2));
  const [selectedMinute, setSelectedMinute] = useState(preparationTime.substring(3, 5));
  const getTimeString = () => {
    return `${selectedHour}:${selectedMinute}`;
  };
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000); // Update every second

    setTimer(timerId);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timerId);
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      // Perform the deletion logic here
      // Call the `updateOrder` function to delete the order
      clearTimeout(timer);
      updateOrder(orderId, getTimeString(), 'deny');
    }
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <Row>
        <ConfirmingQus>{t("Preparation time")} :</ConfirmingQus>
        <>
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
        </>
      </Row>
      <Timer>{t("Remaining Time for Accepting the Order")}: {formatTime(remainingTime)} </Timer>
      <Center>
      <Row>
          <ButtonCard color={colors.button.green}>
          <Button title={t("Confirm")} onPress={() => handleAcceptance(getTimeString(),updateOrder,orderId)} color={colors.button.white} />
          </ButtonCard>
          <ButtonCard color={colors.button.red}>
              <Button title={t("Deny")} onPress={() =>  handleDeny(getTimeString(),updateOrder,orderId)} color={colors.button.white} />
          </ButtonCard>
      </Row>
      </Center>
      
    </View>
  );
};
  

export const handleAcceptance = (preparationTime,updateOrderFunc,orderId) => {
  const selectedTime = preparationTime;
  Alert.alert(
    "Confirmation",
    `Are you sure you want to accept this order with a preparation time of ${selectedTime}?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => updateOrderFunc(orderId, selectedTime, "onProcess"),
      },
    ],
    { cancelable: false }
  );
};

export const handleDeny = (preparationTime,updateOrderFunc,orderId) => {
  const selectedTime = preparationTime;
  Alert.alert(
    "Confirmation",
    `Are you sure you want to deny this order ?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => updateOrderFunc(orderId, selectedTime, "deny"),
      },
    ],
    { cancelable: false }
  );
};
  
