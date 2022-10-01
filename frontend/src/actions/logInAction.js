import axios from "axios";

export const logIn = (userInfo, setShow, setUser) => async (dispatch) => {
    //dispatch login request

    dispatch({ type: "LOGIN_REQUEST" });

    try {
        //dispatch logIn success

        const res = await axios.post(
            `${process.env.REACT_APP_SERVER_END_POINT}/login`,
            userInfo,
            {
                withCredentials: true,
            }
        );
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
        //dispatch logIn failure

        dispatch({
            type: "LOGIN_FAILURE",
            error: err?.response?.data?.message,
        });
    }
};
