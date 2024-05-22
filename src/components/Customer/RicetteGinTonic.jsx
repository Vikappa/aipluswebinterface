import { useDispatch, useSelector } from "react-redux"
import { fetchRicette } from "../../redux/reducers/ricetteReducer"
import Spinner1 from "../Spinner1"
import { useEffect, useState } from "react"
import { pushIntoNewOrdine } from "../../redux/reducers/newOrdineReduce"

const RicetteGinTonic = () => {
    const [localOrdine, setLocalOrdine] = useState({})
    const [selectedRicetta, setSelectedRicetta] = useState(null)

    const ricette = useSelector(state => state.ricette.ricette)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRicette())
    }, [dispatch])

    const handleRicettaClick = (ricetta) => {
        setSelectedRicetta(ricetta.name === selectedRicetta ? null : ricetta.name)
    }

    const handleOrdinaClick = (ricetta) => {

        let ginTonic = {
            name: ricetta.name,
            
        }

        dispatch(pushIntoNewOrdine(ginTonic))
    }

    return (
        <>
            {ricette ? 
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
                                className="btn btn-primary mt-2" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleOrdinaClick(ricetta)
                                }}
                            >
                                Ordina
                            </button>
                        )}
                        </div>
                        <div className="d-flex align-items-center gap-3 p-1">
                            <p className="m-1">Gin: {ricetta.ginName}</p>
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
                    <Spinner1 />
                </div>
            }
        </>
    )
}

export default RicetteGinTonic
