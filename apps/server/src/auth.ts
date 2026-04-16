import jwt from "jsonwebtoken";

import { JWT_SECRET } from "./store.js";

export async function expressAuthentication(request: any, securityName: string, scopes?: string[]) {
  if (securityName === "jwt") {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error("No token");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (scopes?.includes("admin") && (decoded as any).role !== "ADMIN") {
        throw new Error("Forbidden");
      }

      return decoded;
    } catch {
      throw new Error("Invalid token");
    }
  }
}
