/* eslint-disable prettier/prettier */
import { signInWithEmailAndPassword } from "firebase/auth";
import { host } from "../../utils/env";

export const loginRequest = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const addUser = (uid, email) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, email })
  };
  fetch(`${host}/addUser`, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};