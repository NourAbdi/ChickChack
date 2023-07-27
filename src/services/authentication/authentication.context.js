import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../utils/env";
import {  PhoneAuthProvider, signInWithCredential, signOut } from "firebase/auth";

import { getTestUser, getUserByUid, checkUserExistence, changeUserName } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  
  useEffect(() => {
    if(!user){
      const u = getTestUser(setUser);
    }
  }, [user]);

  // Function to send verification code
  const sendVerificationCode = async (recaptchaVerifier) => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      console.log("Verification code has been sent to your phone:", verificationId);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // Function to confirm verification code
  const confirmVerificationCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      console.log("Check User Existence with phone number :", phoneNumber);
      const u = await checkUserExistence(phoneNumber);
      setUser(u);
      console.log("You are in!");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // Function to sign out the user
  const setUserName = async (uid, newName) => {
    try {
      await changeUserName(uid, newName);
      const newU = await getUserByUid(user.uid);
      setUser(newU);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // Function to sign out the user
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setPhoneNumber(null);
      setVerificationId(null);
      verificationCode(null);
      console.log("User signed out successfully.");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        getUserByUid,
        phoneNumber,
        setPhoneNumber,
        verificationId,
        setVerificationId,
        verificationCode,
        setVerificationCode,
        sendVerificationCode,
        confirmVerificationCode,
        setUserName,
        signOutUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
