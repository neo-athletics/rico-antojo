import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { logIn } from "../actions/logInAction";

const SignUp = ({ setShow }) => {
    const { register, handleSubmit } = useForm();
    const userState = useSelector((state) => state.userStatus);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    if (userState.status === "success") {
        console.log("did work");
        return <Redirect to={"/"} />;
    }

    const userSignUp = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/signup", data);
            const { message } = await res.data;
            dispatch(
                logIn(
                    { username: data.username, password: data.password },
                    setShow
                )
            );
            console.log(message);
        } catch (err) {
            const error = err?.response?.data?.errors;
            setErrors(error);

            console.log(error, "sign up error");
        }
    };

    const onSubmitForm = (data) => {
        userSignUp(data);
    };

    return (
        <div>
            <h1>Sign Up</h1>
            {errors?.length > 0 && errors?.map((error) => <p>{error.msg}</p>)}
            <form
                onSubmit={handleSubmit(onSubmitForm)}
                action="/signup"
                method="post"
            >
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    minLength="8"
                    {...register("username", { required: true })}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email", { required: true })}
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    minLength="8"
                    {...register("password", { required: true })}
                />
                <label htmlFor="password2">confirm password</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    minLength="8"
                    {...register("password2", { required: true })}
                />
                <input type="submit" value="sign up" />
            </form>
        </div>
    );
};

export default SignUp;
