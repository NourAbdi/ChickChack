import { db } from "../../utils/env";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

export const getShopMenuByShopUid = async (shopUid) => {
  try {
    const shopRef = doc(db, "shops", shopUid);
    const shopDoc = await getDoc(shopRef);

    if (shopDoc.exists()) {
      const shopData = shopDoc.data();
      const menu = shopData.menu || [];

      const itemsCollection = collection(db, "items"); // Replace "items" with the actual collection name in your Firestore
      const q = query(itemsCollection, where("itemUid", "in", menu));
      const querySnapshot = await getDocs(q);

      const menuItems = [];
      querySnapshot.forEach((doc) => {
        menuItems.push(doc.data());
      });

      return menuItems;
    } else {
      throw new Error("Shop not found.");
    }
  } catch (error) {
    console.error("Error fetching shop menu:", error);
    return null;
  }
};
