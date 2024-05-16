import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    tonicBrands: []
}

export const fetchTonicBrands = createAsyncThunk(
    "ginbrand/getall",
    async () => {
        const token = sessionStorage.getItem("token"); 
        const response = await fetch("http://localhost:3001/brandtonica/getall", {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        const data = await response.json();
        console.log(data)
        return data;
    }
)
const tonicBrandSlice = createSlice({
    name: "tonicBrands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTonicBrands.fulfilled, (state, action) => {
            state.tonicBrands = action.payload;
        });
    }
});

export default tonicBrandSlice.reducer;
