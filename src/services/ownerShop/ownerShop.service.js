import { host } from "../../utils/env";
import { db } from '../../utils/env';
import { collection, onSnapshot } from "firebase/firestore";

export const getShopByShopUid = async (shopUid) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    try {
        const response = await fetch(`${host}/getShopByShopUid?shopUid=${shopUid}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting shop details');
    }
};

export const updateShopDetails = async (shopUid, updatedShopDetails) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedShopDetails), // Pass the updatedShopDetails object as JSON string
    };

    try {
        console.log("Trying to update shop details with requestOptions:", requestOptions.body);
        console.log("and shop uid:", shopUid);
        const response = await fetch(`${host}/updateShopDetails?shopUid=${shopUid}`, requestOptions);
        const data = await response.text();
        console.log("Response from updateShopDetails:", data); // Log the response data
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error updating shop details');
    }
};

export const getShopByOwnerUid = async (ownerUid) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    try {
        const response = await fetch(`${host}/getShopByOwnerUid?ownerUid=${ownerUid}`, requestOptions);
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.log(error);
        throw new Error('Error getting shop details');
    }
};

export const getShopMenuByShopUid = async (shopUid) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    try {
        const response = await fetch(`${host}/getShopMenuByShopUid?shopUid=${shopUid}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting shop details');
    }
};

export const getOrdersByShopUid = (shopUid, callback) => {
    try {
      const ordersSnapshot = collection(db, "orders");
      const orders = [];
  
      const unsubscribe = onSnapshot(ordersSnapshot, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc;
          if (change.type === "added") {
            console.log("Added:", doc.id, "=>", doc.data());
          } else if (change.type === "modified") {
            console.log("Modified:", doc.id, "=>", doc.data());
          } else if (change.type === "removed") {
            console.log("Removed:", doc.id);
          }
        });
  
        orders.length = 0;
        snapshot.forEach((doc) => {
          const orderData = doc.data();
          const orderDetails = orderData.orderDetails || [];
  
          const hasMatchingShopUid = orderDetails.some(
            (detail) => detail.shopUid === shopUid
          );
  
          if (hasMatchingShopUid) {
            orders.push(orderData);
          }
        });
  
        console.log("Updated orders:", orders);
        callback(orders); // Invoke the callback with the updated orders
      });
  
      return unsubscribe;
    } catch (error) {
      console.error("Error getting orders:", error);
      throw error;
    }
  };
  