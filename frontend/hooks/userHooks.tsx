"use client";

import { queryClient } from "@/lib/ProviderReactQuery";
import { useUser } from "@/lib/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = () => {
  const { user, isLoading } = useUser();
  const cachedUser = queryClient.getQueryData(["profile"]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user && !cachedUser) {
      router.replace("/signin");
    }
  }, [user, isLoading, router]);

  const shouldRender = !isLoading && !!user;

  return { user, isLoading, shouldRender };
};

export const useRedirectIfAuthenticated = () => {
  const { user, isLoading } = useUser();
  const cachedUser = queryClient.getQueryData(["profile"]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && cachedUser) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  const shouldRender = !isLoading && !user;

  return { user, isLoading, shouldRender };
};
