import { UserData } from "@/lib/UserContext";

type DashbordPageDetailsProps = {
  user: UserData;
};

export default function DashbordPageDetails({
  user,
}: DashbordPageDetailsProps) {
  return (
    <div className="px-1 py-5 mt-10 flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end border-b">
      <div className="text-center md:text-left">
        <h3 className="text-4xl font-semibold">Hi, {user?.name}!</h3>
        <p className="text-[17px] text-muted-foreground">
          Thanks for using Notix
        </p>
      </div>

      <div className="text-muted-foreground font-semibold text-[20px] mt-5 md:mt-0 border-b-2 border-primary">
        Your Notes
      </div>
    </div>
  );
}
