import { config } from "dotenv";

config();

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env var: ${key}`);
  }

  return value;
};

export const JWT_SECRET = getEnv("JWT_SECRET");
export const DATABASE_URL = getEnv("DATABASE_URL");
export const PORT = getEnv("PORT");
export const NODE_ENV = getEnv("NODE_ENV");
