import { host, db } from "../../utils/env";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getAllCities = async () => {
  try {
    const citiesRef = collection(db, "cities");
    const citiesSnapshot = await getDocs(citiesRef);
    const cities = citiesSnapshot.docs.map((doc) => doc.data());
    return cities;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting cities");
  }
};

export const saveLastLocation = async (userUid, location) => {
  try {
    await updateDoc(doc(db, "users", userUid), {
      lastLocation: location,
    });
  } catch (error) {
    console.error("Error saving last location:", error);
  }
};

export const getLastLocation = async (userUid, setCurrentLocation) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userUid));
    if (userDoc.exists() && userDoc.data().lastLocation) {
      const location = userDoc.data().lastLocation;
      setCurrentLocation({ location, focused: false });
    }
  } catch (error) {
    console.error("Error retrieving last location:", error);
  }
};