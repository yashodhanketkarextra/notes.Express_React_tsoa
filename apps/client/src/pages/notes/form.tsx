import type { Note } from "@/components/types";
import { useState, type SubmitEvent } from "react";

interface BaseFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => void;
  onClose: () => void;
  titleLabel: string;
}

export const BaseForm = ({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  onClose,
  titleLabel,
}: BaseFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onSubmit(title, content);
  };

  return (
    <dialog
      open
      className="fixed inset-0 h-screen w-screen bg-black/50 flex justify-center items-center"
    >
      <form
        className="bg-stone-100 p-4 rounded-lg flex flex-col gap-4 w-1/3"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold">{titleLabel}</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-2 shadow"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="p-2 shadow"
          rows={5}
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-stone-950 text-white p-2 flex-1">
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-stone-950 text-white p-2 flex-1"
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};

export const UpdateNoteForm = ({
  note,
  onUpdate,
}: {
  note: Note;
  onUpdate: (note: Note) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (
      <button
        className="bg-stone-950 text-white px-2 py-1 flex-1 rounded absolute bottom-5 right-5"
        onClick={() => setIsOpen(true)}
      >
        Update
      </button>
    );

  return (
    <BaseForm
      titleLabel="Edit Note"
      initialTitle={note.title}
      initialContent={note.content}
      onClose={() => setIsOpen(false)}
      onSubmit={(t, c) => {
        onUpdate({ ...note, title: t, content: c });
        setIsOpen(false);
      }}
    />
  );
};

export const CreateNoteForm = ({
  onCreate,
}: {
  onCreate: (t: string, c: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (
      <button
        className="bg-stone-950 text-white p-2 flex-1 rounded fixed bottom-15 right-5 font-bold text-lg"
        onClick={() => setIsOpen(true)}
      >
        Create Note
      </button>
    );

  return (
    <BaseForm
      titleLabel="New Note"
      onClose={() => setIsOpen(false)}
      onSubmit={(t, c) => {
        onCreate(t, c);
        setIsOpen(false);
      }}
    />
  );
};
