import type { Note } from "@/components/types";
import { NotesForm } from "./form";
import { api } from "@/api/client";

export const NotesList = ({
  notes,
  setNotes,
}: {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) => {
  const updateNote = (updatedNote: Note) => {
    api
      .patch(`/notes/${updatedNote.id}`, { ...updatedNote })
      .then((res) => res.data)
      .then((data: Note) => {
        const updatedList = notes.map((n) => (n.id === data.id ? data : n));
        setNotes(updatedList);
      })
      .catch(console.error);
  };

  const isEmpty = (arr: any[] | undefined): boolean => {
    if (!arr) return true;
    return arr.length === 0;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 shadow bg-stone-400 rounded-lg overflow-y-auto p-2 gap-2">
      {!isEmpty(notes) &&
        notes
          .sort((a, b) => Number(a.id) - Number(b.id))
          .map((note) => (
            <div
              key={note.id}
              className="bg-stone-50 shadow p-2 rounded lg:h-36 relative"
            >
              <p className="font-bold text-lg">{note.title}</p>
              <p>{note.content}</p>
              <NotesForm
                mode="update"
                mutation={(updatedField) =>
                  updateNote({ ...note, ...updatedField })
                }
                note={note}
              />
            </div>
          ))}
    </div>
  );
};
