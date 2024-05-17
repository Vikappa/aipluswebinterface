import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { setNewItemCaricoType, setDeperibileName, setFlavour, setQuantita, setUm, setColor } from "../../../redux/reducers/newItemCaricoReducer";

const RowGuarnizioneCarico = function() {

    const whareHouse = useSelector(state => state.wharehouse);
    const dispatch = useDispatch();
    const localItem = useSelector(state => state.newItemCarico.newItem);
    const flavours = useSelector(state => state.flavours.flavours);
    const colours = useSelector(state => state.colours.colours);

    const [showGarnishModal, setShowGarnishModal] = useState(false);
    const [showFlavourModal, setShowFlavourModal] = useState(false);
    const [showColourModal, setShowColourModal] = useState(false);

    const [newItemName, setNewItemName] = useState("");
    const [newItemUm, setNewItemUm] = useState("");
    const [previousGarnish, setPreviousGarnish] = useState(localItem.deperibileName);

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value));
    }

    const handleChangeColor = (e) => {
        if (e.target.value === "Aggiungi") {
            setShowColourModal(true);
        } else {
            dispatch(setColor(e.target.value));
        }
    }

    const handleChangeFlavour = (e) => {
        if (e.target.value === "Aggiungi") {
            setShowFlavourModal(true);
        } else {
            dispatch(setFlavour(e.target.value));
        }
    }

    const handleChangeGarnish = (e) => {
        const selectedGarnish = e.target.value;
        if (selectedGarnish === "Aggiungi") {
            setPreviousGarnish(localItem.deperibileName);
            setShowGarnishModal(true);
        } else {
            dispatch(setDeperibileName(selectedGarnish));

            const garnishItem = whareHouse.garnishShortLine.find(garnish => garnish.name === selectedGarnish);
            if (garnishItem) {
                dispatch(setUm(garnishItem.um));
            }
        }
    }

    const handleChangeQuantita = (e) => {
        dispatch(setQuantita(e.target.value));
    }

    const handleChangeUm = (e) => {
        dispatch(setUm(e.target.value));
    }

    const handleGarnishModalClose = () => {
        dispatch(setDeperibileName(previousGarnish));
        setShowGarnishModal(false);
    }

    const handleFlavourModalClose = () => {
        setShowFlavourModal(false);
    }

    const handleColourModalClose = () => {
        setShowColourModal(false);
    }

    const handleGarnishModalSubmit = () => {
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
        setShowGarnishModal(false);
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

    const handleColourModalSubmit = () => {
        // Logica per fare la POST al backend per i colori
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
        dispatch(setColor(newItemName));
        setShowColourModal(false);
    }

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex mb-2">
                    <select id="tipoProdotto" className="form-control me-2" value={localItem.tipo} onChange={handleChangeTipo}>
                        <option value="Guarnizione">Guarnizione</option>
                        <option value="Alimento deperibile">Alimento deperibile</option>
                        <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                        <option value="Bottiglia di gin">Bottiglia di Gin</option>
                    </select>

                    <select id="shortlinesextra" className="form-control me-2" value={localItem.deperibileName} onChange={handleChangeGarnish}>
                        {whareHouse.garnishShortLine.map((food) => (
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
                    <select id="colorSelect" value={localItem.color} className="form-control me-2" onChange={handleChangeColor}>
                        {colours.map((color) => (
                            <option key={color.name} value={color.name}>{color.name}</option>
                        ))}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>
                </div>
            </div>

            {/* Modale per Garnish */}
            <Modal show={showGarnishModal} onHide={handleGarnishModalClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Elemento</Modal.Title>
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
                    <Button variant="secondary" onClick={handleGarnishModalClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleGarnishModalSubmit}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modale per Flavour */}
            <Modal show={showFlavourModal} onHide={handleFlavourModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Flavour</Modal.Title>
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

            {/* Modale per Colour */}
            <Modal show={showColourModal} onHide={handleColourModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Colore</Modal.Title>
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleColourModalClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleColourModalSubmit}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RowGuarnizioneCarico;
