import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, onAuthStateChanged, signOut, getRedirectResult, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { auth, db } from "../firebaseConfig";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isNewUser: boolean;
  auth: any;
  loginWithGoogle: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("onAuthStateChanged:", { user });
      if (user) {
        if (user.emailVerified) {
          setUser(user);
          setIsAuthenticated(true);
        } else {
          await signOut(auth);
          setUser(null);
          setIsAuthenticated(false);
          alert("Please verify your email before logging in.");
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        setIsNewUser(!userDoc.exists());
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    getRedirectResult(auth)
      .then((result) => {
        console.log("getRedirectResult:", { result });
        if (result?.user) {
          setUser(result.user);
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        console.error("Error handling redirect result", error);
      });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login failed", error);
      alert(`Google login failed: ${error.message}`);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        alert("Please verify your email before logging in.");
        await signOut(auth);
      }
    } catch (error) {
      console.error("Email login failed", error);
      alert(`Email login failed: ${error.message}`);
    }
  };

  const registerWithEmail = async (email: string, password: string): Promise<UserCredential> => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isNewUser, loginWithGoogle, loginWithEmail, registerWithEmail, logout, auth }}>
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
