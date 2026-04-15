import { useEffect, useState } from "react";
import { NotesForm } from "./form";
import { NotesList } from "./list";
import type { Note } from "@/components/types";
import { api } from "@/api/client";

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    api
      .get("/notes")
      .then((res) => res.data)
      .then((data) => setNotes(data));
  }, []);

  const createNote = (title: string, content: string) => {
    api
      .post("/notes", { title, content })
      .then((res) => res.data)
      .then((data) => {
        setNotes([...notes, data]);
      });
  };

  return (
    <div className="m-4 flex flex-col gap-4 h-[80vh]">
      <h1 className="text-2xl font-bold md:col-span-4">Notes</h1>
      <NotesForm mutation={createNote} mode="create" />
      <NotesList notes={notes} setNotes={setNotes} />
    </div>
  );
};
