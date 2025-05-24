import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import HeroImage from "../../public/HeroImage.png";

const HeroSection = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center mt-17">
        <p className="text-2xl md:text-3xl font-bold mb-4">
          <span>
            {`"`}
            <span className="text-primary">Write It Down.</span>
            Remember <span className="text-primary">{`Everything.`}</span>
            {`"`}
          </span>
          <br /> A clean, distraction-free space to store your{" "}
          <span className="text-primary">thoughts.</span>
        </p>
      </div>

      <div className="bg-primary md:h-full h-[300px] relative w-full p-3 shadow-2xl  rounded-md mt-5  flex justify-center items-center">
        <Image
          src={HeroImage}
          alt="HeroImage"
          className="rounded-md w-full h-full "
        />

        <Button
          asChild
          variant="outline"
          className="group absolute shadow-2xs mt-6 border-[1.8px] border-black text-primary text-[1.1rem] font-semibold transition-all duration-200 ease-in-out hover:bg-primary  hover:scale-105 active:scale-100 transform"
        >
          <Link
            href="/signin"
            className="flex items-center gap-2 transform transition-all duration-300 ease-in-out group-hover:animate-none animate-bounce"
          >
            Try Notix
            <ArrowUpRight className="text-black transition-transform duration-300 group-hover:translate-x-[0.2rem]" />
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default HeroSection;

{
  /* <Button
asChild
variant="outline"
className="group mt-6 border-[1.4px] border-black text-primary text-[1.1rem] font-semibold transition-all duration-200 ease-in-out hover:bg-primary  hover:scale-105 active:scale-100 transform"
>
<Link
  href="/signin"
  className="flex items-center gap-2 transform transition-all duration-300 ease-in-out group-hover:animate-none animate-bounce"
>
  Try Notix
  <ArrowUpRight className="text-black transition-transform duration-300 group-hover:translate-x-[0.2rem]" />
</Link>
</Button> */
}
