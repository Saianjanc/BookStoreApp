import { createSlice } from "@reduxjs/toolkit";


const reviewSlice = createSlice({
    name: "reviewlist",
    initialState: {
        reviewList: []
    },
    reducers: {
        getReviewList: (state,action) => {
            state.reviewList=action.payload
        },
        addReview: (state:any,action) => {
            state.reviewList.push(action.payload)
        }
    }
})

export const {getReviewList,addReview} = reviewSlice.actions
export default reviewSlice.reducer