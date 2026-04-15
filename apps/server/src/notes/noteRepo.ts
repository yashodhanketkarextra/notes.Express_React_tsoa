import Prisma from "../client/prisma.js";
import { NoteCreateInput, NoteModel } from "../generated/prisma/models/Note.js";

export class Repository {
  public async createNote(data: NoteCreateInput) {
    return await Prisma.note.create({ data });
  }

  public async getSelfNotes(id: number) {
    return await Prisma.note.findMany({ where: { authorId: id } });
  }

  public async getNote(id: number) {
    return await Prisma.note.findUnique({ where: { id } });
  }

  public async getNotes(id: number) {
    return await Prisma.note.findMany({ where: { authorId: id } });
  }

  public async updateNote(id: number, data: NoteModel) {
    return await Prisma.note.update({ where: { id }, data });
  }

  public async deleteNote(id: number) {
    return await Prisma.note.delete({ where: { id } });
  }
}
