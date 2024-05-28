import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import {
    setNewItemCaricoType, setDeperibileName, setFlavour, setQuantita, setUm, setDataScadenza,
    resetNewItem
} from "../../../redux/reducers/newItemCaricoReducer";
import { pushExtraToCarico } from "../../../redux/reducers/newCaricoReducer";
import { fetchFlavours } from "../../../redux/reducers/flavourReducer";
import React from "react"


const RowDeperibileCarico = function() {

    const localItem = useSelector(state => state.newItemCarico.newItem);
    const whareHouse = useSelector(state => state.wharehouse);
    const flavours = useSelector(state => state.flavours.flavours);
    const dispatch = useDispatch();

    const [showFlavourModal, setShowFlavourModal] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemUm, setNewItemUm] = useState("");
    const [previousFood, setPreviousFood] = useState(localItem.deperibileName);
    const [isAddingNewFood, setIsAddingNewFood] = useState(false);
    const [newFlavourName, setNewFlavourName] = useState("");

    const handleChangeNewFlavourName = (e) => {
        setNewFlavourName(e.target.value);
    };

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value));
    };

    useEffect(() => {
        dispatch(setFlavour(localItem.flavour));
    }, [localItem.tipo]);

    const handleChangeDeperibile = (e) => {
        const selectedFood = e.target.value;
        if (selectedFood === "Aggiungi") {
            setPreviousFood(localItem.deperibileName);
            setIsAddingNewFood(true);
            dispatch(setDeperibileName(""));
            dispatch(setUm(""));
        } else {
            setIsAddingNewFood(false);
            dispatch(setDeperibileName(selectedFood));

            const foodItem = whareHouse.foodShortLine.find(food => food.name === selectedFood);
            if (foodItem) {
                dispatch(setUm(foodItem.um));
                dispatch(setFlavour(foodItem.flavour.name));
            }
        }
    };

    const handleChangeQuantita = (e) => {
        dispatch(setQuantita(e.target.value));
    };

    const handleChangeDataScadenza = (e) => {
        dispatch(setDataScadenza(e.target.value));
    };

    const handleChangeFlavour = (e) => {
        if (e.target.value === "Aggiungi") {
            setShowFlavourModal(true);
        } else {
            dispatch(setFlavour(e.target.value));
        }
    };

    const handleFlavourModalClose = () => {
        setShowFlavourModal(false);
    };

    const handleFlavourModalSubmit = async () => {
        const response = await fetch('https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/flavours/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({ name: newFlavourName })
        });
        if (response.ok) {
            const newFlavour = await response.json();
            dispatch(fetchFlavours());
            dispatch(setFlavour(newFlavour.name));
            setNewFlavourName("");
        } else {
            console.error('Error adding new flavour:', response.status);
        }
        setShowFlavourModal(false);
    };

    const handleNewItemChange = (e) => {
        setNewItemName(e.target.value);
        dispatch(setDeperibileName(e.target.value));
    };

    const handleNewItemUmChange = (e) => {
        setNewItemUm(e.target.value);
        dispatch(setUm(e.target.value));
    };

    const insertExtra = function(){
        let updatedItem = {...localItem};
        if(!updatedItem.deperibileName && whareHouse.foodShortLine.length > 0){
            updatedItem.deperibileName = whareHouse.foodShortLine[0].name;
            updatedItem.um = whareHouse.foodShortLine[0].um;
        }
        if(!updatedItem.flavour && flavours.length > 0){
            updatedItem.flavour = flavours[0].name;
        }
        dispatch(pushExtraToCarico(updatedItem));
        dispatch(resetNewItem());
    };

    const isFormValid= () =>{
        return localItem.quantita > 0 && localItem.data_scadenza && localItem.deperibileName && localItem.flavour && localItem.um;
    };

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex mb-2">
                    <select id="tipoProdotto" className="form-control me-2" value={localItem.tipo} onChange={handleChangeTipo}>
                        <option value="Alimento deperibile">Alimento deperibile</option>
                        <option value="Bottiglia di gin">Bottiglia di Gin</option>
                        <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                        <option value="Guarnizione">Guarnizione</option>
                    </select>

                    {isAddingNewFood ? (
                        <>
                            <input type="text" id="newItemName" className="form-control me-2" placeholder="Nome" value={newItemName} onChange={handleNewItemChange} />
                            <input type="text" id="newItemUm" className="form-control me-2" placeholder="UM" value={newItemUm} onChange={handleNewItemUmChange} />
                        </>
                    ) : (
                        <select id="shortlinesextra" className="form-control me-2" value={localItem.deperibileName} onChange={handleChangeDeperibile}>
                            {whareHouse.foodShortLine.length === 0 ? (
                                <option value="">Nessun alimento disponibile</option>
                            ) : (
                                whareHouse.foodShortLine.map((food) => (
                                    <option key={food.name} value={food.name}>{food.name} ({food.um}) - {food.flavour.name}</option>
                                ))
                            )}
                            <option value="Aggiungi">+Aggiungi</option>
                        </select>
                    )}
                </div>

                <div className="d-flex mb-2">
                    <input type="number" id="quantity" placeholder="Quantità" className="form-control me-2" value={localItem.quantita || ''} onChange={handleChangeQuantita}/>
                    <input type="date" id="expirationDate" className="form-control me-2" value={localItem.data_scadenza || ''} onChange={handleChangeDataScadenza} />

                    <select id="flavourSelect" value={localItem.flavour} className="form-control me-2" onChange={handleChangeFlavour} disabled={flavours.length === 0}>
                        {flavours.length === 0 ? (
                            <option value="">Nessun flavour disponibile</option>
                        ) : (
                            flavours.map((flavour) => (
                                <option key={flavour.name} value={flavour.name}>{flavour.name}</option>
                            ))
                        )}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>
                </div>
            </div>

            <Button variant="success" disabled={!isFormValid()} onClick={insertExtra}>Ok</Button>

            {/* Modale per Flavour */}
            <Modal show={showFlavourModal} onHide={handleFlavourModalClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Flavour</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="newFlavourName">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="newFlavourName"
                                value={newFlavourName}
                                onChange={handleChangeNewFlavourName}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFlavourModalClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleFlavourModalSubmit}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RowDeperibileCarico;
