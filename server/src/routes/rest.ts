import express from "express";
import { deleteItem, getItems, patchItem, postItem } from "../controllers/todo";
import { TODO_ROUTE } from "../../../shared/routes";

const router = express.Router();

router.get(`/${TODO_ROUTE}`, getItems);
router.post(`/${TODO_ROUTE}`, postItem);
router.patch(`/${TODO_ROUTE}/:id`, patchItem);
router.delete(`/${TODO_ROUTE}/:id`, deleteItem);

export default router;
