import { host } from "../../utils/env";
import { db } from '../../utils/env';
import { collection, onSnapshot, updateDoc, doc, getDoc, addDoc } from "firebase/firestore";

export const saveOrder = async (order) => {
  try {
    const ordersCollectionRef = collection(db, "orders");
    const newOrderRef = await addDoc(ordersCollectionRef, order);

    // Add the orderId field to the newly created order document
    const orderId = newOrderRef.id;
    await updateDoc(newOrderRef, { orderId });

    // Add the new order UID to the respective shop's shopOrders field
    const shopUids = order.orderDetails.map((detail) => detail.shopUid);
    for (const shopUid of shopUids) {
      const shopDocRef = doc(db, "shops", shopUid);
      const shopDocSnapshot = await getDoc(shopDocRef);
      if (shopDocSnapshot.exists()) {
        const shopData = shopDocSnapshot.data();
        let shopOrders = shopData.shopOrders || [];
        shopOrders.push(newOrderRef.id);
        await updateDoc(shopDocRef, { shopOrders });
      }
    }

    return true; // Return true to indicate successful order saving
  } catch (error) {
    console.error("Error adding order:", error);
    throw new Error("Error adding order");
  }
};



export const getPastOrdersByUserUid = async (userUid) => {
  console.log("trying to get the past orders:", userUid);
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      `${host}/getPastOrdersByUserUid?userUid=${userUid}`,
      requestOptions
    );
    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving past orders");
  }
};





