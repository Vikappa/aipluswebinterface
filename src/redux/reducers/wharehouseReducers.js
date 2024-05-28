import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    foodShortLine: [],
    garnishShortLine: [],
    tonicShortLine: [],
    ginShortLine: [],
    ordini: []
}

export const fetchOrdini = createAsyncThunk(
    "ordini/all",
    async () => {
        const token = sessionStorage.getItem("token");
        const response = await fetch("https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/ordina/getall", {
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

export const fetchFoodShortLine = createAsyncThunk(
    "deperibile/getinstorelist",
    async () => {
        const token = sessionStorage.getItem("token");
        const response = await fetch("https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/deperibile/getinstorelist", {
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
    const response = await fetch("https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/garnish/getinstorelist", {
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

export const fetchGinBottleShortLine = createAsyncThunk(
    "ginbottle/getinstorelist",
  async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch("https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/ginbottle/getinstorelist", {
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

export const fetchTonicaBottleShortLine = createAsyncThunk(
    "tonica/getinstorelist",
  async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch("https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/tonica/getlineshort", {
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
        builder.addCase(fetchGinBottleShortLine.fulfilled, (state, action) => {
            state.ginShortLine = action.payload
        })
        builder.addCase(fetchTonicaBottleShortLine.fulfilled, (state, action) => {
            state.tonicShortLine = action.payload
        })
        builder.addCase(fetchOrdini.fulfilled, (state, action) => {
            state.ordini = action.payload
        })
    }
})

export default wharehouseSlice.reducer