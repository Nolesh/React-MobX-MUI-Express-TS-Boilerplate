import { Request, Response, NextFunction } from "express";
import { IError } from "../../../shared/types";

// display error middleware
const errorLogger = (
  error: MyErr,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // logging errors
  console.error(
    `Path: ${req.path}`,
    error.message,
    error.status ? `(${error.status})` : "",
    error.stack
  );
  next(error); // forward to next middleware
};

// error handler middleware
const errorResponder = (
  error: MyErr,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const status = error.status || 500;
  // const message = error.message || "Internal Server Error";
  // res.status(status).json({ status, message });
  sendError(res, error.message, error.status);

  // there is no middleware below,
  // so no need to call 'next' function
};

const sendError = (res: Response, message: string, status?: number) => {
  status = status || 500;
  message = message || "Internal Server Error";
  res.status(status).json({ status, message });
};

const throwCustomError = (message: string, status?: number) => {
  // throw { message, status }

  // OR

  // const err = Error(message);
  // err.status = status;
  // throw err;

  // OR

  throw new MyErr(message, status);
};

const throwError = (
  next: NextFunction,
  messageOrError: string | unknown,
  status?: number
) => {
  try {
    if (typeof messageOrError === "string") {
      // let's find a status by its description
      // const statusCode = status || Number(Object.keys(errorCodes).find((k: unknown) => errorCodes[k as keyof typeof errorCodes] === messageOrError));
      // const statusCode = status || Number(getObjectKeyByValue(errorCodes, messageOrError));
      // const statusCode = status || Number((errorCodes as Object).getKeyByValue(messageOrError));

      throwCustomError(messageOrError, status);
    } else if (typeof messageOrError === "object") {
      const { message, status } = messageOrError as IError;

      throwCustomError(message, status);
    } else throw messageOrError;
  } catch (e: any) {
    next(e);
  }
};

class MyErr extends Error implements Partial<IError> {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export { errorLogger, errorResponder, throwError, sendError };
