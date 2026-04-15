import type { Request as ExRequest } from "express";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";

import { type NoteModel } from "../generated/prisma/models/Note.js";
import { Service } from "./noteService.js";

type NoteCreateInputDTO = {
  title: string;
  content: string;
};

type NoteUpdatenputDTO = {
  id: number;
  title: string;
  content: string;
  authorId: number;
};

@Route("notes")
@Tags("notes")
export class NoteController extends Controller {
  private svc = new Service();

  @Get("{id}")
  public async getNote(id: string): Promise<NoteModel | null> {
    return await this.svc.getNote(Number(id));
  }

  @Get("")
  @Security("jwt")
  public async getNotes(@Request() req: ExRequest): Promise<NoteModel[]> {
    const user = (req as any).user as { id: number; role: string };
    return await this.svc.getSelfNotes(user.id);
  }

  @Post()
  @Security("jwt")
  public async createNote(
    @Body() requestBody: NoteCreateInputDTO,
    @Request() req: ExRequest,
  ): Promise<NoteModel> {
    const user = (req as any).user as { id: number; role: string };
    return await this.svc.createNote(requestBody, user.id);
  }

  @Patch("{id}")
  @Security("jwt")
  public async updateNote(
    @Path() id: string,
    @Body() requestBody: NoteUpdatenputDTO,
    @Request() req: ExRequest,
  ): Promise<NoteModel> {
    const user = (req as any).user as { id: number; role: string };
    return await this.svc.updateNote(Number(id), requestBody, user.id);
  }

  @Delete("{id}")
  @Security("jwt")
  public async deleteNote(@Path() id: string, @Request() req: ExRequest): Promise<NoteModel> {
    const user = (req as any).user as { id: number; role: string };
    return await this.svc.deleteNote(Number(id), user.id);
  }
}
