"use client";

import NewNoteForm, { CategoryType } from "./NewNoteForm";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const NewNoteDialog = ({
  onSuccess,
  title,
  description,
  note,
  slug,
}: {
  onSuccess: () => void;
  title: string;
  description: string;
  note?: {
    title: string;
    content: string;
    category: CategoryType;
  };
  slug?: string;
}) => {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription className="border-b-[1.4px] border-gray-200 pb-2">
        {description}
      </DialogDescription>
      <NewNoteForm onSuccess={onSuccess} note={note} slug={slug} />
    </DialogHeader>
  );
};

export default NewNoteDialog;
