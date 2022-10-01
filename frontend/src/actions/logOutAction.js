import axios from "axios";

export const logOutAction = () => (dispatch) => {
    try {
        const logOut = axios.delete(
            `${process.env.REACT_APP_SERVER_END_POINT}/logout`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        dispatch({ type: "LOG_OUT", payload: { user: {} } });
    } catch (err) {
        console.log(err);
    }
};
