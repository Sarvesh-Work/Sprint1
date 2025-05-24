"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { memo, useMemo, useState } from "react";
import Loader from "./Loader";
import NewNoteDialog from "./NewNoteDialog";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

const NOTES_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "business", label: "Business" },
  { id: "personal", label: "Personal" },
  { id: "important", label: "Important" },
];

export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  category: string;
  slug: string;
};

type NotesProps = {
  notes: Note[];
  isPending: boolean;
};

const truncate = (text: string, limit: number): string =>
  text.length > limit ? text.slice(0, limit) + "..." : text;

const getCategoryColor = (category: string): string => {
  const map: Record<string, string> = {
    important: "bg-red-400",
    personal: "bg-green-400",
    business: "bg-orange-400",
  };
  return map[category.toLowerCase()] || "bg-gray-400";
};

const NotesItem = memo(
  ({
    label,
    active,
    onClick,
    disabled,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
    disabled: boolean;
  }) => (
    <Button
      onClick={onClick}
      className={`px-3 md:py-2 py-1 rounded-md border-[1.4px] border-black cursor-pointer transition-colors ${
        active
          ? "bg-primary text-black font-bold"
          : "bg-muted/20 hover:bg-muted text-muted-foreground font-medium"
      }`}
      disabled={disabled}
    >
      <span className="text-sm">{label}</span>
    </Button>
  )
);

export const NoteCard = memo(({ note }: { note: Note }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/note/${note.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 cursor-pointer transition-transform duration-300 hover:scale-[1.02] border-black p-3 bg-primary rounded-md group relative overflow-hidden flex flex-col justify-between hover:shadow-md"
    >
      <div className="p-1">
        <h3 className="font-semibold text-[1.2rem]">
          {truncate(note.title, 15)}
        </h3>
        <p className="mt-3">{truncate(note.content, 100)}</p>
      </div>
      <div className="mt-3 px-1 space-x-6 flex justify-between items-center">
        <div className="space-y-1">
          <div className="font-semibold px-1">
            {formatDate(note.created_at)}
          </div>
          <div
            className={`${getCategoryColor(
              note.category
            )} font-semibold text-center rounded-md border-[1.5px] border-black px-2 py-0.5`}
          >
            {note.category}
          </div>
        </div>
        <div className="rounded-full bg-white p-2 border-[1.8px] border-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <Pencil className="size-6" />
        </div>
      </div>
    </div>
  );
});

const Notes = ({ notes, isPending }: NotesProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return activeCategory === "all"
      ? notes
      : notes.filter(
          (note) => note.category.toLowerCase() === activeCategory.toLowerCase()
        );
  }, [notes, activeCategory]);

  if (isPending) return <Loader />;

  return (
    <main>
      <div className="mt-4 flex justify-between md:items-center gap-3">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {NOTES_CATEGORIES.map((item) => (
            <NotesItem
              key={item.id}
              label={item.label}
              active={item.id === activeCategory.toLowerCase()}
              onClick={() => setActiveCategory(item.id)}
              disabled={notes.length === 0}
            />
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 border-[1.4px] border-black font-semibold text-black">
              <span className="hidden md:inline">Add Note</span>
              <Plus className="size-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[500px] max-h-[95%] overflow-auto border-2 border-black">
            <NewNoteDialog
              title="Add New Note"
              description="Fill in the form below and click save to add a new note."
              onSuccess={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-2xl w-full text-center pt-20 text-muted-foreground">
          {activeCategory === "all"
            ? "There are no notes created by you."
            : `There are no notes under ${activeCategory}.`}
        </div>
      ) : (
        <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Notes;
