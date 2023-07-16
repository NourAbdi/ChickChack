import { db, auth } from "../../utils/env";
import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

export const getUserByUid = async (uid) => {
  try {
    const userRef = doc(collection(db, "users"), uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User data:", userData);
      return userData;
    } else {
      console.log("User not found in the database.");
      return null;
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

export const checkUserExistence = async (phoneNumber) => {
  try {
    // Query the "users" collection for a user with the given phone number
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
    const querySnapshot = await getDocs(q);
    const uid = auth.currentUser.uid;

    // If no user with the given phone number exists, add them to the database
    if (querySnapshot.empty) {
      const newUser = {
        phoneNumber: phoneNumber,
        role: "client",
        uid: uid
        // Add other user data as needed
      };

      const newUserRef = doc(collection(db, "users"), auth.currentUser.uid);
      await setDoc(newUserRef, newUser);
      console.log("New user added to the database:", newUser);
      return newUser;
    } else {
      console.log("User already exists in the database.");
      const existingUserDoc = querySnapshot.docs[0];
      const existingUser = existingUserDoc.data();
      console.log("Existing user data:", existingUser);
      return existingUser;
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

export const changeUserName = async (uid, newName) => {
  try {
    const userRef = doc(collection(db, "users"), uid);

    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    const updatedUserData = {
      ...userData,
      name: newName || ''
    };

    await setDoc(userRef, updatedUserData);
  } catch (err) {
    console.log("Error:", err);
  }
};


