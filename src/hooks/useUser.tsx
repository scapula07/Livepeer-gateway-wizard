import { AuthResponse } from "@/lib/types/auth.type";
import { useLocalStorage } from "usehooks-ts";

const storageKey = "user";

export const useUser = () => {
  const [user, setUser, removeUser] = useLocalStorage<AuthResponse>(
    storageKey,
    {
      email: "",
      id: "",
    }
  );

  const addUser = (user: AuthResponse) => {
    setUser(user);
  };

  return {
    user,
    addUser,
    removeUser,
  };
};
