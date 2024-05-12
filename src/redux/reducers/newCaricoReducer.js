import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carico: {
        id: 0,
        data: [],
        quantita: 0,
        note: ""
    }
}

const newCaricoReducer = createSlice({
    name: 'newCarico',
    initialState,
    reducers: {
        setCarico(state, action) {
            console.log(action.payload)
            state.carico = action.payload;
        },

        setCaricoNote(state, action) {
            state.carico.note = action.payload;
        },
        setQuantitaItemCarico(state, action) {
            state.newItem.quantita = action.payload === '' ? 0 : Number(action.payload);
        }
        
    }
})

export const { setCarico, setCaricoType, setCaricoNote } = newCaricoReducer.actions;

export default newCaricoReducer.reducer;
