import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { logIn } from "../actions/logInAction";
import { motion } from "framer-motion";
import { variants, item } from "./LogIn";
import WaveLayout from "./WaveLayout";

const SignUp = ({ setShow }) => {
    const { register, handleSubmit } = useForm();
    const userState = useSelector((state) => state.userStatus);
    const env = useSelector((state) => state.environment);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    if (userState.status === "success") {
        return <Redirect to={history.goBack() || "/"} />;
    }

    const userSignUp = async (data) => {
        try {
            const res = await axios.post(`${env}/signup`, data);

            const { message } = await res.data;

            setErrors([]);
            //dispatch login if there aren't any errors sent from backend
            dispatch(
                logIn(
                    { username: data.username, password: data.password },
                    setShow
                )
            );
        } catch (err) {
            const error = err?.response?.data?.errors;
            setErrors(error);
        }
    };

    const onSubmitForm = (data) => {
        userSignUp(data);
    };

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                className="signup-container"
            >
                <motion.h1 variants={item}>Sign Up</motion.h1>
                {errors?.length > 0 &&
                    errors?.map((error) => (
                        <motion.p variants={item} className="danger">
                            ! {error.msg}
                        </motion.p>
                    ))}
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    action="/signup"
                    method="post"
                >
                    <motion.label variants={item} htmlFor="username">
                        username
                    </motion.label>
                    <motion.input
                        variants={item}
                        type="text"
                        id="username"
                        name="username"
                        {...register("username", { required: true })}
                    />
                    <motion.label variants={item} htmlFor="email">
                        Email
                    </motion.label>
                    <motion.input
                        variants={item}
                        type="email"
                        id="email"
                        name="email"
                        {...register("email", { required: true })}
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
                        {...register("password", { required: true })}
                    />
                    <motion.label variants={item} htmlFor="password2">
                        confirm password
                    </motion.label>
                    <motion.input
                        variants={item}
                        type="password"
                        id="password2"
                        name="password2"
                        minLength="8"
                        {...register("password2", { required: true })}
                    />
                    <motion.input
                        variants={item}
                        className="signup-btn"
                        type="submit"
                        value="sign up"
                    />
                </form>
                <motion.p
                    variants={item}
                    style={{ marginTop: "15px", marginBottom: "0" }}
                >
                    Have an account? <Link to="/login">Log In</Link>
                </motion.p>
            </motion.div>
            <WaveLayout />
        </>
    );
};

export default SignUp;
