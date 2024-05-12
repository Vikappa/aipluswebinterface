import { createSlice } from "@reduxjs/toolkit";

const initialNewItem = {
    tipo: "Seleziona tipo prodotto",
    ginBrand: "",
    nome: "",
    quantita: 0,
    volume: 0,
    anno: "",
    data_scadenza: null,
    immagine: "",
    flavour: "",
    batchNumber:""
};

const initialState = {
    newItem: initialNewItem
};


const newItemCaricoReducer = createSlice({
    name: 'newCarico',
    initialState,
    reducers: {
        setNewItemCarico(state, action) {
            state.newItem = action.payload;
        },
        setNewItemCaricoType(state, action) {
            state.newItem.tipo = action.payload;
        },
        setGinBrand(state, action) {
            state.newItem.ginBrand = action.payload;
        },
        setNome(state, action) {
            state.newItem.nome = action.payload;
        },
        setQuantita(state, action) {
            state.newItem.quantita = action.payload === null ? '' : action.payload;
        },
        setVolume(state, action) {
            state.newItem.volume = action.payload === null ? '' : action.payload;
        },
        setAnno(state, action) {
            state.newItem.anno = action.payload;
        },
        setDataScadenza(state, action) {
            state.newItem.data_scadenza = action.payload;
        },
        setImmagine(state, action) {
            state.newItem.immagine = action.payload;
        },
        resetNewItem(state) {
            state.newItem = initialNewItem;
        },
        setBatchNumber(state, action) {
            state.newItem.batchNumber = action.payload;
        },
        setFlavour(state, action) {
            state.newItem.flavour = action.payload;
        }
    }
});

export const {
    setNewItemCarico,
    setNewItemCaricoType,
    setGinBrand,
    setNome,
    setQuantita,
    setVolume,
    setAnno,
    setDataScadenza,
    setExpirationDate,
    setImmagine,
    resetNewItem,
    setBatchNumber,
    setFlavour
} = newItemCaricoReducer.actions;

export default newItemCaricoReducer.reducer;
