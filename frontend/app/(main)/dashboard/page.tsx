"use client";

import { getUserNotes } from "@/apiCalls/auth";
import DashbordPageDetails from "@/components/DashbordPageDetails";
import Notes from "@/components/Notes";
import { useUser } from "@/lib/UserContext";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { user } = useUser();

  const {
    data: notes = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["user-notes"],
    queryFn: getUserNotes,
    enabled: !!user, 
  });

  if (!user) {
    return (
      <div className="text-center text-muted-foreground mt-10">
        Please login to view your notes.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error.message || "Something went wrong."}
      </div>
    );
  }


  return (
    <main>
      <DashbordPageDetails user={user} />
      <Notes notes={notes} isPending={isPending} />
    </main>
  );
};

export default Dashboard;
