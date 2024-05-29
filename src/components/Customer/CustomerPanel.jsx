import RicetteGinTonic from "./RicetteGinTonic"
import DashBoardGinTonic from "./DashBoardGinTonic"
import { Button } from "react-bootstrap"
import { BiDrink } from "react-icons/bi";
import RicercaRicetteWindow from "./RicercaRicetteWindow";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRicette } from "../../redux/reducers/ricetteReducer";
import {fetchFlavours} from "../../redux/reducers/flavourReducer"
import React from "react";


const CustomerPanel = function() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRicette())
        dispatch(fetchFlavours())
    }, [dispatch])
    
    return (
    <div className="customerPanel h-100"> 
            <DashBoardGinTonic/>
            <RicercaRicetteWindow/>
            <RicetteGinTonic/>

        <div className="d-flex">

        </div>

     </div>
    )
}

export default CustomerPanel
