import React from "react";
import axios from "axios";

export const logIn = (userInfo) => async (dispatch) => {
    //dispatch login request

    dispatch({ type: "LOGIN_REQUEST" });

    try {
        //dispatch logIn success
        const res = await axios.post("http://localhost:5000/login", userInfo);
        const user = await res.data;
        console.log(user);

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: user,
        });
    } catch (err) {
        //dispatch logIn failure

        dispatch({
            type: "LOGIN_FAILURE",
            error: err.response.data.message,
        });
    }
};
