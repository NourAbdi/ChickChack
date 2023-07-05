import { db } from "../../utils/env";
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
  const usersRef = collection(db, "users");
  const userQuery = query(usersRef, where("uid", "==", ownerUid));
  const userSnapshot = await getDocs(userQuery);

  if (userSnapshot.empty) {
    throw new Error("User not found");
  }

  const userDoc = userSnapshot.docs[0];
  const userData = userDoc.data();
  const shopUid = userData.shopUid;

  const shopRef = doc(db, "shops", shopUid);
  const shopDoc = await getDoc(shopRef);

  if (!shopDoc.exists()) {
    throw new Error("Shop not found");
  }

  const shopData = shopDoc.data();

  return shopData;
};

export const getShopMenuByShopUid = async (shopUid) => {
  const shopRef = doc(db, "shops", shopUid);
  const shopDoc = await getDoc(shopRef);

  if (!shopDoc.exists()) {
    throw new Error("Shop not found");
  }

  const shopData = shopDoc.data();
  const menu = shopData.menu;

  const itemsRef = collection(db, "items");
  const itemsQuery = query(itemsRef, where("itemUid", "in", menu));
  const itemsSnapshot = await getDocs(itemsQuery);

  const menuItems = [];
  itemsSnapshot.forEach((itemDoc) => {
    const itemData = itemDoc.data();
    menuItems.push(itemData);
  });

  return menuItems;
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
