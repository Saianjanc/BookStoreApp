import { createSlice } from "@reduxjs/toolkit";


const reviewSlice = createSlice({
    name: "reviewlist",
    initialState: {
        reviewList: []
    },
    reducers: {
        getReviewList: (state,action) => {
            state.reviewList=action.payload
        }
    }
})

export const {getReviewList} = reviewSlice.actions
export default reviewSlice.reducer