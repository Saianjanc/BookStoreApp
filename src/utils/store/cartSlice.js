import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        putCartList: (state,action) => {
            state.cartItems=action.payload
        },
        addItemsToCart: (state,action) => {
            state.cartItems.push(action.payload)
        },
        updateCartList: (state,action) => {
            state.cartItems=state.cartItems.map((cartBook)=>{if(cartBook._id===action.payload.id){return {...cartBook,quantityToBuy:action.payload.quantityToBuy}}return cartBook})
        },
        deleteCartItem: (state,action) => {
            state.cartItems=state.cartItems.filter((book)=>book._id!==action.payload)
        }
    }
})

export const {putCartList,addItemsToCart,updateCartList,deleteCartItem} = cartSlice.actions
export default cartSlice.reducer