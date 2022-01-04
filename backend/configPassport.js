import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";

const passportConfig = (User, app) => {
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

                    bcrypt.compare(
                        password,
                        user.password,
                        function (err, res) {
                            if (err) return done(err);
                            if (!res)
                                return done(null, false, {
                                    message: "Incorrect password",
                                });
                            console.log(user, "strategy");
                            return done(null, user);
                        }
                    );
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
};

export default passportConfig;
