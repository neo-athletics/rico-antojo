import axios from "axios";

export const logOutAction = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT", payload: { user: {} } });
    try {
        const logOut = await axios.get("http://localhost:8080/logout");
        const logOutRes = await logOut;
    } catch (err) {
        console.log(err);
    }
};
