import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth as authorization } from "../firebase/firebaseFunctions";

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
    console.log("called logout user")
    try {
      await signOut(authorization);
    } catch (error: any) {
      console.log(error.message);
    }
    finally{
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