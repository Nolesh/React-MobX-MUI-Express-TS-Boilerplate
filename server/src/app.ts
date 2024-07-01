import express, { Request, Response, NextFunction, Express } from "express";
import path from "path";
import helmet from "helmet";

import restRouter from "./routes/rest";
import { errorLogger, errorResponder } from "./middlewares/errorHandler";
import { createToDoListFile, createToDoListFileSync } from "./utils";

const compression = require("compression");

export default function (toDoListFilePath: string) {
  // Create a file to store the todo list if it doesn't exist
  // await createToDoListFile(toDoListFilePath);
  createToDoListFileSync(toDoListFilePath);

  const app = express();

  app.use(compression());
  app.use(helmet());

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json({ limit: "1mb" }));

  const staticClientDir = "../../dist/client";
  app.use(express.static(path.join(__dirname, staticClientDir)));

  app.use("/rest", restRouter);

  // Conditional inclusion of /cause-error route
  if (process.env.NODE_ENV === "test") {
    app.get("/cause-error", (req, res, next) => {
      try {
        // Simulate an error by throwing an Error
        throw new Error("Simulated error");
      } catch (err) {
        next(err);
      }
    });
  }

  // handle every other route with index.html, which will contain
  // a script tag to your application's JavaScript file(s).
  app.get("*", (req: Request, res: Response, next: NextFunction): void => {
    res.sendFile(path.resolve(__dirname, staticClientDir + "/index.html"));
  });

  // ------------------------ ERROR HANDLING --------------------------------
  app.use(errorLogger);
  app.use(errorResponder);
  // ------------------------------------------------------------------------

  return app;
}
