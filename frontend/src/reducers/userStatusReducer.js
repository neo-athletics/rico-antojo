const initialState = {
    user: {},
    status: null,
};
const userStatus = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, status: "loading" };
        case "LOGIN_SUCCESS":
            return { ...state, status: "success", user: { ...action.payload } };
        case "LOGIN_FAILURE":
            return { ...state, status: "failed", error: action.error };
        case "LOG_OUT":
            return { ...state, status: null, user: {} };
        default:
            return state;
    }
};

export default userStatus;
