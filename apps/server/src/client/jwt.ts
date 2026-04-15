import jwt from "jsonwebtoken";

export const createToken = async (payload: { id: number; role: string }) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};
