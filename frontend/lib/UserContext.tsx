"use client";


import useProfile from "@/hooks/useProfile";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserData = {
  name: string;
  email: string;
} | null;

type UserContextType = {
  user: UserData;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending } = useProfile();
  const [user, setUser] = useState<UserData>(null);

  useEffect(() => {
    setUser(data ?? null);
  }, [data]);

  return (
    <UserContext.Provider value={{ user, isLoading: isPending }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
