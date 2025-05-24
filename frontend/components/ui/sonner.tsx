"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        style: {
          background: "#2B7FFF",
          border: "2px solid black",
          color: "black",
          fontWeight: "bold",
          fontSize: "17px",
        },
        descriptionClassName: "text-black text-sm",
        duration: 4000,
      }}
      {...props}
    />
  );
};

export { Toaster };
