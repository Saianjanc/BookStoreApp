import { createSlice } from "@reduxjs/toolkit";


const bookSlice = createSlice({
    name: "booklist",
    initialState: {
        bookList: []
    },
    reducers: {
        getBookList: (state,action) => {
            state.bookList=action.payload
        }
    }
})

export const {getBookList} = bookSlice.actions
export default bookSlice.reducer