import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const { register, handleSubmit } = useForm();

    const getErrors = async () => {
        const results = await axios.post({ method: "post", url: "/signup" });
        return results;
    };
    // useEffect(() => {
    //   try {
    //     const errors = getErrors();
    //     console.log(errors);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }, []);

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit()} action="/signup" method="POST">
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    minLength="8"
                    ref={register("username", { required: true })}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    ref={register("email", { required: true })}
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    minLength="8"
                    ref={register("password", { required: true })}
                />
                <label htmlFor="password2">re-enter password</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    minLength="8"
                    ref={register("password2", { required: true })}
                />
                <input type="submit" value="sign up" />
            </form>
        </div>
    );
};

export default SignUp;
