import { host } from "../../utils/env";

export const getCityByName = async (cityName) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(`${host}/getCityByName?cityName=${cityName}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting city details');
  }
};

