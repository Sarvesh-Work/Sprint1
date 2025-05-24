"use client";
import { queryClient } from "@/lib/ProviderReactQuery";
import { UserData } from "@/lib/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

type AuthFunction = ({
  url,
  data,
}: {
  url: string;
  data: {
    email: string;
    password: string;
    name?: string;
  };
}) => Promise<UserData>;

const useAuth = (Function: AuthFunction) => {
  const Router = useRouter();

  return useMutation({
    mutationFn: Function,
    onSuccess: (data: UserData) => {
      queryClient.setQueryData(["profile"], data);
      if (data) Router.replace("/dashboard");
    },
  });
};

export default useAuth;
