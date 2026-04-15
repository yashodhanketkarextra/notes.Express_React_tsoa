import { NoteCreateInput, NoteModel } from "../generated/prisma/models/Note.js";
import { Repository } from "./noteRepo.js";

export class Service {
  private repo = new Repository();

  public async getNote(id: number) {
    return await this.repo.getNote(id);
  }

  public async getSelfNotes(auhtorId: number) {
    return await this.repo.getSelfNotes(auhtorId);
  }

  public async createNote(note: Omit<NoteCreateInput, "author">, authorId: number) {
    return await this.repo.createNote({ ...note, author: { connect: { id: authorId } } });
  }

  public async updateNote(id: number, note: NoteModel, authorId: number) {
    if (note.authorId !== authorId) {
      throw new Error("Invalid note id");
    }

    return await this.repo.updateNote(id, note);
  }

  public async deleteNote(id: number, authorId: number) {
    const note = await this.repo.getNote(id);
    if (!note) {
      throw new Error("Invalid note id");
    }

    if (note.authorId !== authorId) {
      throw new Error("Forbidden");
    }

    return await this.repo.deleteNote(id);
  }
}
