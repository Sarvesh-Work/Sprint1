import FooterSection from "@/components/home/FooterSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notix-Dashboard",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:px-28 px-2 py-1">
      {children}
      <FooterSection />
    </div>
  );
};

export default HomeLayout;
