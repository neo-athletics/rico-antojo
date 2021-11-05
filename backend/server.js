import express from "express";
import dotenv from "dotenv";
import expressSession from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import User from "./models/user.js";
import Item from "./models/item.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import cors from "cors";
import Stripe from "stripe";
const stripeAPI = Stripe(
    "sk_test_51JiY3SHQGEsFjDv8BU9d9xnIXxJEOBtXxWDOY1toIWssjr3YgCjemEVlu5eO2H3b5XN9kX1WvbfUPNbPs8uSNUsL00TiqwiBa5"
);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    expressSession({
        secret: "cookie",
        resave: false,
        saveUninitialized: false,
    })
);
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
//passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true }, function (
        req,
        username,
        password,
        done
    ) {
        console.log(req.body.email, "email here");
        const { email } = req.body;
        User.findOne({ username }, async function (err, user) {
            if (err) return done(err);
            if (user)
                return done(null, false, { message: "Username already exist" });

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);

            const userCredentials = new User({
                username,
                email,
                password: hashPass,
            });

            userCredentials
                .save()
                .then((result) => {
                    // res.status(201).redirect("/");
                    return done(null, userCredentials);
                })
                .catch((err) => console.log(err));
        });
    })
);

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "username", passwordField: "password" },
        function (username, password, done) {
            User.findOne({ username }, function (err, user) {
                if (err) return done(err);
                if (!user)
                    return done(null, false, { message: "Incorrect username" });

                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) return done(err);
                    if (!res)
                        return done(null, false, {
                            message: "Incorrect password",
                        });

                    return done(null, user);
                });
            });
        }
    )
);
// app.use("/login", (req, res, next) => {
//   console.log(req.flash());
//   const { error } = req.flash();
//   console.log(error);

//   next();
// });

app.get("/", (req, res) => {});
app.get("/logout", (req, res) => {
    req.logout();
    console.log("redirecting");
    // res.redirect("/");
});
app.get("/api/products", async (req, res) => {
    Item.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.post(
    "/signup",
    body("username")
        .toLowerCase()
        .notEmpty()
        .trim()
        .escape()
        .custom((val) => {
            console.log(val);
            return User.findOne({ username: val }).then((user) => {
                if (user) {
                    return Promise.reject("Username already in use");
                }
            });
        }),
    body("email")
        .toLowerCase()
        .isEmail()
        .withMessage("Enter a valid email value E.g. johndoe@smith.com")
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
                throw new Error(
                    "Password confirmation does not match password"
                );
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        passport.authenticate("register", (err, user, info) => {
            if (err) {
                console.log(err, "err");
            }
            if (info !== undefined) {
                console.log(info, "info error");
                res.status(403).send({ ...info });
            } else {
                req.logIn(user, (err) => {
                    if (err) throw err;
                    res.send({ message: "successfully signed up" });
                });
            }
        })(req, res, next);
    }
);

app.post(
    "/login",
    body("username").notEmpty().trim().escape(),
    body("password").notEmpty().trim().escape().toLowerCase(),
    (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            if (err) {
                console.log(err, "error happened");
            }
            if (info !== undefined) {
                res.status(403).send({ ...info });
            } else {
                req.logIn(user, (err) => {
                    console.log(user);
                    if (err) throw err;
                    res.send({ username: user.username });
                });
            }
        })(req, res, next);
    }
);
//100 cents = $1, minimum is $0.50 US
const calculateOrderAmount = (items) => {
    let total = items.reduce((prev, curr) => prev + curr.price, 0);
    //convert to cents
    return total * 100;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripeAPI.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
});

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((item) => item._id === req.params.id);
//   res.json(product);
// });
