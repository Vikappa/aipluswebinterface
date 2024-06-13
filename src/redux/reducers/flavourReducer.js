import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    flavours: []
}

export const fetchFlavours = createAsyncThunk(
    "flavours/getall",
    async () => {
        const token = sessionStorage.getItem("token")
        const response = await fetch("http://localhost:3001/flavours/getall", {
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

const flavourSlice = createSlice({
    name: "flavours",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFlavours.fulfilled, (state, action) => {
            state.flavours = action.payload
        })
    }    
})

export default flavourSlice.reducer