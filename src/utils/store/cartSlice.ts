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
        addItemsToCart: (state:any,action) => {
            state.cartItems.push(action.payload)
        },
        updateCartList: (state:any,action) => {
            state.cartItems=state.cartItems.map((cartBook:any)=>{if(cartBook._id===action.payload.id){return {...cartBook,quantityToBuy:action.payload.quantityToBuy}}return cartBook})
        },
        deleteCartItem: (state,action) => {
            state.cartItems=state.cartItems.filter((book:any)=>book._id!==action.payload)
        }
    }
})

export const {putCartList,addItemsToCart,updateCartList,deleteCartItem} = cartSlice.actions
export default cartSlice.reducer