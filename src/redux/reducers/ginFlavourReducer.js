import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    ginFlavours: []
}

export const fetchGinFlavours = createAsyncThunk(
    "ginflavours/getall",
    async () => {
        const token = sessionStorage.getItem("token"); 
        const response = await fetch("https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/ginflavours/getall", {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        const data = await response.json();
        return data;
    }
)

const ginFlavourSlice = createSlice({
    name: "ginFlavours",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGinFlavours.fulfilled, (state, action) => {
            state.ginFlavours = action.payload;  
        });
    }    
});

export default ginFlavourSlice.reducer