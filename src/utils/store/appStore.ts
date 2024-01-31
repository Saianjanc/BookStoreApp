import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import bookSlice from "./bookSlice";
import wishSlice from "./wishSlice";
import loadSlice from "./loadSlice";
import reviewSlice from "./reviewSlice";

const appStore = configureStore({
    reducer:{
        cart: cartSlice,
        books: bookSlice,
        wish: wishSlice,
        review: reviewSlice,
        loaded: loadSlice
    }
})

export default appStore