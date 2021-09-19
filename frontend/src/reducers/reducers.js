import { combineReducers } from "redux";
import menuItems from "../menuItems";
import logInReducer from "./logInReducer";
const categoryReducer = () => {
    const categories = menuItems.map((item) => {
        return item.category;
    });
    return [...new Set(categories)];
};

const itemsReducers = () => {
    return menuItems;
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
        default:
            return cart;
    }
};

export default combineReducers({
    categories: categoryReducer,
    items: itemsReducers,
    selectedItem: selectedItemReducer,
    cart: cartReducer,
    logIn: logInReducer,
});
