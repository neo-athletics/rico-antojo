import axios from "axios";

export const logOutAction = () => (dispatch) => {
    try {
        const logOut = axios.delete("http://localhost:8080/logout", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        // const logOutRes = await logOut;
        // console.log(logOutRes);
        dispatch({ type: "LOG_OUT", payload: { user: {} } });
    } catch (err) {
        console.log(err);
    }
};
