const initialState = {
    user: {},
    status: null,
    error: [],
    message: {},
};

const userStatus = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, status: "loading" };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                status: "success",
                error: [],
                message: {
                    header: "Logged In",
                    body: "Welcome",
                    loggedIn: true,
                },
                ...action.payload,
            };
        case "LOGIN_FAILURE":
            return { ...state, status: "failed", error: action.error };
        case "LOG_OUT":
            return {
                ...state,
                status: null,
                error: [],
                message: {
                    header: "Logged Out",
                    body: "Good Bye",
                    loggedIn: false,
                },
                ...action.payload,
            };
        default:
            return state;
    }
};

export default userStatus;
