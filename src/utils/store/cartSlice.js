import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addItemsToCart: (state,action) => {
            state.cartItems.push(action.payload)
        },
        updateCartList: (state,action) => {
            state.cartList=action.payload
            console.log(action.payload);
        }
    }
})

export const {addItemsToCart,updateCartList} = cartSlice.actions
export default cartSlice.reducer