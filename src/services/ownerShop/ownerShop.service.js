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

export const updateOrderStage = async (orderId, newPreparationTime, newStage) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      throw new Error("Order not found");
    }

    const updatedOrder = {
      ...orderDoc.data(),
      orderStage: newStage,
      preparationTime: newPreparationTime,
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
  const ordersRef = collection(db, "orders");
  const shopOrdersQuery = query(ordersRef, where("shopUid", "==", shopUid));

  const unsubscribe = onSnapshot(shopOrdersQuery, (snapshot) => {
    const orders = [];
    snapshot.forEach((doc) => {
      orders.push(doc.data());
    });
    callback(orders); // Pass the orders array to the callback
  });

  return unsubscribe; // Return the unsubscribe function
};