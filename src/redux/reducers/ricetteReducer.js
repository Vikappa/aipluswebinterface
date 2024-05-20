import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    ricette: []
};

export const fetchRicette = createAsyncThunk(
    "ricette/getall",
    async () => {
        const token = sessionStorage.getItem("token"); 
        const response = await fetch("http://localhost:3001/ricette/getall", {
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

export const addRicetta = function(){
    
}

const ricetteSlice = createSlice({
    name: "ricette",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRicette.fulfilled, (state, action) => {
            state.ricette = action.payload;
        });
    }
});

export default ricetteSlice.reducer;