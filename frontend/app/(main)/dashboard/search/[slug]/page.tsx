"use client";

import { fetchNotesByQuery } from "@/apiCalls/auth";
import Loader from "@/components/Loader";
import { Note, NoteCard } from "@/components/Notes";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

const SearchNotePage = () => {
  const { slug } = useParams();

  const { data: notes, isPending } = useQuery({
    queryKey: ["searched-notes", slug],
    queryFn: () => fetchNotesByQuery(slug as string),
    enabled: !!slug,
    retry: false,
  });

  if (isPending) return <Loader />;

  return (
    <div className="py-4">
      <div className="flex pb-4 border-b border-gray-400 justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Search Results for "<span className="text-blue-600">{slug}</span>"
        </h2>
        <Button
          asChild
          className="px-4 py-2 text-sm bg-primary text-black  rounded-md border-[1.5px] border-black font-semibold "
        >
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>

      {(notes?.length == 0 || notes == null) && (
        <div className="mt-10 w-full text-2xl text-center text-muted-foreground">
          There are no notes for {slug}
        </div>
      )}

      <div className="grid grid-cols-1 w-f mt-5 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {notes?.map((note: Note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default SearchNotePage;
