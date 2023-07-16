import { host } from "../../utils/env";
import { db } from '../../utils/env';
import { collection, onSnapshot, updateDoc, doc, getDoc, getDocs, addDoc, query, where } from "firebase/firestore";

export const saveOrder = async (order) => {
  try {
    const ordersCollectionRef = collection(db, "orders");
    const newOrderRef = await addDoc(ordersCollectionRef, order);
    const shopUid = order.shopUid;
    const userUid = order.userUid;

    // Add the orderId field to the newly created order document
    const orderId = newOrderRef.id;
    await updateDoc(newOrderRef, { orderId });

    const shopDocRef = doc(db, "shops", shopUid);
    const shopDocSnapshot = await getDoc(shopDocRef);
    if (shopDocSnapshot.exists()) {
      const shopData = shopDocSnapshot.data();
      let shopOrders = shopData.shopOrders || [];
      shopOrders.push(newOrderRef.id);
      await updateDoc(shopDocRef, { shopOrders });
    }

    const userDocRef = doc(db, "users", userUid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      let userOrders = userData.userOrders || [];
      userOrders.push(newOrderRef.id);
      await updateDoc(userDocRef, { userOrders });
    }

    return true; // Return true to indicate successful order saving
  } catch (error) {
    console.error("Error adding order:", error);
    throw new Error("Error adding order");
  }
};

export const getPastOrdersByUserUid = async (userUid) => {
  try {
    const userDocRef = doc(db, "users", userUid);
    const userOrdersSnapshot = await getDoc(userDocRef);

    if (userOrdersSnapshot.exists()) {
      const userData = userOrdersSnapshot.data();
      const userOrders = userData.userOrders || [];

      const orders = [];
      for (const orderId of userOrders) {
        const orderDocRef = doc(db, "orders", orderId);
        const orderDocSnapshot = await getDoc(orderDocRef);
        if (orderDocSnapshot.exists()) {
          const orderData = orderDocSnapshot.data();
          orders.push(orderData);
        }
      }

      return orders;
    } else {
      console.log("User document does not exist");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving past orders:", error);
    throw new Error("Error retrieving past orders");
  }
};
