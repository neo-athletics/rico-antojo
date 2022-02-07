import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../actions/logInAction";
import { Redirect } from "react-router";
import { useLocation, useHistory } from "react-router-dom";

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
        <div>
            <h1>Log In</h1>
            {userState.error && <p>{userState.error}</p>}
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
