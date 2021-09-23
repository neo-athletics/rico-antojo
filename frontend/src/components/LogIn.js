import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../actions/logInAction";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import { Col, Row, Toast } from "react-bootstrap";
const LogIn = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userStatus);
    const [user, setUser] = useState({ username: "", password: "" });
    const [show, setShow] = useState(false);
    const { state } = useLocation();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //dispatch an asynchronous action here when user submits login
        dispatch(logIn(user, setShow));
    };
    if (userState.status === "success") {
        console.log("did work");
        return <Redirect to={state?.from || "/"} />;
    }
    console.log(userState.error);
    return (
        <div>
            <Row>
                <Col xs={6}>
                    <Toast
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                        }}
                        onClose={() => setShow(false)}
                        show={show}
                        autohide
                    >
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>
                            Woohoo, you're reading this text in a Toast!
                        </Toast.Body>
                    </Toast>
                </Col>
            </Row>
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
