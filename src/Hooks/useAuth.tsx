import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
    const unsub = onAuthStateChanged(
      authorization,
      async (authState: User | null) => {
        if (!authState) {
          return;
        }

        setAuth({
          userId: authState.uid,
          email: authState.email!,
        });
      }
    );
    return unsub;
  }, []);

  const logoutUser = async () => {
    try {
      if (auth && auth.userId) {
        // Update Firestore document to set isOnline to false
        const userDocRef = doc(firestore, "users", auth.userId);
        await updateDoc(userDocRef, {
          isOnline: false,
        });
      }
  
      // Sign out the user
      await signOut(authorization);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setAuth(null);
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