"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="navbar flex justify-between items-center py-4 ">
      <div className="text-primary text-3xl font-bold border-b-2 border-black">
        Notix
      </div>

      <div>
        <Link href="/signin" passHref>
          <Button variant="ghost" size="sm" aria-label="Sign In">
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
