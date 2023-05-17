import { signInWithEmailAndPassword } from "firebase/auth";
import { host } from "../../utils/env";

export const loginRequest = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const addUser = (uid, email, role) => {
  console.log('Making addUser request:', JSON.stringify({ uid, email, role }));
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, email, role })
  };
  fetch(`${host}/addUser`, requestOptions)
    .then(response => response.json())
    .then(data => console.log('addUser response:', data))
    .catch(error => console.error('addUser error:', error));
};

export const getUserRole = async (uid) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(`${host}/getUserRole?uid=${uid}`, requestOptions);
  const data = await response.json();
  return data;
    // .catch(error => console.log(error));
};



export const getUsers = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  fetch(`${host}/getUsers`, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};
