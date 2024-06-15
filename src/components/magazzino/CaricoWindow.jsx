import React, { useEffect, useState } from "react"
import { useSelector, useDispatch  } from "react-redux";
import { setCaricoType, setCaricoNote, setOperatore, resetCarico } from "../../redux/reducers/newCaricoReducer";
import RowGinBottleCarico from "./subcomponents/RowGinBottleCarico";
import RowGuarnizioneCarico from "./subcomponents/RowGuarnizioneCarico";
import RowTonicaBottleCarico from "./subcomponents/RowTonicaBottleCarico";
import RowDeperibileCarico from "./subcomponents/RowDeperibileCarico";
import { setNewItemCaricoType } from "../../redux/reducers/newItemCaricoReducer";
import ResumeRowProdotto from './subcomponents/ResumeRowProdotto'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchColours } from "../../redux/reducers/colourReducer";
import { fetchFlavours } from "../../redux/reducers/flavourReducer";
import { fetchGinFlavours } from "../../redux/reducers/ginFlavourReducer";
import { fetchTonicBrands } from "../../redux/reducers/tonicBrandReducer";

const CaricoWindow = function() {

    const user = useSelector(state => state.newCarico.carico.operatore)
    let newItemType = useSelector(state => state.newItemCarico.newItem.tipo);
    const itemsList = useSelector(state => state.newCarico.carico.data);
    const dataDiOggi = new Date();
    const dispatch = useDispatch();
    let note = useSelector(state => state.newCarico.carico.note)
    let carrello = useSelector(state => state.newCarico.carico.data)
    const [nCarico, setNCarico] = useState(null);
    const navigate = useNavigate();    


    const handleSelectChange = (e) => {
        dispatch(setNewItemCaricoType(e.target.value)); 
        dispatch(fetchColours())
        dispatch(fetchFlavours())
        dispatch(fetchGinFlavours())
        dispatch(fetchTonicBrands())
    }
    

    const rowDispatcher = () => {
        switch(newItemType){
            case "Seleziona tipo prodotto":
                break;
            case "Bottiglia di gin":
                return <RowGinBottleCarico/>;
            case "Bottiglia di tonica":
                return <RowTonicaBottleCarico/>;
            case "Alimento deperibile":
                return <RowDeperibileCarico/>
            case "Guarnizione":
                return <RowGuarnizioneCarico/>;
            default:
                dispatch(setCaricoType("Seleziona tipo prodotto"));
                break
        }
    }
    
    const handleNoteChange = (e) => {
        const noteValue = e.target.value;
        dispatch(setCaricoNote(noteValue));
    }

    useEffect(() => {
        fetchNCarico()

    }, [dispatch])
    
    const fetchNCarico = async () => {
        try{
            const response = await fetch('http://localhost:3001/carichi/getlastcarico', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ sessionStorage.getItem("token")
                }
            })
            if(response.ok){
                const data = await response.json()

                setNCarico(data)
            }
        } catch (error) {
            console.error('Errore fetch numero carico', error);
        }

    }

    const fetchUser = async () => {

        try {
            const response = await fetch('http://localhost:3001/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ sessionStorage.getItem("token")
                }
            })
            if(response.ok){
                const data = await response.json()
                dispatch(setOperatore({
                    id: "8b34df81-d5dc-44c4-bec8-9ba1c54f6d56",
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    password: data.password,
                    role: data.role
                }))
            }
        }
            catch (error) {
                console.error('An error occurred:', error);
            }
        }
    
    useEffect(() => {
        fetchUser();
    }, [])

    const sendCarico = async function(){
        const response = await fetch('http://localhost:3001/carichi', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
                operatore: user, 
                prodotti: carrello,
                note: note
            })
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            navigate(-1);
            dispatch(resetCarico())
        } else {
            console.error("Failed to add carico");
        }
    }
    

    
    

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center' }} className="full-width  p-2" >
            <form style={{ display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <label htmlFor="inputncarico" style={{ marginRight: '10px' }}>N° Carico:</label>
                    <input type="text" name="inputncarico" id="inputncarico" className="form-control" value={nCarico+1} readOnly/>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', flex: '1', marginRight: '20px' }}>
                    <label htmlFor="inputoperatorecarico" style={{ marginRight: '10px' }}>Operatore:</label>
                    <input type="text" name="inputoperatorecarico" id="inputoperatorecarico" className="form-control" value={user?user.name + " " + user.surname:"..."} readOnly/>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="datacarico" style={{ marginRight: '10px' }}>Data carico:</label>
                    <input type="text" id="datacarico" className="form-control" readOnly value={formatDate(dataDiOggi)} />
                </div>
            </form>
        </div>

        <h1 className="p-2 full-width" >Lista prodotti</h1>
        
        <ul className="full-width p-2" style={{ listStyle: 'none', padding: '0' }}>

            {itemsList && itemsList.map((item, index) => (
                <ResumeRowProdotto item={item} key={index}/>
            ))}


            {newItemType==="Seleziona tipo prodotto"?
            <li>
            <div className="form-group d-flex full-width">
            <select 
            className="form-control"
            value={newItemType}
            onChange={handleSelectChange}
                id="tipoProdotto">
                   <option>Seleziona tipo prodotto</option>
                   <option>Bottiglia di gin</option>
                   <option>Bottiglia di tonica</option>
                   <option>Alimento deperibile</option>
                   <option>Guarnizione</option>
                </select>
            </div>  
            </li>
            :
            rowDispatcher()
            }

        </ul>
        <div className="d-flex container-fluid ">

            <textarea 
                className="form-control" 
                id="note" 
                placeholder="Note" 
                rows="4"
                value={note}
                onChange={(e) => handleNoteChange(e)}
                />
            </div>
            <Button className="m-3" disabled={carrello.length === 0} onClick={sendCarico}>Invia</Button>
        </>
    );
}

export default CaricoWindow;
