import axios from "axios";

export const logIn = (userInfo, setShow, message) => async (dispatch) => {
    //dispatch login request

    dispatch({ type: "LOGIN_REQUEST" });

    try {
        //dispatch logIn success
        const res = await axios.post("http://localhost:5000/login", userInfo);
        const user = await res.data;

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user, message },
        });
        setShow(true);
    } catch (err) {
        //dispatch logIn failure
        console.log(err.response.data);
        dispatch({
            type: "LOGIN_FAILURE",
            error: err.response.data.message,
        });
    }
};
