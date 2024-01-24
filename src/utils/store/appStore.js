import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import bookSlice from "./bookSlice";
import loadSlice from "./loadSlice";

const appStore = configureStore({
    reducer:{
        cart: cartSlice,
        books: bookSlice,
        loaded: loadSlice
    }
})

export default appStore