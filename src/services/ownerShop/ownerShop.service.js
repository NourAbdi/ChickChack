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
    callback(orders);
  });

  return unsubscribe; 
};

export const updateItemAvailability = async (itemUid, availability) => {
  try {
    const itemRef = doc(db, "items", itemUid);
    const itemDoc = await getDoc(itemRef);
    
    if (!itemDoc.exists()) {
      throw new Error("Item not found");
    }
    const updatedItem = {
      ...itemDoc.data(),
      itemAvailability: availability,
    };

    await updateDoc(itemRef, updatedItem);
    return true;
  } catch (error) {
    console.error("Error updating item availability:", error);
    throw new Error("Error updating item availability");
  }
};

export const updateAddItemAvailability = async (itemUid, additionName, availability) => {
  try {
    const itemRef = doc(db, "items", itemUid);
    const itemDoc = await getDoc(itemRef);
    
    if (!itemDoc.exists()) {
      throw new Error("Item not found");
    }

    const itemData = itemDoc.data();
    
    // Recursive function to search for the additionName within the itemData object
    const findAndModifyAvailability = (data) => {
      if (Array.isArray(data)) {
        // If the current data is an array, iterate over its elements
        return data.map((item) => findAndModifyAvailability(item));
      } else if (typeof data === "object" && data !== null) {
        // If the current data is an object, search for the additionName property
        if (data.additionName === additionName) {
          // If the additionName matches, update the availability property
          return {
            ...data,
            additionAvailability: availability,
          };
        } else {
          // Recursively search for the additionName property in nested objects
          const newData = {};
          for (const key in data) {
            newData[key] = findAndModifyAvailability(data[key]);
          }
          return newData;
        }
      } else {
        // For other data types, simply return the value
        return data;
      }
    };

    // Search for the additionName within the itemData object and update availability
    const updatedItemData = findAndModifyAvailability(itemData);

    // Update the Firestore document with the updated itemData
    await updateDoc(itemRef, {
      ...itemData,
      itemAdditions: updatedItemData.itemAdditions
    });
    
    return true;
  } catch (error) {
    console.error("Error updating item availability:", error);
    throw new Error("Error updating item availability");
  }
};
