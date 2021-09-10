import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../actions/logInAction";

const LogIn = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //dispatch an asynchronous action here when user submits login
        dispatch(logIn(user));
    };
    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} action="/login" method="POST">
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    minLength="8"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    minLength="8"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <input type="submit" value="log in" />
            </form>
        </div>
    );
};

export default LogIn;
