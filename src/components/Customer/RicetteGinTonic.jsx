import { useDispatch, useSelector } from "react-redux"
import { fetchRicette } from "../../redux/reducers/ricetteReducer"
import React, { useEffect, useState } from "react"
import SpinnerReloadRicette from "../../Spinners/SpinnerRelogCustomer"
import { setExtras, setGarnishes, setGinFlavourName, setNome, setTonicaFlavour } from "../../redux/reducers/newGinTonicReducer"
import Ordina from "./Ordina"

const RicetteGinTonic = () => {
    const [selectedRicetta, setSelectedRicetta] = useState(null)
    const dispatch = useDispatch()
    const ginTonicDaInviare = useSelector(state => state.nuovoGinTonic)

    const ricette = useSelector(state => state.ricette.ricette)
    const [showOrdinaRicetta, setShowOrdinaRicetta] = useState(false)

    useEffect(() => {
        if(ricette.length===0){
            dispatch(fetchRicette())
        }
    }, [])
    

    const handleRicettaClick = (ricetta) => {
        setSelectedRicetta(ricetta.name === selectedRicetta ? null : ricetta.name)
    }

    const handleOrdinaClick = (ricetta) => {

        dispatch(setNome(ricetta.name))

        const extrasArray = []
        for (let jindex = 0; jindex < ricetta.extras.length; jindex++){
            extrasArray.push(
                {
                    extraName: ricetta.extras[jindex].extraId,
                    quantity: ricetta.extras[jindex].quantity,
                    um:ricetta.extras[jindex].um
                }  
            )
        }
        dispatch(setExtras(extrasArray))

        const garnishArray = []
        for (let index = 0; index < ricetta.garnishes.length; index++) {
            garnishArray.push({
                garnishName: ricetta.garnishes[index].guarnizioneId,
                quantity:ricetta.garnishes[index].quantity,
                um:ricetta.garnishes[index].um
            })
        }
        dispatch(setGarnishes(garnishArray))

        dispatch(setTonicaFlavour(ricetta.tonicaName))
        dispatch(setGinFlavourName(ricetta.ginFlavourName))
        setShowOrdinaRicetta(true)
    }

    useEffect(() => {
        // console.log(ginTonicDaInviare)
    }, [ginTonicDaInviare])
    

    return (
        <>
        <h3>Intero menu:</h3>
            {ricette.length>0 ? 
                ricette.map((ricetta, index) => (
                    <div 
                        className={`d-flex flex-column p-3 mx-4 mb-2 border m-1 ricettaDiv ${selectedRicetta === ricetta.name ? 'selected' : ''}`} 
                        key={index} 
                        id={"div" + ricetta.name}
                        onClick={() => handleRicettaClick(ricetta)}
                    >
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="p-1 m-1">{ricetta.name}</h5>
                            {selectedRicetta === ricetta.name && (
                            <button 
                                disabled={!ricetta.preparabile}
                                className="btn btn-primary mt-2" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleOrdinaClick(ricetta)
                                }}
                            >
                                {ricetta.preparabile?"Ordina":"Non disponibile :C"}
                            </button>
                        )}
                        </div>
                        <div className="d-flex align-items-center gap-3 p-1">
                            <p className="m-1">Gin: {ricetta.ginFlavourName}</p>
                            <p className="m-1">Tonica: {ricetta.tonicaName}</p>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <div className="d-flex flex-column">
                                <ul className="m-0">
                                    {ricetta.extras.map((extra, index) => (
                                        <li className="" key={index}>{extra.extraId} {extra.quantity}{extra.um}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="d-flex flex-column">
                                <ul className="m-0">
                                    {ricetta.garnishes.map((garnish, index) => (
                                        <li className="" key={index}>{garnish.guarnizioneId} {garnish.quantity}{garnish.um}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            : 
                <div>
                    <SpinnerReloadRicette />
                </div>
            }
            <Ordina show={showOrdinaRicetta} showController={setShowOrdinaRicetta}/>
        </>
    )
}

export default RicetteGinTonic
