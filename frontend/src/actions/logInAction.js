import axios from "axios";

export const logIn = (userInfo, setShow, setUser) => async (dispatch) => {
    //dispatch login request

    dispatch({ type: "LOGIN_REQUEST" });

    try {
        //dispatch logIn success

        const res = await axios.post("http://localhost:8080/login", userInfo, {
            withCredentials: true,
        });
        console.log(res, "login");
        const user = await res.data;

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user },
        });

        setShow(true);
        if (setUser !== undefined) {
            setUser({ username: "", password: "" });
        }
    } catch (err) {
        console.log(err);
        //dispatch logIn failure

        dispatch({
            type: "LOGIN_FAILURE",
            error: err?.response?.data?.message,
        });
    }
};
