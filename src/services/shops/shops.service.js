import { db } from "../../utils/env";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export const getShopsByCityName = async (cityName) => {
  try {
    const shopCollection = collection(db, "shops"); // Replace "shops" with the actual collection name in your Firestore
    
    const q = query(shopCollection, where("city", "==", cityName)); // Assuming you have a "city" field in each shop document
    
    const querySnapshot = await getDocs(q);
    
    const shops = [];
    querySnapshot.forEach((doc) => {
      shops.push(doc.data());
    });
    
    return shops;
  } catch (error) {
    throw new Error("Failed to fetch shops.");
  }
};
