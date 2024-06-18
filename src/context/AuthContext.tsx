import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import axios from 'axios';
import { auth, provider } from '../firebaseConfig';

const apiBaseUrl = import.meta.env.VITE_APP_APIURL;
const API_URL = `${apiBaseUrl}/api/v1/auth`;

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await handleAuthToken(idToken);
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error('Error logging in with email and password:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await handleAuthToken(idToken);
      setCurrentUser(result.user);
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('token');
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAuthToken = async (idToken: string) => {
    try {
      const response = await axios.post(`${API_URL}/token`, { id_token: idToken });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
    } catch (error) {
      console.error('Error handling auth token:', error);
      throw error;
    }
  };

  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await handleAuthToken(idToken);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithEmail,
    loginWithGoogle,
    logout,
    isAuthenticated: !!currentUser,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};