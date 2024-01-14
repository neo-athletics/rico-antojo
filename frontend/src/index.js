import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/reducers";
import { BrowserRouter as Router } from "react-router-dom";
import { loadState, saveState } from "./localStorage";

const persistentData = loadState();

export const store = createStore(
    reducers,
    persistentData,
    compose(applyMiddleware(thunkMiddleware))
);
function getUser() {
    const { userStatus } = store.getState();
    if (
        userStatus.user &&
        Object.keys(userStatus.user).length === 0 &&
        userStatus.user.constructor === Object
    ) {
        return {};
    } else {
        return userStatus;
    }
}

store.subscribe(() => {
    saveState({
        cart: store.getState().cart,
        userStatus: getUser(),
    });
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
