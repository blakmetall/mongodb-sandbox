const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// gitignored configuration
const db = config.get("mongoURI");

mongoose
  .connect(db, {})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const Animal = require("./models/Animal");

const newAnimal = new Animal({
  name: "Red Panda",
  isEndangered: true,
});

newAnimal
  .save()
  .then((item) => console.log(item))
  .catch((err) => console.log(err));
