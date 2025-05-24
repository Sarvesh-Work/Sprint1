"use client";

import { deleteNoteApiCall, featchNoteDeatailApiCall } from "@/apiCalls/auth";
import Loader from "@/components/Loader";
import NewNoteDialog from "@/components/NewNoteDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const NoteDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const transformedSlug = slug?.trim().toLowerCase().replace(/\s+/g, "-");

  const {
    data: note,
    isPending: isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["note-detail", transformedSlug],
    queryFn: () => featchNoteDeatailApiCall(transformedSlug),
    enabled: !!transformedSlug,
  });

  const { mutate: deleteNote, isPending: isDeleting } = useMutation({
    mutationFn: deleteNoteApiCall,
    onSuccess: () => {
      toast.success("Note deleted successfully");
      router.replace("/dashboard");
    },
    onError: () => {
      toast.error("Failed to delete the note");
    },
  });

  const handleDeleteNote = () => {
    if (note?.slug) deleteNote(note.slug);
  };

  if (isFetching || isDeleting) return <Loader />;

  if (isError) {
    return (
      <div className="flex justify-center items-center mt-10 text-red-600 font-semibold">
        Error fetching note: {error?.message}
      </div>
    );
  }

  return (
    <div className="mt-5 px-4 flex flex-col items-center space-y-6">
      <Button
        asChild
        className="px-4 py-2 text-sm bg-primary text-black rounded-md border-[1.5px] border-black font-semibold"
      >
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>

      <section className="max-w-3xl w-full rounded-md border-2 border-black bg-primary p-6 space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-black border-b border-black pb-1">
            Title
          </h2>
          <p className="pt-1 text-lg font-semibold text-black">{note?.title}</p>
        </header>

        <div>
          <h3 className="text-xl font-bold text-black border-b border-black pb-1">
            Content
          </h3>
          <p className="pt-2 text-base leading-relaxed text-gray-800">
            {note?.content}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-black border-b border-black pb-1">
            Category
          </h3>
          <p className="pt-2 text-base leading-relaxed text-gray-800">
            {note?.category}
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold border-b border-black pb-1">
              Created At
            </h4>
            <p className="pt-1 text-sm">{formatDate(note?.created_at)}</p>
          </div>
          <div>
            <h4 className="text-lg font-bold border-b border-black pb-1">
              Updated At
            </h4>
            <p className="pt-1 text-sm">{formatDate(note?.updated_at)}</p>
          </div>
        </div>
      </section>

      <div className="flex justify-center gap-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="text-black">Edit Note</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[500px] max-h-[85%] overflow-auto border-2 border-black">
            <DialogHeader />
            <NewNoteDialog
              title="Update your note"
              description="Want to do some changes?"
              note={note}
              slug={slug}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Button
          className="bg-red-500 text-black hover:bg-red-600"
          onClick={handleDeleteNote}
        >
          Delete Note
        </Button>
      </div>
    </div>
  );
};

export default NoteDetailPage;
