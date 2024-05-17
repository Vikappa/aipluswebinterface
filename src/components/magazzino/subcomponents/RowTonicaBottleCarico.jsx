import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { setNewItemCaricoType, setGinBrand, setFlavour, setNome, setQuantita, setVolume } from "../../../redux/reducers/newItemCaricoReducer";

const RowTonicaBottleCarico = function() {

    const tonicaBrands = useSelector(state => state.tonicBrand.tonicBrands);
    const localItem = useSelector(state => state.newItemCarico.newItem);
    const flavours = useSelector(state => state.flavours.flavours);
    const dispatch = useDispatch();

    const [showTonicBrandModal, setShowTonicBrandModal] = useState(false);
    const [showFlavourModal, setShowFlavourModal] = useState(false);

    const [newItemName, setNewItemName] = useState("");
    const [previousTonicBrand, setPreviousTonicBrand] = useState(localItem.ginBrand);

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value));
    }

    const handleChangeTonicBrand = (e) => {
        const selectedBrand = e.target.value;
        if (selectedBrand === "Aggiungi") {
            setPreviousTonicBrand(localItem.ginBrand);
            setShowTonicBrandModal(true);
        } else {
            dispatch(setGinBrand(selectedBrand));
        }
    }

    const handleChangeTonicFlavour = (e) => {
        if (e.target.value === "Aggiungi") {
            setShowFlavourModal(true);
        } else {
            dispatch(setFlavour(e.target.value));
        }
    }

    const handleChangeNome = (e) => {
        dispatch(setNome(e.target.value));
    }

    const handleChangeQuantita = (e) => {
        dispatch(setQuantita(e.target.value));
    }

    const handleChangeVolume = (e) => {
        dispatch(setVolume(e.target.value));
    }

    const handleTonicBrandModalClose = () => {
        dispatch(setGinBrand(previousTonicBrand));
        setShowTonicBrandModal(false);
    }

    const handleFlavourModalClose = () => {
        setShowFlavourModal(false);
    }

    const handleTonicBrandModalSubmit = () => {
        // Aggiungi qui la logica per fare la POST al backend.
        // Esempio di chiamata API (assicurati di sostituire l'URL con il tuo endpoint):
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
        dispatch(setGinBrand(newItemName));
        setShowTonicBrandModal(false);
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
                        <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                        <option value="Bottiglia di gin">Bottiglia di Gin</option>
                        <option value="Alimento deperibile">Alimento deperibile</option>
                        <option value="Guarnizione">Guarnizione</option>
                    </select>

                    <select id="tonicaBrands" className="form-control me-2" value={localItem.ginBrand} onChange={handleChangeTonicBrand}>
                        {tonicaBrands.map((brand) => (
                            <option key={brand.name} value={brand.name}>{brand.name}</option>
                        ))}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>
                </div>

                <div className="d-flex mb-2">
                    <input type="text" id="tonicName" placeholder="Nome Tonica" className="form-control me-2" value={localItem.nome || ''} onChange={handleChangeNome} />
                    <input type="number" id="volume" placeholder="Volume (ml)" className="form-control me-2" value={localItem.volume || ''} onChange={handleChangeVolume} />
                </div>

                <div className="d-flex mb-2">
                    <input type="number" id="quantity" placeholder="Quantità" className="form-control me-2" value={localItem.quantita || ''} onChange={handleChangeQuantita} />
                    <select id="flavourSelect" value={localItem.flavour} className="form-control me-2" onChange={handleChangeTonicFlavour}>
                        {flavours.map((flavour) => (
                            <option key={flavour.name} value={flavour.name}>{flavour.name}</option>
                        ))}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>
                </div>
            </div>

            {/* Modale per Tonic Brand */}
            <Modal show={showTonicBrandModal} onHide={handleTonicBrandModalClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Brand Tonica</Modal.Title>
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
                    <Button variant="secondary" onClick={handleTonicBrandModalClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleTonicBrandModalSubmit}>
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

export default RowTonicaBottleCarico;
