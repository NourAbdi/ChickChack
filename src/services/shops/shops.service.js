import { host } from "../../utils/env";

export const getShopsByCityName = async (cityName) => {
  try {
    const response = await fetch(`${host}/getShopsByCityName?cityName=${cityName}`);
    if (!response.ok) {
      throw new Error("Failed to fetch shops.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch shops.");
  }
};

export const getShopMenu = async (shopUid) => {
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