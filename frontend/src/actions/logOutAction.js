import axios from "axios";
import { store } from "../index";
export const logOutAction = () => (dispatch) => {
    try {
        const logOut = axios.delete(`${store.getState().environment}/logout`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        dispatch({ type: "LOG_OUT", payload: { user: {} } });
    } catch (err) {
        console.log(err);
    }
};
