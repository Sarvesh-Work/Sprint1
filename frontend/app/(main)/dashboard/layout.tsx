"use client";

import DashbordNavbar from "@/components/DashbordNavbar";
import { useRequireAuth } from "@/hooks/userHooks";

import { Loader2 } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isLoading, shouldRender } = useRequireAuth();

  if (isLoading || !shouldRender) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <DashbordNavbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
