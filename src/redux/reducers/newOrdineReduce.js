import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ginTonics: []
}

const newOrdineReducer = createSlice({
    name: 'newOrder',
    initialState,
    reducers: {
        pushIntoNewOrdine(state, action) {
            let currentData = [...state]
            currentData.push(action.payload)
            state.ginTonics = currentData
        }
    }
})

export const { pushIntoNewOrdine } = newOrdineReducer.actions;

export default newOrdineReducer.reducer;