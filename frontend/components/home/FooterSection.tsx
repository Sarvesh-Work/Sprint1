import Image from "next/image";
import GitHub from "../../public/icons/github.png";

const FooterSection = () => {
  return (
    <div className="p-4 flex flex-col  mt-12">
      <div className="p-[1px] bg-black w-full rounded-3xl" />
      <div className="flex  mt-3 justify-between items-center">
        <div className="md:flex  space-x-1">
          <div className=" text-[18px] text-primary font-semibold">
            Created by:
          </div>
          <p className=" text-[18px]">Sarvesh Munde & Sakib Mulan</p>
        </div>
        <a href="https://github.com/Sarvesh-Work/Notes-App">
          <Image src={GitHub} alt="git-hub" className="size-9" />
        </a>
      </div>
    </div>
  );
};

export default FooterSection;
