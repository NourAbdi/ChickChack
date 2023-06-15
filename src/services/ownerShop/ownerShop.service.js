import { host, db } from "../../utils/env";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";


export const getShopByShopUid = async (shopUid) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      `${host}/getShopByShopUid?shopUid=${shopUid}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting shop details");
  }
};

export const updateShopDetails = async (shopUid, updatedShopDetails) => {
  try {
    const shopRef = doc(db, "shops", shopUid);
    const existingShopData = (await getDoc(shopRef)).data();
    const updatedShopData = {
      ...existingShopData,
      workingHours: updatedShopDetails.workingHours,
      isTemporaryClose: updatedShopDetails.isTemporaryClose,
    };
    await updateDoc(shopRef, updatedShopData);
    return "Shop details updated successfully";
  } catch (error) {
    console.error("Error updating shop details:", error);
    throw new Error("Error updating shop details");
  }
};

export const updateOrderStage = async (orderId, newStage) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      throw new Error("Order not found");
    }

    const updatedOrder = {
      ...orderDoc.data(),
      orderStage: newStage,
    };

    await updateDoc(orderRef, updatedOrder);
    return "Order stage updated successfully";
  } catch (error) {
    console.error("Error updating order stage:", error);
    throw new Error("Error updating order stage");
  }
};


export const getShopByOwnerUid = async (ownerUid) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      `${host}/getShopByOwnerUid?ownerUid=${ownerUid}`,
      requestOptions
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error getting shop details");
  }
};

export const getShopMenuByShopUid = async (shopUid) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      `${host}/getShopMenuByShopUid?shopUid=${shopUid}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting shop details");
  }
};

export const getOrdersByShopUid = (shopUid, callback) => {
  const shopsRef = collection(db, "shops");
  const shopDocRef = doc(shopsRef, shopUid);
  const ordersRef = collection(db, "orders");

  const unsubscribe = onSnapshot(shopDocRef, (doc) => {
    if (doc.exists()) {
      const shopData = doc.data();
      const shopOrders = shopData.shopOrders;

      // Check if shopOrders is not empty
      if (shopOrders.length > 0) {
        const queryRef = query(ordersRef, where("orderId", "in", shopOrders));

        // Fetch the orders that match the query
        getDocs(queryRef).then((querySnapshot) => {
          const orders = querySnapshot.docs.map((doc) => doc.data());

          // Call the callback function with the retrieved orders
          callback(orders);
        });
      }
    }
  });

  // Return the unsubscribe function in case you want to stop listening later
  return unsubscribe;
};



