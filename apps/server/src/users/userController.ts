import { Body, Controller, Get, Post, Route, Security, Tags } from "tsoa";

import { type AccountModel } from "../generated/prisma/models/Account.js";
import { Service } from "./userService.js";

type AccountCreateInputDTO = {
  name: string;
  password: string;
  role: "USER" | "ADMIN";
};

@Route("users")
@Tags("User")
export class UserController extends Controller {
  private svc = new Service();

  @Get("{id}")
  @Security("jwt", ["admin"])
  public async getUser(id: string): Promise<AccountModel | null> {
    return await this.svc.getUser(id);
  }

  @Post()
  public async createUser(@Body() requestBody: AccountCreateInputDTO): Promise<AccountModel> {
    this.setStatus(201);
    return await this.svc.createUser(requestBody);
  }

  @Post("login")
  public async login(
    @Body() requestBody: { name: string; password: string },
  ): Promise<{ token: string }> {
    return await this.svc.login(requestBody);
  }
}
