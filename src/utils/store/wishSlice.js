import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
    name: "wish",
    initialState: {
        wishListItems: []
    },
    reducers: {
        putWishList: (state,action) => {
            state.wishListItems=action.payload
        },
        addWishListItem: (state,action) => {
            state.wishListItems.push(action.payload)
        },
        deleteWishItem: (state,action) => {
            state.wishListItems=state.wishListItems.filter((book)=>book._id!==action.payload)
        }
    }
})

export const {putWishList,addWishListItem,deleteWishItem} = wishSlice.actions
export default wishSlice.reducer