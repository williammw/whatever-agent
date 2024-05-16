// src/firebaseMessaging.ts
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "./firebaseConfig";

const messaging = getMessaging(firebaseApp);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "<YOUR_VAPID_KEY>" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other operation with the token
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
