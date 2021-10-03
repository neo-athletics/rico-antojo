import axios from "axios";

export const logOutAction = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT", payload: { user: {} } });
    try {
        const logOut = await axios.get("http://localhost:5000/logout");
        const logOutRes = await logOut;
    } catch (err) {
        console.log(err);
    }
};
