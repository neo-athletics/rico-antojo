import express from "express";
// import products from "./data/menuItems.js";
import dotenv from "dotenv";

import mongodb from "mongodb";

dotenv.config();

const { MongoClient } = mongodb;

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/products", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("e-commerce");
    const items = database.collection("items");
    res.json(await items.find().toArray());
  } catch (err) {
    console.log(err);
  }
});

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((item) => item._id === req.params.id);
//   res.json(product);
// });

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
