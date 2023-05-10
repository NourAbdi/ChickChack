import camelize from "camelize";
import { host, isMock } from "../../utils/env";

export const locationRequest = async (city) => {
  const res = await fetch(`${host}/geocode?city=${city}&mock=${isMock}`);
  return await res.json();
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
