import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addItemsToCart: (state,action) => {
            state.cartItems.push(action.payload)
        }
    }
})

export const {addItemsToCart} = cartSlice.actions
export default cartSlice.reducer