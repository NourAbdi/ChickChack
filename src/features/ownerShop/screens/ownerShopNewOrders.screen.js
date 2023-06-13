import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, IconButton, ActivityIndicator } from "react-native-paper";


import { OwnerShopContext } from '../../../services/ownerShop/ownerShop.context';

import {
  Row,
  Title,
  OrderCard,
  OrderInfoCard,
  ButtonCard,
} from "../components/ownerShopNewOrders.screen.style";
import { ScrollView } from 'react-native-gesture-handler';


export const OwnerShopNewOrdersScreen = ({ navigation }) => {
  const { newOrders } = useContext(OwnerShopContext);

  useEffect(() => {
    if (newOrders) {
      console.log("newOrders", JSON.stringify(newOrders));
    }
  }, [newOrders]);

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Title>YOUR NEW ORDERS:</Title>
        <OrderCard isExpanded={isExpanded}>
          <Row>
            <ButtonCard></ButtonCard>
            <OrderInfoCard>
            </OrderInfoCard>
            <ButtonCard></ButtonCard>
          </Row>
            <Button title={isExpanded ? "Collapse" : "Expand"} onPress={toggleExpand} />
            <Text>
              This is the initial content of the card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              tincidunt vestibulum metus, vel finibus mauris pellentesque a. Sed cursus nunc eget diam consectetur, ac
              vulputate dolor pulvinar. In at velit et sem aliquet facilisis. Duis pulvinar semper ex, sed egestas velit
              iaculis non. Curabitur interdum ligula quis mauris mattis, eget dignissim ligula semper.
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </Text>
        </OrderCard>
      </ScrollView>
    </SafeAreaView>
  );
};
