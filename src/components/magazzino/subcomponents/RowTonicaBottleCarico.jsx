import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { setNewItemCaricoType, setGinBrand, setFlavour, setNome, setQuantita, resetNewItem, setDataScadenza } from "../../../redux/reducers/newItemCaricoReducer";
import { pushTonicBottleToCarico } from "../../../redux/reducers/newCaricoReducer";
import { fetchTonicBrands } from "../../../redux/reducers/tonicBrandReducer";

const RowTonicaBottleCarico = function() {

    const tonicaBrands = useSelector(state => state.tonicBrand.tonicBrands);
    const localItem = useSelector(state => state.newItemCarico.newItem);
    const flavours = useSelector(state => state.flavours.flavours);
    const dispatch = useDispatch();

    const [showTonicBrandModal, setShowTonicBrandModal] = useState(false);
    const [showFlavourModal, setShowFlavourModal] = useState(false);

    const [newFlavourName, setNewFlavourName] = useState("");
    const [newTonicBrandName, setNewTonicBrandName] = useState("");
    const [newTonicDescription, setNewTonicDescription] = useState("");

    const [previousTonicBrand, setPreviousTonicBrand] = useState(localItem.ginBrand);

    const handleChangeTipo = (e) => {
        e.preventDefault();
        dispatch(setNewItemCaricoType(e.target.value));
    }

    const handleChangeTonicBrand = (e) => {
        e.preventDefault();
        const selectedBrand = e.target.value;
        if (selectedBrand === "Aggiungi") {
            setPreviousTonicBrand(localItem.ginBrand);
            setShowTonicBrandModal(true);
        } else {
            dispatch(setGinBrand(selectedBrand));
        }
    }

    const handleChangeDataScadenza = (e) => {
        e.preventDefault();
        dispatch(setDataScadenza(e.target.value));
    };

    const handleChangeTonicFlavour = (e) => {
        e.preventDefault();
        if (e.target.value === "Aggiungi") {
            setShowFlavourModal(true);
        } else {
            dispatch(setFlavour(e.target.value));
        }
    }

    const handleChangeNome = (e) => {
        e.preventDefault();
        dispatch(setNome(e.target.value));
    }

    const handleChangeQuantita = (e) => {
        e.preventDefault();
        const value = e.target.value === '' ? null : Number(e.target.value);
        if (value !== null && value >= 0) {
            dispatch(setQuantita(value));
        }
    }



    const handleTonicBrandModalClose = () => {
        
        if(previousTonicBrand){
            dispatch(setGinBrand(previousTonicBrand));
        } else {
            dispatch(setGinBrand(tonicaBrands[0].name))
        }
        setShowTonicBrandModal(false);
    }

    const handleFlavourModalClose = () => {
        
        setShowFlavourModal(false);
    }

    const handleTonicBrandModalSubmit = async () => {
        
        const response = await fetch("http://localhost:3001/brandtonica/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: newTonicBrandName, 
                description: newTonicDescription
            })
        });
    
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            dispatch(setGinBrand(newTonicBrandName));
            setShowTonicBrandModal(false);
            setNewTonicBrandName("");
            dispatch(fetchTonicBrands());
        } else {
            console.error("Failed to add tonic brand");
        }
    };
    

    const handleFlavourModalSubmit = async () => {
        const response = await fetch('http://localhost:3001/flavours/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
            },
            body: JSON.stringify({ name: newFlavourName }),
        })
        if(response.ok){
            const data = await response.json();
            console.log(data)
        } else {
            console.log("Error adding new flavour");
        }

        dispatch(setFlavour(newFlavourName))
        setShowFlavourModal(false)
    }

    const isFormValid = () => {
        return localItem.tipo && localItem.nome && localItem.quantita > 0 && localItem.data_scadenza;
    };

    const insertProduct = () => {
        let updatedItem = { ...localItem };

        if (!updatedItem.ginBrand) {
            updatedItem.ginBrand = tonicaBrands[0]?.name || '';
        }

        if (!updatedItem.flavour) {
            updatedItem.flavour = flavours[0]?.name || '';
        }

        if (!updatedItem.quantita) {
            updatedItem.quantita = 1;
        }

        dispatch(pushTonicBottleToCarico(updatedItem));
        dispatch(resetNewItem());
    };

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
                    <input type="number" id="quantity" placeholder="Quantità" className="form-control me-2" value={localItem.quantita || ''} onChange={handleChangeQuantita} />
                </div>

                <div className="d-flex mb-2">
                <input type="date" id="expirationDate" className="form-control me-2" value={localItem.data_scadenza || ''} onChange={handleChangeDataScadenza} />
                    <select id="flavourSelect" value={localItem.flavour} className="form-control me-2" onChange={handleChangeTonicFlavour}>
                        {flavours.map((flavour) => (
                            <option key={flavour.name} value={flavour.name}>{flavour.name}</option>
                        ))}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>
                </div>

                <div className="d-flex mb-2">
                    <Button className="btn btn-success" onClick={insertProduct} disabled={!isFormValid()}>Ok</Button>
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
                            <label htmlFor="newBrandName">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="newBrandName"
                                value={newTonicBrandName}
                                onChange={(e) => setNewTonicBrandName(e.target.value)}
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
                                value={newFlavourName}
                                onChange={(e) => setNewFlavourName(e.target.value)}
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
