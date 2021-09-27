import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import e from "connect-flash";

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const userState = useSelector((state) => state.userStatus);

    if (userState.status === "success") {
        console.log("did work");
        return <Redirect to={"/"} />;
    }

    const userSignUp = async (data) => {
        try {
            const res = await axios.post("http://localhost:5000/signup", data);
            const { message } = await res.data;
            console.log(message);
        } catch (err) {
            const error = err?.response?.data?.errors[0];
            console.log(error?.msg);
        }
    };

    const onSubmitForm = (data) => {
        userSignUp(data);
    };

    return (
        <div>
            <h1>Sign Up</h1>
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
                <label htmlFor="password2">re-enter password</label>
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
