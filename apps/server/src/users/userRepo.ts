import Prisma from "../client/prisma.js";
import { AccountCreateInput } from "../generated/prisma/models/Account.js";

export class Repository {
  public async getUser(id: string) {
    return await Prisma.account.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  public async createUser(user: AccountCreateInput) {
    return await Prisma.account.create({
      data: user,
    });
  }

  public async getUserByName(name: string) {
    return await Prisma.account.findUnique({
      where: {
        name: name,
      },
    });
  }
}
