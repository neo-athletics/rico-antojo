import { combineReducers } from "redux";
import userStatus from "./userStatusReducer";

const initialEnv =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_SERVER_END_POINT_DEV
        : process.env.REACT_APP_SERVER_END_POINT_PROD;

const envReducer = (env = initialEnv, action) => {
    switch (action.type) {
        case "SET_ENVIRONMENT":
            if (action.payload === "development") {
                return process.env.REACT_APP_SERVER_END_POINT_DEV;
            }
            if (action.payload === "production") {
                return process.env.REACT_APP_SERVER_END_POINT_PROD;
            }
            return env;
        default:
            return env;
    }
};

const selectedItemReducer = (selectedItem = {}, action) => {
    switch (action.type) {
        case "ITEM_SELECTED":
            return action.payload;
        default:
            return selectedItem;
    }
};
const cartReducer = (cart = [], action) => {
    switch (action.type) {
        case "ITEM_PURCHASED":
            return [...cart, action.payload];
        case "ITEM_UPDATED":
            return cart.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: action.payload.quantity };
                } else {
                    return item;
                }
            });
        case "ITEM_REMOVE":
            return cart.filter((item) => {
                return item.id !== action.payload.id;
            });
        case "CLEAR_CART":
            return [];
        default:
            return cart;
    }
};

export default combineReducers({
    selectedItem: selectedItemReducer,
    cart: cartReducer,
    userStatus: userStatus,
    environment: envReducer,
});
