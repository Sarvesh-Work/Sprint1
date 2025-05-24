"use client";

import { getProfileApiCall } from "@/apiCalls/auth";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApiCall,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });
};

export default useProfile;
