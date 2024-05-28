import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    ginbrands: []
}

export const fetchGinBrands = createAsyncThunk(
    "ginbrand/getall",
    async () => {
        const token = sessionStorage.getItem("token"); 
        const response = await fetch("https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/ginbrand/getall", {
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
const ginBrandSlice = createSlice({
    name: "ginBrands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGinBrands.fulfilled, (state, action) => {
            state.ginbrands = action.payload;
        });
    }
});

export default ginBrandSlice.reducer;
