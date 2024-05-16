import { configureStore } from '@reduxjs/toolkit'
import newCaricoReducer from '../reducers/newCaricoReducer'
import ginBrandsReducer from '../reducers/ginBrandsReducer'
import newItemCaricoReducer from '../reducers/newItemCaricoReducer'
import ginFlavourReducer from '../reducers/ginFlavourReducer'
import tonicBrandReducer from '../reducers/tonicBrandReducer'

const store = configureStore({
    reducer:{
       newCarico: newCaricoReducer,
       ginBrands: ginBrandsReducer,
       newItemCarico: newItemCaricoReducer,
       ginFlavours: ginFlavourReducer,
       tonicBrand: tonicBrandReducer
    }
})

export default store
