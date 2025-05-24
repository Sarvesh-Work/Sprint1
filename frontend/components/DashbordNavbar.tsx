"use client";

import { logoutApiCall } from "@/apiCalls/auth";
import { queryClient } from "@/lib/ProviderReactQuery";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

const DashbordNavbar = () => {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApiCall,
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug.trim()) return;
    router.push(`/dashboard/search/${slug}`);
  };

  return (
    <nav className="navbar flex justify-between items-center py-4 ">
      <div className="text-primary text-3xl font-bold border-b-2 border-black">
        Notix
      </div>

      <form onSubmit={handleSearch} className="relative  w-1/2 md:w-1/3">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          className="pl-10 border-[1.4px]"
          placeholder="Search your note..."
          aria-label="Search Notes"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </form>

      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => logout()}
          disabled={isLoggingOut}
          aria-label="Sign Out"
        >
          {isLoggingOut ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            "Sign Out"
          )}
        </Button>
      </div>
    </nav>
  );
};

export default DashbordNavbar;
