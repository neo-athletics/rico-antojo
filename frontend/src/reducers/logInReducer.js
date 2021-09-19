const logInReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, status: "loading" };
        case "LOGIN_SUCCESS":
            return { ...state, status: "success", ...action.payload };
        case "LOGIN_FAILURE":
            return { ...state, status: "failed" };
        default:
            return state;
    }
};

export default logInReducer;
