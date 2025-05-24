import { Metadata } from "next";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Notix-Search",
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <main className="min-h-screen">{children}</main>;
};

export default DashboardLayout;
