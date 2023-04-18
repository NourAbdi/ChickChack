import { Platform } from "react-native";

const liveHost = "https://us-central1-chickchack-3069a.cloudfunctions.net";
const localHost = "https://localhost:5001/chickchack-3069a/us-central1";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;
// export const host = !isDevelopment || isAndroid ? liveHost : localHost;
export const host = liveHost ;
