import { configureStore } from '@reduxjs/toolkit'
import newCaricoReducer from '../reducers/newCaricoReducer'
import ginBrandsReducer from '../reducers/ginBrandsReducer'
import newItemCaricoReducer from '../reducers/newItemCaricoReducer'
import ginFlavourReducer from '../reducers/ginFlavourReducer'
import tonicBrandReducer from '../reducers/tonicBrandReducer'
import wharehouseReducer from '../reducers/wharehouseReducers'
import flavourReducer from '../reducers/flavourReducer'
import colourReducer from '../reducers/colourReducer'

const store = configureStore({
    reducer:{
        wharehouse: wharehouseReducer,
       flavours: flavourReducer,
       colours: colourReducer,
       newCarico: newCaricoReducer,
       ginBrands: ginBrandsReducer,
       newItemCarico: newItemCaricoReducer,
       ginFlavours: ginFlavourReducer,
       tonicBrand: tonicBrandReducer,
    }
})

export default store
