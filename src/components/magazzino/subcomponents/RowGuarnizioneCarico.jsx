import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { setNewItemCaricoType, setGarnishName, setFlavour, setQuantita, setUm, setColor } from "../../../redux/reducers/newItemCaricoReducer";
import { Button, Modal } from "react-bootstrap";
import { fetchFlavours } from "../../../redux/reducers/flavourReducer";
import { fetchColours } from "../../../redux/reducers/colourReducer";
import { pushGarnishToCarico } from "../../../redux/reducers/newCaricoReducer";

const RowGuarnizioneCarico = function() {
    const whareHouse = useSelector(state => state.wharehouse);
    const dispatch = useDispatch();
    const localItem = useSelector(state => state.newItemCarico.newItem);
    const flavours = useSelector(state => state.flavours.flavours);
    const colours = useSelector(state => state.colours.colours);
    const [isTypingNewGarnish, setIsTypingNewGarnish] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
    const [showFlavourModal, setShowFlavourModal] = useState(false);
    const [newColor, setNewColor] = useState("");
    const [newFlavour, setNewFlavour] = useState("");

    useEffect(() => {
        if (whareHouse.garnishShortLine.length > 0) {
            const firstGarnish = whareHouse.garnishShortLine[0];
            dispatch(setGarnishName(firstGarnish.name));
            dispatch(setUm(firstGarnish.um));
            dispatch(setColor(firstGarnish.color.name));
            dispatch(setFlavour(firstGarnish.flavour.name));
        }
    }, [dispatch, whareHouse.garnishShortLine]);

    const handleGarnishChange = (e) => {
        const selectedGarnish = e.target.value;
        if (selectedGarnish === "aggiungi") {
            setIsTypingNewGarnish(true);
            dispatch(setGarnishName(""));
            dispatch(setUm(""));
            dispatch(setColor(""));
            dispatch(setFlavour(""));
        } else {
            setIsTypingNewGarnish(false);
            const selectedItem = whareHouse.garnishShortLine.find(item => item.name === selectedGarnish);
            if (selectedItem) {
                dispatch(setGarnishName(selectedItem.name));
                dispatch(setUm(selectedItem.um));
                dispatch(setColor(selectedItem.color.name));
                dispatch(setFlavour(selectedItem.flavour.name));
            }
        }
    };

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value));
    };

    const handleColorChange = (e) => {
        if (e.target.value === "aggiungi") {
            setShowColorModal(true);
        } else {
            dispatch(setColor(e.target.value));
        }
    };

    const handleFlavourChange = (e) => {
        if (e.target.value === "aggiungi") {
            setShowFlavourModal(true);
        } else {
            dispatch(setFlavour(e.target.value));
        }
    };

    const handleColorModalSubmit = async () => {
        const response = await fetch('localhost:3001/colors/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ name: newColor }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("fetcho colori")
            dispatch(fetchColours());
            dispatch(setColor(data.name));
            setShowColorModal(false);
        } else {
            console.log("Error adding new colour");
        }
    };

    const handleFlavourModalSubmit = async () => {
        const response = await fetch('localhost:3001/flavours/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ name: newFlavour }),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(fetchFlavours());
            dispatch(setFlavour(data.name));
            setShowFlavourModal(false);
        } else {
            console.log("Error adding new flavour");
        }
    };

    const isFormValid = () => {
        return localItem.quantita && localItem.garnishName && localItem.um && localItem.color && localItem.flavour;
    };

    const insertProduct = function() {
        dispatch(pushGarnishToCarico(localItem));
    };

    return (
        <>
            <div className="d-flex mb-3">
                <select id="tipoProdotto" className="form-control me-2" value={localItem.tipo} onChange={handleChangeTipo}>
                    <option value="Guarnizione">Guarnizione</option>
                    <option value="Bottiglia di gin">Bottiglia di Gin</option>
                    <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                    <option value="Alimento deperibile">Alimento deperibile</option>
                </select>

                <select className="form-control" onChange={handleGarnishChange}>
                    {whareHouse.garnishShortLine.length === 0 ? (
                        <option key={"blankline"} value="">Nessuna guarnizione disponibile</option>
                    ) : (
                        whareHouse.garnishShortLine.map((item) => (
                            <option key={item.id} value={item.name}>{item.name} ({item.um}) - {item.flavour.name}, {item.color.name}</option>
                        ))
                    )}
                    <option value="aggiungi">+Aggiungi</option>
                </select>
            </div>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Nome"
                    value={localItem.garnishName}
                    onChange={e => dispatch(setGarnishName(e.target.value))}
                    disabled={!isTypingNewGarnish}
                />
                <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="UM"
                    value={localItem.um}
                    onChange={e => dispatch(setUm(e.target.value))}
                    disabled={!isTypingNewGarnish}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Quantità"
                    value={localItem.quantita}
                    onChange={e => dispatch(setQuantita(e.target.value))}
                />
            </div>
            <div className="d-flex mb-3">
                <select className="form-control mr-2" onChange={handleColorChange} value={localItem.color} disabled={colours.length === 0 || !isTypingNewGarnish}>
                    {colours.length === 0 ? (
                        <option value="">Nessun colore disponibile</option>
                    ) : (
                        colours.map((color) => (
                            <option key={color.id} value={color.name}>{color.name}</option>
                        ))
                    )}
                    <option value="aggiungi">+Aggiungi</option>
                </select>
                <select className="form-control" onChange={handleFlavourChange} value={localItem.flavour} disabled={flavours.length === 0 || !isTypingNewGarnish}>
                    {flavours.length === 0 ? (
                        <option value="">Nessun flavour disponibile</option>
                    ) : (
                        flavours.map((flavour) => (
                            <option key={flavour.id} value={flavour.name}>{flavour.name}</option>
                        ))
                    )}
                    <option value="aggiungi">+Aggiungi</option>
                </select>
            </div>
            <Button disabled={!isFormValid()} onClick={insertProduct}>Ok</Button>

            {/* Modal per aggiungere nuovo colore */}
            <Modal show={showColorModal} onHide={() => setShowColorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Colore</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome Colore"
                        value={newColor}
                        onChange={e => setNewColor(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowColorModal(false)}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleColorModalSubmit}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal per aggiungere nuovo gusto */}
            <Modal show={showFlavourModal} onHide={() => setShowFlavourModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Gusto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome Gusto"
                        value={newFlavour}
                        onChange={e => setNewFlavour(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFlavourModal(false)}>
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

export default RowGuarnizioneCarico;
