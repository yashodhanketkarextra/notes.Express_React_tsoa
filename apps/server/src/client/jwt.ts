import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../store.js";

export const createToken = async (payload: { id: number; role: string }) => {
  return jwt.sign({ ...payload }, JWT_SECRET, { expiresIn: "1h" });
};
