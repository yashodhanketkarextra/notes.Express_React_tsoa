import cors from "cors";
import express, { type Application, json, type Request, type Response, urlencoded } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";

import { RegisterRoutes } from "./routes.js";

export const app: Application = express();
app.use(json());
app.use(cors());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));

app.use("/docs", swaggerUI.serve, async (_req: Request, res: Response) => {
  const swaggerDocument = await import("../build/swagger.json", {
    with: { type: "json" },
  });
  return res.send(swaggerUI.generateHTML(swaggerDocument.default));
});

RegisterRoutes(app);
