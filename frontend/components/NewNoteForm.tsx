import { addNewNoteApiCall, updateNoteApiCall } from "@/apiCalls/auth";
import { addNewNote, addNewNoteType } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { queryClient } from "@/lib/ProviderReactQuery";
import Loader from "./Loader";

export type CategoryType = "BUSINESS" | "IMPORTANT" | "PERSONAL";

type NewNoteFormProps = {
  onSuccess: () => void;
  note?: {
    title: string;
    content: string;
    category: CategoryType;
  };
  slug?: string;
};

const NewNoteForm = ({ onSuccess, note, slug }: NewNoteFormProps) => {
  const form = useForm<addNewNoteType>({
    resolver: zodResolver(addNewNote),
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
      category: note?.category || "PERSONAL",
    },
  });

  const {
    mutate: addNote,
    isPending: isAdding,
    error: addError,
    isError: isAddError,
  } = useMutation({
    mutationFn: (data: addNewNoteType) => addNewNoteApiCall({ data }),
    onSuccess: (newNote) => {
      toast.success("New note added", {
        description: "You can see your notes under dashboard",
      });

      queryClient.setQueryData(["user-notes"], (prev: any) =>
        prev ? [newNote, ...prev] : [newNote]
      );

      form.reset();
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to add note");
    },
  });

  const {
    mutate: updateNote,
    isPending: isUpdating,
    error: updateError,
    isError: isUpdateError,
  } = useMutation({
    mutationFn: (data: addNewNoteType) =>
      updateNoteApiCall({ slug: slug!, data }),
    onSuccess: () => {
      toast.success("Note updated successfully", {
        description: "You can see your notes under dashboard",
      });

      queryClient.invalidateQueries(["note-detail"]);
      queryClient.invalidateQueries(["user-notes"]);

      form.reset();
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update note");
    },
  });

  const onSubmit = (data: addNewNoteType) => {
    if (note && slug) {
      updateNote(data);
    } else {
      addNote(data);
    }
  };

  const isPending = isAdding || isUpdating;
  const error = addError || updateError;
  const isError = isAddError || isUpdateError;

  if (isPending) return <Loader />;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-4">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );

  const categories: CategoryType[] = ["PERSONAL", "BUSINESS", "IMPORTANT"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your note..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="border-b-[1.4px] border-gray-200 pb-5">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat[0] + cat.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full border-[1.4px] border-black text-black font-semibold"
        >
          {note ? "Update Note" : "Save Note"}
        </Button>
      </form>
    </Form>
  );
};

export default NewNoteForm;
