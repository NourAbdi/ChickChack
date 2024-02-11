import { db } from "../../utils/env";
import { collection, getDocs } from "firebase/firestore";

export const getAllShopCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "shopsCategorys"));
    const shopCategories = [];
    querySnapshot.forEach((doc) => {
      // Extract each document's data and push it into the array
      const categoryData = doc.data();
      shopCategories.push({
        categoryId: doc.id,
        ...categoryData,
      });
    });
    return shopCategories;
  } catch (error) {
    console.error("Error getting shop categories:", error);
    return [];
  }
};

export default getAllShopCategories;
