import express from "express";

const router = express.Router();

// GET all items
router.get("/", (req, res) => {
  res.json({ message: "GET all items" });
});

// GET a single item
router.get("/:id", (req, res) => {
  res.json({ message: "GET a single item" });
});

// POST a new item
router.post("/", (req, res) => {
  res.json({ message: "POST a new item" });
});

// DELETE an item
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE an item" });
});

// UPDATE an item
router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a new item" });
});

export default router;
