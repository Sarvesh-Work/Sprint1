import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication page for Notix",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className=" flex  justify-center items-center">{children}</div>;
};

export default AuthLayout;
