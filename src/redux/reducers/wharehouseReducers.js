import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    foodShortLine: [],
    garnishShortLine: [],
    tonicShortLine: [],
    ginShortLine: []
}

export const fetchFoodShortLine = createAsyncThunk(
    "deperibile/getinstorelist",
    async () => {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://localhost:3001/deperibile/getinstorelist", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json()
        return data;
    }
)

export const fetchGarnishShortLine = createAsyncThunk(
    "garnish/getinstorelist",
  async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch("http://localhost:3001/garnish/getinstorelist", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});
const data = await response.json()
return data;
}
)

const wharehouseSlice = createSlice({
    name: "whareHouse",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFoodShortLine.fulfilled, (state, action) => {
            state.foodShortLine = action.payload
        })
        builder.addCase(fetchGarnishShortLine.fulfilled, (state, action) => {
            state.garnishShortLine = action.payload
        })
    }
})

export default wharehouseSlice.reducer