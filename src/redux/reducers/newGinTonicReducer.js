import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    ginBottleName: null,
    ginBottleBrandName: null,
    ginFlavourName: null,
    tonicaName: null,
    tonicaBrand: null,
    tonicaFlavour: null,
    extras: [],
    garnishes: []
}

const newGinTonicReducer = createSlice({
    name: 'newGinTonic',
    initialState,
    reducers: {
        setNome(state, action) {
            state.name = action.payload;
        },
        setGinBottleName(state, action) {
            state.ginBottleName = action.payload;
        },
        setGinBottleBrandName(state, action) {
            state.ginBottleBrandName = action.payload;
        },
        setGinFlavourName(state, action) {
            state.ginFlavourName = action.payload;
        },
        setTonicaName(state, action) {
            state.tonicaName = action.payload;
        },
        setTonicaBrand(state, action) {
            state.tonicaBrand = action.payload;
        },
        setTonicaFlavour(state, action) {
            state.tonicaFlavour = action.payload;
        },
        setExtras(state, action) {
            state.extras = [...action.payload]
        },
        setGarnishes(state, action) {
            state.garnishes = [...action.payload]
        },
        addExtra(state, action) {
            state.extras.push(action.payload);
        },
        removeExtra(state, action) {
            state.extras = state.extras.filter(extra => extra !== action.payload);
        },
        addGarnish(state, action) {
            state.garnishes.push(action.payload);
        },
        removeGarnish(state, action) {
            state.garnishes = state.garnishes.filter(garnish => garnish !== action.payload);
        },
        resetGinTonic(){
            return initialState;
        }
    }
});

export const { 
    setNome,
    setGinBottleName,
    setGinBottleBrandName,
    setGinFlavourName,
    setTonicaName,
    setTonicaBrand,
    setTonicaFlavour,
    setExtras,
    setGarnishes,
    addExtra,
    removeExtra,
    addGarnish,
    removeGarnish,
    resetGinTonic
} = newGinTonicReducer.actions;

export default newGinTonicReducer.reducer;
