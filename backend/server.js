import express from "express/index";
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

const app = express();

app.use(helmet());
app.use(cookieParser("cookie"));

dotenv.config();

const endpointSecret = process.env.END_POINT_SECRET;

const stripeAPI = Stripe(process.env.STRIPE_API_KEY);

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(express.urlencoded({ extended: false }));

mongoose
    .connect(process.env.URI, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        app.listen(PORT);
        console.log("listening on port " + PORT);
    })
    .catch((err) => console.log(err, "could not connect to database!!!"));

app.use(
    session({
        secret: "cookie",
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
        store: MongoStore.create({
            mongoUrl: process.env.URI,
            dbName: "e-commerce",
        }),
    })
);

passportConfig(User, app);

//check authentication

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
                    res.send({
                        username: user.username,
                    });
                });
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
        .isLength({ min: 8 })
        .withMessage("username must be at least 8 chars long")
        .custom((val) => {
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
            return res.status(400).json({ errors: errors.array() });
        }

        passport.authenticate("register", (err, user, info) => {
            if (err) {
                console.log(err, "err");
            }
            if (info !== undefined) {
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

app.get("/user", async (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ username: req.user.username, isAuthenticated: true });
    } else {
        res.send({ username: null, isAuthenticated: false });
    }
});

app.delete("/logout", (req, res) => {
    if (req.session) {
        req.logout((err) => {
            if (err) {
                res.send(err);
            }
            req.session.destroy((err) => {
                res.clearCookie("connect.sid");
                res.send("Logged out");
            });
        });
    } else {
        res.end();
    }
});

// minimum is $0.50 US
const calculateOrderAmount = (items, userBool) => {
    //have to convert to cents

    let cartTotal = items.reduce((prev, curr) => prev + curr.price, 0) * 100;
    let discountedTotal = (cartTotal - cartTotal * 0.1) * 100;

    return userBool ? discountedTotal : cartTotal;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    const userBool = req.isAuthenticated();
    const paymentIntent = await stripeAPI.paymentIntents.create({
        amount: calculateOrderAmount(items, userBool),
        currency: "usd",
        payment_method_types: ["card"],
        metadata: { id: req?.user?.id },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
    //get the signature sent by stripe
    const signature = req.headers["stripe-signature"];
    let event;

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

    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            console.log(
                `PaymentIntent for ${paymentIntent.amount} was successful`,
                paymentIntent.metadata.id
            );
            //store invoice to database correlated to the user
            if (paymentIntent.metadata.id !== undefined) {
                User.findByIdAndUpdate(
                    paymentIntent.metadata.id,
                    {
                        $push: {
                            receipts: paymentIntent.charges.data[0].receipt_url,
                        },
                    },
                    { upsert: true },
                    function (err, success) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("updated user");
                        }
                    }
                );
            }

            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.send();
});
