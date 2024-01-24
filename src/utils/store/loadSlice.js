import { createSlice } from "@reduxjs/toolkit";


const loadSlice = createSlice({
    name: "load",
    initialState: {
        dataLoaded: false
    },
    reducers: {
        setLoaded: (state,action) => {
            state.dataLoaded=action.payload
        }
    }
})

export const {setLoaded} = loadSlice.actions
export default loadSlice.reducer