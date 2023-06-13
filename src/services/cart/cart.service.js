import { host } from "../../utils/env";
import { db } from '../../utils/env';
import { collection, onSnapshot, updateDoc, doc, getDoc, getDocs, addDoc, query, where, } from "firebase/firestore";

export const saveOrder = async (order) => {
  try {
    const ordersCollectionRef = collection(db, "orders");
    const newOrderRef = await addDoc(ordersCollectionRef, order);
    const shopUid = order.shopUid;

    // Add the orderId and shopUidfield to the newly created order document
    const orderId = newOrderRef.id;
    await updateDoc(newOrderRef, { orderId });

    const shopDocRef = doc(db, "shops", shopUid);
    const shopDocSnapshot = await getDoc(shopDocRef);
    if (shopDocSnapshot.exists()) {
      const shopData = shopDocSnapshot.data();
      let shopOrders = shopData.shopOrders || [];
      shopOrders.push(newOrderRef.id);
      await updateDoc(shopDocRef, { shopOrders });
      let preparationTime = shopData.preparationTime ;
      await updateDoc(newOrderRef, { preparationTime });
    }

    return true; // Return true to indicate successful order saving
  } catch (error) {
    console.error("Error adding order:", error);
    throw new Error("Error adding order");
  }
};


export const getPastOrdersByUserUid = async (userUid) => {
  try {
    const ordersCollectionRef = collection(db, 'orders');
    const querySnapshot = await getDocs(query(ordersCollectionRef, where('userUid', '==', userUid)));

    const pastOrders = querySnapshot.docs.map((doc) => doc.data());

    console.log('Past orders:', pastOrders);
    return pastOrders;
  } catch (error) {
    console.error('Error retrieving past orders:', error);
    throw new Error('Error retrieving past orders');
  }
};

