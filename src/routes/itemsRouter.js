import express from "express";
import {
  getItem,
  getItems,
  createItem,
  deleteItem,
  updateItem,
} from "../controllers/itemControllers.js";

const router = express.Router();

// GET all items
router.get("/", getItems);

// GET a single item
router.get("/:id", getItem);

// POST a new item
router.post("/", createItem);

// DELETE an item
router.delete("/:id", deleteItem);

// UPDATE an item
router.patch("/:id", updateItem);

export default router;
