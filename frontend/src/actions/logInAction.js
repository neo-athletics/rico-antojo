import { useEffect } from "react";
import axios from "axios";

export const logIn = (userInfo) => async (dispatch) => {
    //dispatch login request
    dispatch({ type: "LOGIN_REQUEST" });

    try {
        //dispatch logIn success
        const res = await axios.post("http://localhost:5000/login", userInfo);
        const user = await res;
        console.log(res);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.user,
        });
    } catch (err) {
        //dispatch logIn failure
        console.log(err.response.data.message);
        dispatch({
            type: "LOGIN_FAILURE",
            error: err.response.data.message,
        });
    }
};
