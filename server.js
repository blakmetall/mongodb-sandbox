const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();
app.use(express.json());

// gitignored configuration
const db = config.get("mongoURI");

mongoose
  .connect(db, {})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const Animal = require("./models/Animal");

// find all entries
app.get("/", (req, res) => {
  Animal.find()
    .sort({ date: -1 })
    .then((items) => console.log(res.json(items)));
});

// add a new entry
app.post("/", (req, res) => {
  const newAnimal = new Animal({
    name: req.body.name,
    isEndangered: req.body.isEndangered || false,
  });
  newAnimal.save().then((item) => res.json(item));
});

// delete an entry
app.delete("/:id", (req, res) => {
  Animal.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

// update an entry
app.put("/:id", (req, res) => {
  Animal.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));
