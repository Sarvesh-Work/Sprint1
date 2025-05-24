"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactNode } from "react";

export const queryClient = new QueryClient();

const ProviderReactQuery = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ProviderReactQuery;
