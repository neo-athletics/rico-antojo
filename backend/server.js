import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import User from "./models/user.js";
import Item from "./models/item.js";
import { body, validationResult } from "express-validator";
import cors from "cors";
import Stripe from "stripe";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passportConfig from "./configPassport.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const endpointSecret = "whsec_qp4TURlOM1zSjPwzSoSNyBt08LKXrywi";

const stripeAPI = Stripe(
    "sk_test_51JiY3SHQGEsFjDv8BU9d9xnIXxJEOBtXxWDOY1toIWssjr3YgCjemEVlu5eO2H3b5XN9kX1WvbfUPNbPs8uSNUsL00TiqwiBa5"
);

const app = express();

app.use(helmet());
app.use(cookieParser("cookie"));

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use(
    session({
        secret: "cookie",
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
        store: MongoStore.create({
            mongoUrl: process.env.URI,
            dbName: "e-commerce",
        }),
    })
);

// passportConfig(User, app);

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
                return done(null, false, {
                    message: "Username already exist",
                });

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
                    return done(null, userCredentials);
                })
                .catch((err) => console.log(err));
        });
    })
);

passport.use(
    new LocalStrategy(
        { usernameField: "username", passwordField: "password" },
        function (username, password, done) {
            User.findOne({ username }, function (err, user) {
                if (err) return done(err);
                if (!user)
                    return done(null, false, {
                        message: "Incorrect username",
                    });

                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) return done(err);
                    if (!res)
                        return done(null, false, {
                            message: "Incorrect password",
                        });
                    console.log(user, "strategy");
                    return done(null, user);
                });
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    console.log(user.id, "accessing");
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        return done(err, user);
    });
});
//passport.js
app.use(passport.initialize());
app.use(passport.session());

const myMiddleware = (req, res, next) => {
    console.log(
        req.user,
        req.session.passport,
        "myMiddleware",
        req.isAuthenticated()
    );
    next();
};
//check authentication

app.use(myMiddleware);

app.get("/", (req, res) => {});
app.post(
    "/login",
    body("username").notEmpty().trim().escape(),
    body("password").notEmpty().trim().escape().toLowerCase(),
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                console.log(err, "error happened");
            }
            if (info !== undefined) {
                res.status(403).send({ ...info });
            } else {
                req.logIn(user, function (err) {
                    if (err) throw err;
                    req.session.user = user.username;
                    res.send({ username: user.username });
                });
                console.log(req.user, "found it");
            }
        })(req, res, next);
    }
);
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
app.get("/api/products", async (req, res) => {
    Item.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.delete("/logout", (req, res) => {
    if (req.session) {
        req.logout();
        req.session.destroy((err) => {
            console.log("logout");
            res.clearCookie("connect.sid");
            res.send("Logged out");
        });
    } else {
        res.end();
    }
});

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

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
    const event = req.body;

    if (endpointSecret) {
        //get the signature sent by stripe
        const signature = req.headers["stripe-signature"];

        try {
            event = stripeAPI.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`webhook verification failed.`, err.message);
            return res.sendStatus(400);
        }
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            console.log(
                `PaymentIntent for ${paymentIntent.amount} was successful`,
                req.session
            );
            //store invoice to database correlated to the user
            if (req.isAuthenticated()) {
                User.findOneAndUpdate({ _id: req.user });
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.send();
});

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((item) => item._id === req.params.id);
//   res.json(product);
// });
