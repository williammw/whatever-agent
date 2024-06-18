// import axios from 'axios';
// import { signInWithEmailAndPassword, signInWithPopup, signOut, auth, GoogleAuthProvider } from '../firebaseConfig';

// const apiBaseUrl = import.meta.env.VITE_APP_APIURL;
// const API_URL = `${apiBaseUrl}/api/v1/auth`;

// export const login = async (email: string, password: string) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   const idToken = await userCredential.user.getIdToken();
  
//   const response = await axios.post(`${API_URL}/token`, { id_token: idToken });
//   if (response.data.access_token) {
//     localStorage.setItem('token', response.data.access_token);
//   }
//   return response.data;
// };

// export const loginWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   const userCredential = await signInWithPopup(auth, provider);
//   const idToken = await userCredential.user.getIdToken();
  
//   const response = await axios.post(`${API_URL}/token`, { id_token: idToken });
//   if (response.data.access_token) {
//     localStorage.setItem('token', response.data.access_token);
//   }
//   return response.data;
// };

// export const logout = async () => {
//   await signOut(auth);
//   localStorage.removeItem('token');
// };

// export const getCurrentUser = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) return null;

//   try {
//     const response = await axios.get(`${API_URL}/users/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };