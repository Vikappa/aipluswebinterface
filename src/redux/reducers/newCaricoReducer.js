import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carico: {
        operatore: null,
        data: [],
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
        setOperatore(state,action){
            state.carico.operatore = action.payload;
        },
        setCaricoNote(state, action) {
            state.carico.note = action.payload;
        },
        pushGinBottleToCarico(state, action) {
            let payload = action.payload;
        
            let newData = [...state.carico.data];
            let newItem = {
                discriminatorString: "GIN_BOTTLE",
                name: payload.nome,
                UM: "ml",
                brandId: payload.ginBrand,
                productionDate: payload.anno,
                volume: payload.volume,
                alcoholPercentage: payload.alcoholPercentage,
                expirationDate: payload.data_scadenza,
                batchNumber: payload.batchNumber,
                imageUrl: payload.imageUrl,
                ginFlavourId: payload.flavour
            };
        
        
            for (let index = 0; index < payload.quantita; index++) {
                newData.push(newItem);
            }
        
            state.carico.data = newData;
        },
        pushTonicBottleToCarico(state, action) {
            let payload = action.payload;

            let newData = [...state.carico.data];
            let newItem = {
                discriminatorString: "TONICA",
                UM: "ml",
                name: payload.nome,
                flavourId: payload.flavour,
                scadenza_tonica: payload.data_scadenza,
                brand_tonica_name: payload.ginBrand
            }

            for (let index = 0; index < payload.quantita; index++) {
                newData.push(newItem);
            }

            state.carico.data = newData;
        }, pushExtraToCarico(state, action){
            let payload = action.payload;

            let newData = [...state.carico.data];
            let newItem = {
                discriminatorString: "ALIMENTO_EXTRA",
                name: payload.deperibileName,
                flavourId: payload.flavour,
                scadenza_ingrediente: payload.data_scadenza,
                UM: payload.um,
                qtaExtra: payload.quantita
            }

                newData.push(newItem);
            
            state.carico.data = newData;
        }, pushGarnishToCarico(state, action){
            let payload = action.payload;
            let newData = [...state.carico.data]
            let newItem = {
                discriminatorString: "GUARNIZIONE",
                name: payload.name,
                flavourId: payload.flavour,
                coloreId: payload.color,
                UM: payload.um,
                quantitaGarnish:payload.quantita
            }
            newData.push(newItem);
            
            state.carico.data = newData;
        }
    }
})

export const { setCarico, setCaricoType, setCaricoNote, setOperatore, pushGinBottleToCarico,pushTonicBottleToCarico, pushExtraToCarico, pushGarnishToCarico } = newCaricoReducer.actions;

export default newCaricoReducer.reducer;
