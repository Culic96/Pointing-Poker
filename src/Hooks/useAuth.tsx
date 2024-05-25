import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState, Context } from "react";
import { auth as authorization, firestore } from "../firebase/firebaseFunctions";
import { doc, updateDoc } from "firebase/firestore";

export interface Auth {
  userId: string;
  email: string;
}

export interface AuthContext {
  auth: Auth | null;
  logoutUser: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  logoutUser: async () => void 0,
});

function useAuthProvider(): AuthContext {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(authorization, (authState: User | null) => {
      if (authState) {
        setAuth({
          userId: authState.uid,
          email: authState.email!,
        });
      } else {
        setAuth(null);
      }
    });
    return unsub;
  }, []);

  const logoutUser = async () => {
    try {
      if (auth && auth.userId) {
        const userDocRef = doc(firestore, "users", auth.userId);
        await updateDoc(userDocRef, {
          isOnline: false,
          hasVoted: false,
          points: 0,
          showVotes: false
        });
      }

      setAuth(null);  // Ensure auth state is set to null before sign out

      await signOut(authorization);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    auth,
    logoutUser,
  };
}

const AuthProvider = (props: { children: ReactNode }): JSX.Element => {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
};

const useAuth = (): AuthContext => useContext(authContext);

export { useAuth, AuthProvider };
