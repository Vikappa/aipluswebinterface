import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { setNewItemCaricoType, setDeperibileName, setFlavour, setQuantita, setUm } from "../../../redux/reducers/newItemCaricoReducer";

const RowDeperibileCarico = function() {

    const localItem = useSelector(state => state.newItemCarico.newItem);
    const whareHouse = useSelector(state => state.wharehouse);
    const flavours = useSelector(state => state.flavours.flavours);
    const dispatch = useDispatch();

    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showFlavourModal, setShowFlavourModal] = useState(false);

    const [newItemName, setNewItemName] = useState("");
    const [newItemUm, setNewItemUm] = useState("");
    const [previousFood, setPreviousFood] = useState(localItem.deperibileName);

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value));
    }

    const handleChangeDeperibile = (e) => {
        const selectedFood = e.target.value;
        if (selectedFood === "Aggiungi") {
            setPreviousFood(localItem.deperibileName);
            setShowFoodModal(true);
        } else {
            dispatch(setDeperibileName(selectedFood));

            const foodItem = whareHouse.foodShortLine.find(food => food.name === selectedFood);
            if (foodItem) {
                dispatch(setUm(foodItem.um));
            }
        }
    }

    const handleChangeQuantita = (e) => {
        dispatch(setQuantita(e.target.value));
    }

    const handleChangeUm = (e) => {
        dispatch(setUm(e.target.value));
    }

    const handleChangeFlavour = (e) => {
        if (e.target.value === "Aggiungi") {
            setShowFlavourModal(true);
        } else {
            dispatch(setFlavour(e.target.value));
        }
    }

    const handleFoodModalClose = () => {
        dispatch(setDeperibileName(previousFood));
        setShowFoodModal(false);
    }

    const handleFlavourModalClose = () => {
        setShowFlavourModal(false);
    }

    const handleFoodModalSubmit = () => {
        // Aggiungi qui la logica per fare la POST al backend.
        // Esempio di chiamata API (assicurati di sostituire l'URL con il tuo endpoint):
        /*
        fetch('http://localhost:3001/your-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newItemName, um: newItemUm }),
        }).then(response => response.json())
          .then(data => {
              // Gestisci la risposta della POST qui
          });
        */

        // Aggiorna lo stato globale e chiudi il modale
        dispatch(setDeperibileName(newItemName));
        dispatch(setUm(newItemUm));
        setShowFoodModal(false);
    }

    const handleFlavourModalSubmit = () => {
        // Logica per fare la POST al backend per i flavour
        // Esempio:
        /*
        fetch('http://localhost:3001/your-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newItemName }),
        }).then(response => response.json())
          .then(data => {
              // Gestisci la risposta della POST qui
          });
        */

        // Aggiorna lo stato globale e chiudi il modale
        dispatch(setFlavour(newItemName));
        setShowFlavourModal(false);
    }

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex mb-2">
                    <select id="tipoProdotto" className="form-control me-2" value={localItem.tipo} onChange={handleChangeTipo}>
                        <option value="Alimento deperibile">Alimento deperibile</option>
                        <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                        <option value="Bottiglia di gin">Bottiglia di Gin</option>
                        <option value="Guarnizione">Guarnizione</option>
                    </select>

                    <select id="shortlinesextra" className="form-control me-2" value={localItem.deperibileName} onChange={handleChangeDeperibile}>
                        {whareHouse.foodShortLine.map((food) => (
                            <option key={food.name} value={food.name}>{food.name} - {food.um}</option>
                        ))}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>
                </div>

                <div className="d-flex mb-2">
                    <input type="number" id="quantity" placeholder="Quantità" className="form-control me-2" value={localItem.quantita || ''} onChange={handleChangeQuantita} />
                    <input type="text" id="imInput" placeholder="UM" className="form-control me-2" value={localItem.um || ''} onChange={handleChangeUm} />

                    <select id="flavourSelect" value={localItem.flavour} className="form-control me-2" onChange={handleChangeFlavour}>
                        {flavours.map((flavour) => (
                            <option key={flavour.name} value={flavour.name}>{flavour.name}</option>
                        ))}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>
                </div>
            </div>

            {/* Modale per Food */}
            <Modal show={showFoodModal} onHide={handleFoodModalClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Alimento Deperibile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="newItemName">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="newItemName"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newItemUm">UM</label>
                            <input
                                type="text"
                                className="form-control"
                                id="newItemUm"
                                value={newItemUm}
                                onChange={(e) => setNewItemUm(e.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFoodModalClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleFoodModalSubmit}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>

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
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
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
}

export default RowDeperibileCarico;
