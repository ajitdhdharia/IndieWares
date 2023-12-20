import mongoose from "mongoose";
import Item from "../models/itemModel.js";

// get all items
const getItems = async (req, res) => {
  const items = await Item.find({}).sort({ createdAt: -1 });
  res.status(200).json(items);
};
// get a single item
const getItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(item);
};

// create a new item
const createItem = async (req, res) => {
  const { title, description, price, category } = req.body;

  //add document to db
  try {
    const item = await Item.create({ title, description, price, category });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const item = await Item.findOneAndDelete({ _id: id });

  if (!item) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(item);
};

// update a workout
const updateItem = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const item = await Item.findOneAndUpdate({ _id: id }, { ...req.body });
  res.status(200).json(item);
};

export { getItem, getItems, createItem, deleteItem, updateItem };
