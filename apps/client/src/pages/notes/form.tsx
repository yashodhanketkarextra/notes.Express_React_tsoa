import { useRef, useState } from "react";
import type { Note } from "@/components/types";

type CreateMutation = (title: string, content: string) => void;
type UpdateMutation = (note: Note) => void;

type NotesFormProps =
  | { mode: "create"; mutation: CreateMutation; note?: never }
  | { mode: "update"; mutation: UpdateMutation; note: Note };

export const NotesForm = (props: NotesFormProps) => {
  const { mode, mutation, note } = props;

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>,
    title: string,
    content: string,
  ) => {
    e.preventDefault();
    if (!title || !content) {
      return;
    }

    if (mode === "update") {
      mutation({ ...note, title, content });
    } else {
      mutation(title, content);
    }

    handleReset();
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setOpen(false);
  };

  const inputStyle =
    "p-2 rounded min-w-[10ch] bg-stone-950 text-stone-50 shadow hover:bg-stone-700 hover:text-stone-50 cursor-pointer";

  if (!open) {
    if (mode === "update")
      return (
        <button
          onClick={() => setOpen(true)}
          className={inputStyle + " absolute bottom-5 right-5"}
        >
          Update
        </button>
      );
    else
      return (
        <button
          onClick={() => setOpen(true)}
          className={inputStyle + " fixed bottom-20 right-10"}
        >
          Create Note
        </button>
      );
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      className="fixed top-0 right-0 h-screen w-screen bg-black/50 flex flex-col justify-center items-center"
    >
      <form
        className="mx-auto shadow w-1/2 lg:w-1/3 rounded p-4 flex flex-col justify-start gap-4 bg-stone-100 text-stone-800 rounded-lg"
        onSubmit={(e) => handleSubmit(e, title, content)}
        onReset={handleReset}
      >
        <h2 className="font-bold">Create Note</h2>
        <label htmlFor="notes-title">Title</label>
        <input
          type="text"
          name="title"
          id="notes-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="my-1 p-2 rounded w-full bg-stone-50 text-stone-950 shadow"
        />
        <label htmlFor="notes-content">Title</label>
        <textarea
          id="notes-content"
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="my-1 p-2 rounded w-full bg-stone-50 text-stone-950 shadow"
        />
        <div className="flex flex-col xl:flex-row gap-2 justify-center">
          <button className={inputStyle} type="submit">
            Submit
          </button>
          <button className={inputStyle} type="reset">
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};
