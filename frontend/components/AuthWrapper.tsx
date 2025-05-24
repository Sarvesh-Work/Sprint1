"use client";

import { Notebook } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthWrapperProps {
  title: ReactNode;
  description: string;
  children: ReactNode;
}

const AuthWrapper = ({ title, description, children }: AuthWrapperProps) => {
  return (
    <div className="flex  items-center justify-center min-h-screen px-4 py-8 bg-background animate-fadeInUpSlow">
      <div className="w-full max-w-5xl flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        <div className="w-full  border-2 border-black md:w-1/2 p-6 sm:p-8 rounded-2xl shadow-lg bg-white animate-zoomFadeIn">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-3xl font-bold text-primary mb-6 hover:opacity-90 transition-opacity"
            aria-label="Go to homepage"
          >
            <Notebook className="size-8" />
            <span>Notix</span>
          </Link>
          {children}
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
