import DataBaseMonitor from "./DataBaseMonitor"
import { fetchRicette } from '../redux/reducers/ricetteReducer'
import { fetchGinBrands } from '../redux/reducers/ginBrandsReducer'
import { fetchGinFlavours } from "../redux/reducers/ginFlavourReducer";
import { fetchTonicBrands } from "../redux/reducers/tonicBrandReducer";
import { fetchFoodShortLine, fetchGarnishShortLine } from '../redux/reducers/wharehouseReducers'
import { fetchFlavours } from "../redux/reducers/flavourReducer";
import { fetchColours } from "../redux/reducers/colourReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const AdminPage = function(){

    const dispatch = useDispatch()

useEffect(() => {
    dispatch(fetchRicette())
    dispatch(fetchGinBrands())
    dispatch(fetchGinFlavours())
    dispatch(fetchTonicBrands())
    dispatch(fetchFoodShortLine())
    dispatch(fetchGarnishShortLine())
    dispatch(fetchFlavours())
    dispatch(fetchColours())
  }, [dispatch])

    return(
    <>
    <DataBaseMonitor/>
    </>
    )
}

export default AdminPage