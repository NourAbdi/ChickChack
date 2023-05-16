import React, { useState, useEffect, createContext, useRef } from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { loginRequest, addUser, getUserRole } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false); // New state variable
  const [error, setError] = useState(null);
  const auth = useRef(getAuth()).current;

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setRoleLoading(true); // Start loading role
      // fetchUserRole(usr.uid);
    } else {
      setUser(null);
      setRole(null);
      // setIsLoading(false);
    }
  });

  useEffect(() => {
    if (user && user.uid &&!role) { 
      console.log("11111111111111111111111 user: ", user.uid);
      console.log("go get the role : ");
      getUserRole(user.uid)
        .then((response) => {
          console.log("data: ", response);
          setRole(response);
        })
        .catch((error) => {
          console.error("Failed to get user role:", error);
        })
        .finally(() => {
          setRoleLoading(false); // Finish loading role
        });
    }
  }, [user]);
  

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((u) => {
        setUser(u);
        // fetchUserRole(u.user.uid)
      })
      .catch((e) => {
        // setIsLoading(false);
        setError(e.toString());
      });
      // setIsLoading(false);
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    const role = "client"; // declare role here
    setRole(role);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        addUser(user.uid, email, role)
          .then(() => {
            setUser(user);
          })
          .catch((error) => {
            console.log("Error adding user:", error);
            setError(error.message);
          });
      })
      .catch((error) => {
        // setIsLoading(false);
        setError(error.toString());
      });
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setRole(null);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        role,
        isLoading: !!(user&&role),
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
