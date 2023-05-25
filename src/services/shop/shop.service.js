import { host } from "../../utils/env";

export const getShopMenuByShopUid = async (shopUid) => {
  try {
    const response = await fetch(`${host}/getShopMenuByShopUid?shopUid=${shopUid}`);
    if (!response.ok) {
      throw new Error("Failed to fetch menu.");
    }
    const menuData = await response.json();
    setMenu(menuData);
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
};