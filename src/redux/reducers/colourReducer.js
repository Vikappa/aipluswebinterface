import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  colours: []
}

export const fetchColours = createAsyncThunk(
    "colours/getall",
    async () => {
        const token = sessionStorage.getItem("token")
        const response = await fetch("http://localhost:3001/colors/getall", {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        const data = await response.json()
        return data
    }
)

const colourSlice = createSlice({
    name: "colours",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchColours.fulfilled, (state, action) => {
            state.colours = action.payload
        })
    }    
})

export default colourSlice.reducer