import express from "express";
import dotenv from "dotenv";
import expressSession from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import User from "./models/user.js";
import Item from "./models/item.js";
import { body, validationResult } from "express-validator";

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(
      PORT,
      console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    );
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: "cookie",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/products", async (req, res) => {
  Item.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.post(
  "/signup",
  body("username").notEmpty().trim().escape(),
  body("email")
    .toLowerCase()
    .isEmail()
    .notEmpty()
    .trim()
    .custom((val) => {
      console.log(val);
      return User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  body("password").notEmpty().trim().escape().toLowerCase(),
  body("password2")
    .toLowerCase()
    .notEmpty()
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    //check for user existing in database
    // const checkEmail = await User.findOne({ email: email }).catch((err) => {
    //   console.log(err);
    // });
    const user = new User({
      username,
      email,
      password,
    });

    console.log(user);

    user
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  }
);

app.post("/login", (req, res) => {});
// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((item) => item._id === req.params.id);
//   res.json(product);
// });
