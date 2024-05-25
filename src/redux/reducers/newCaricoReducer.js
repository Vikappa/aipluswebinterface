import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carico: {
        operatore: null,
        data: [],
        note: ""
    }
}

const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

const newCaricoReducer = createSlice({
    name: 'newCarico',
    initialState,
    reducers: {
        setCarico(state, action) {
            console.log(action.payload);
            state.carico = action.payload;
        },
        resetCarico(state) {
            state.carico = {
                operatore: null,
                data: [],
                note: ""
            };
        },
        setOperatore(state, action) {
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
                productionDate: formatDate(payload.anno),
                volume: payload.volume,
                alcoholPercentage: payload.alcPercentage,
                expirationDate: formatDate(payload.data_scadenza),
                batchNumber: parseInt(payload.batchNumber, 10),
                imageUrl: payload.imageUrl || "Placeholder",
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
                scadenza_tonica: formatDate(payload.data_scadenza),
                brand_tonica_name: payload.ginBrand
            }

            for (let index = 0; index < payload.quantita; index++) {
                newData.push(newItem);
            }

            state.carico.data = newData;
        },
        pushExtraToCarico(state, action) {
            let payload = action.payload;

            let newData = [...state.carico.data];
            let newItem = {
                discriminatorString: "ALIMENTO_EXTRA",
                name: payload.deperibileName,
                flavourId: payload.flavour,
                scadenza_ingrediente: formatDate(payload.data_scadenza),
                UM: payload.um,
                qtaExtra: parseInt(payload.quantita, 10)  
            }

            newData.push(newItem);

            state.carico.data = newData;
        },
        pushGarnishToCarico(state, action) {
            let payload = action.payload;
            let newData = [...state.carico.data];
            let newItem = {
                discriminatorString: "GUARNIZIONE",
                name: payload.garnishName,
                flavourId: payload.flavour,
                coloreId: payload.color,
                UM: payload.um,
                quantitaGarnish: parseInt(payload.quantita, 10)  
            }
            newData.push(newItem);

            state.carico.data = newData;
        }
    }
})

export const { resetCarico, setCarico, setCaricoType, setCaricoNote, setOperatore, pushGinBottleToCarico, pushTonicBottleToCarico, pushExtraToCarico, pushGarnishToCarico } = newCaricoReducer.actions;

export default newCaricoReducer.reducer;
