import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../actions/logInAction";
import { Redirect } from "react-router";
import { useLocation, useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";

export let variants = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.3,
            duration: 0.5,
        },
    },
    hidden: { opacity: 0 },
};

export let item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const LogIn = ({ setShow }) => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userStatus);
    const [user, setUser] = useState({ username: "", password: "" });
    const location = useLocation();
    const history = useHistory();
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch an asynchronous action here when user submits login
        dispatch(logIn(user, setShow, setUser));
    };

    if (userState.status === "success") {
        console.log(location, "from", history);
        console.log("did work");
        return <Redirect to={history.goBack() || "/menu"} />;
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="login-container"
        >
            <motion.h1 variants={item}>Log In</motion.h1>
            {userState.error && <p>{userState.error}</p>}
            <form onSubmit={handleSubmit} action="/login" method="POST">
                <motion.label variants={item} htmlFor="username">
                    username
                </motion.label>
                <motion.input
                    variants={item}
                    type="text"
                    id="username"
                    name="username"
                    minLength="8"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                <motion.label variants={item} htmlFor="password">
                    password
                </motion.label>
                <motion.input
                    variants={item}
                    type="password"
                    id="password"
                    name="password"
                    minLength="8"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <motion.input
                    variants={item}
                    className="login-btn"
                    type="submit"
                    value="log in"
                />
            </form>
            <motion.p
                variants={item}
                style={{ marginTop: "15px", marginBottom: "0" }}
            >
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </motion.p>
        </motion.div>
    );
};

export default LogIn;
