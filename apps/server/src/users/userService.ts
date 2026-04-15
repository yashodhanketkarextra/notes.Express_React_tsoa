import bcrypt from "bcryptjs";

import { createToken } from "../client/jwt.js";
import { AccountCreateInput } from "../generated/prisma/models/Account.js";
import { Repository } from "./userRepo.js";

export class Service {
  private repo = new Repository();

  public async getUser(id: string) {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new Error("Invalid user id");
    }

    return await this.repo.getUser(id);
  }

  public async createUser(user: AccountCreateInput) {
    if (!user.name || user.name.trim().length === 0) {
      throw new Error("User name is required");
    } else if (!user.password || user.password.trim().length === 0) {
      throw new Error("User name is required");
    }

    user.password = await bcrypt.hash(user.password, 10);
    return await this.repo.createUser(user);
  }

  public async login(requestBody: { name: string; password: string }) {
    const user = await this.repo.getUserByName(requestBody.name);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(requestBody.password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }
    const token = await createToken({ id: user.id, role: user.role });
    return { token };
  }
}
