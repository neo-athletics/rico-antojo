import axios from "axios";

export const logOutAction = (message) => async (dispatch) => {
    dispatch({ type: "LOG_OUT", payload: { user: {}, message } });
    try {
        const logOut = await axios.get("http://localhost:5000/logout");
        const logOutRes = await logOut;
    } catch (err) {
        console.log(err);
    }
};
