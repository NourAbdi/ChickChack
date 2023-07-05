import { Platform } from "react-native";

const liveHost = "https://us-central1-chickchack-3069a.cloudfunctions.net";
const localHost = "https://localhost:5001/chickchack-3069a/us-central1";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;
// export const host = !isDevelopment || isAndroid ? liveHost : localHost;
export const host = liveHost ;



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWkA7XZsBTOGfiRh9YGTDrbzcusOJUhcs",
  authDomain: "chickchack-3069a.firebaseapp.com",
  databaseURL: "https://chickchack-3069a-default-rtdb.firebaseio.com",
  projectId: "chickchack-3069a",
  storageBucket: "chickchack-3069a.appspot.com",
  messagingSenderId: "497036758885",
  appId: "1:497036758885:web:6c1d2e545d8a8bf35cdb8c"
};
  
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
