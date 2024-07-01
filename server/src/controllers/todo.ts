import { Request, Response, NextFunction } from "express";

import fs from "fs";
import { TODO_FILE_PATH } from "../config";
import { TItemData } from "../../../shared/types";

const getItems = (req: Request, res: Response, next: NextFunction) => {
  const content = JSON.parse(
    fs.readFileSync(TODO_FILE_PATH, "utf8")
  ) as TItemData[];
  res.json({ content });
};

const postItem = (req: Request, res: Response, next: NextFunction) => {
  let content = JSON.parse(
    fs.readFileSync(TODO_FILE_PATH, "utf8")
  ) as TItemData[];
  content = [...content, req.body];
  fs.writeFileSync(TODO_FILE_PATH, JSON.stringify(content));

  res.status(201).json({ content });
};

const patchItem = (req: Request, res: Response, next: NextFunction) => {
  const num = req.params.id as unknown as number;

  const content = JSON.parse(
    fs.readFileSync(TODO_FILE_PATH, "utf8")
  ) as TItemData[];
  content[num] = req.body;

  fs.writeFileSync(TODO_FILE_PATH, JSON.stringify(content));

  res.json({ content });
};

const deleteItem = (req: Request, res: Response) => {
  const num = req.params.id as unknown as number;

  let content = JSON.parse(
    fs.readFileSync(TODO_FILE_PATH, "utf8")
  ) as TItemData[];
  content.splice(num, 1);

  fs.writeFileSync(TODO_FILE_PATH, JSON.stringify(content));

  res.json({ content });
};

export { getItems, postItem, patchItem, deleteItem };
