import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebaseConfig";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loginWithGoogle: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | null>;
  printToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const checkIfNewUser = async (user: User) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User signed in: ", user);
        setUser(user);
        setIsAuthenticated(true);
        await checkIfNewUser(user);
        const token = await user.getIdToken();
        setToken(token);
      } else {
        console.log("No user signed in");
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google login successful: ", user);
      await checkIfNewUser(user);
      const token = await user.getIdToken();
      setToken(token);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn("The user closed the Google sign-in popup.");
      } else {
        console.error("Google login failed", error);
      }
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Email login successful: ", user);
      setUser(user);
      setIsAuthenticated(true);
      await checkIfNewUser(user);
      const token = await user.getIdToken();
      setToken(token);
    } catch (error) {
      console.error("Email login failed", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
  };

  const getToken = useCallback(async () => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }, [user]);

  const printToken = useCallback(async () => {
    if (user) {
      const token = await user.getIdToken();
      console.log("Firebase ID Token: ", token);
    } else {
      console.log("No user authenticated.");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginWithGoogle, loginWithEmail, logout, getToken, printToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};