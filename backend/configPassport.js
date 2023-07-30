import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";

const passportConfig = (User, app) => {
    passport.use(
        "register",
        new LocalStrategy({ passReqToCallback: true }, async function (
            req,
            username,
            password,
            done
        ) {
            const { email } = req.body;
            const userFound = await User.findOne({ username });

            if (userFound != null) {
                return done(null, false, {
                    message: "Username already exist",
                });
            }

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
        })
    );

    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            async function (username, password, done) {
                const foundUser = await User.findOne({ username });
                console.log(foundUser, "finding");

                try {
                    if (foundUser != null) {
                        //continue with user authentication
                        bcrypt.compare(
                            password,
                            foundUser.password,
                            function (err, res) {
                                if (err) return done(err);
                                if (!res)
                                    return done(null, false, {
                                        message: "Incorrect password",
                                    });
                                return done(null, foundUser);
                            }
                        );
                    } else {
                        //send error
                        return done(null, false, {
                            message: "Incorrect username",
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        const userFound = await User.findById(id);
        if (userFound != null) {
            let err = false;
            return done(err, userFound);
        }
    });

    //passport.js
    app.use(passport.initialize());
    app.use(passport.session());
};

export default passportConfig;
