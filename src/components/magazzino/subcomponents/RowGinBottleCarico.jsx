import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { Button, Form, InputGroup } from "react-bootstrap";
import {
    setNewItemCaricoType,
    setGinBrand,
    setNome,
    setQuantita,
    setVolume,
    setAnno,
    setDataScadenza,
    resetNewItem,
    setBatchNumber,
    setFlavour,
    setImageUrl,
    deleteImageFile,
    resetImageUrl,
    setAlcPercentage
} from "/src/redux/reducers/newItemCaricoReducer";
import { pushGinBottleToCarico } from "../../../redux/reducers/newCaricoReducer";
import { fetchGinFlavours } from "../../../redux/reducers/ginFlavourReducer";
import { fetchGinBrands } from "../../../redux/reducers/ginBrandsReducer";

const RowGinBottleCarico = function() {
    const dispatch = useDispatch();
    const ginBrands = useSelector(state => state.ginBrands.ginbrands);
    const ginFlavours = useSelector(state => state.ginFlavours.ginFlavours);
    const localItem = useSelector(state => state.newItemCarico.newItem);
    const [showModaleImmagine, setShowModaleImmagine] = useState(false);
    const [showGinBrandModal, setShowGinBrandModal] = useState(false);
    const [showGinFlavourModal, setShowGinFlavourModal] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newGinFlavour, setNewGinFlavour] = useState("");
    const [previousGinBrand, setPreviousGinBrand] = useState(localItem.ginBrand);
    const [surcharge, setSurcharge] = useState(0);
    const [description, setDescription] = useState('');
    const [useUrl, setUseUrl] = useState(false);
    const [url, setUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleChangeUrl = (e) => {
        dispatch(setImageUrl(e.target.value));
    };

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value));
    };

    const handleChangeBatchNumber = (e) => {
        dispatch(setBatchNumber(e.target.value));
    };

    const handleChangeNome = (e) => {
        dispatch(setNome(e.target.value));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        } else {
            console.warn("Nessun file selezionato");
        }
        handleCloseModalAggiungiImmane();
    };

    const handleAddImageUrl = () => {
        dispatch(deleteImageFile());
        handleCloseModalAggiungiImmane();
    };

    const handleChangeQuantita = (e) => {
        const value = e.target.value === '' ? null : Number(e.target.value);
        if (value === null || value >= 0) {
            dispatch(setQuantita(value));
        }
    };

    const handleChangeVolume = (e) => {
        const value = e.target.value === '' ? null : Number(e.target.value);
        if (value === null || value >= 0) {
            dispatch(setVolume(value));
        }
    };

    const handleChangeAnno = (e) => {
        dispatch(setAnno(e.target.value));
    };

    const handleChangeDataScadenza = (e) => {
        dispatch(setDataScadenza(e.target.value));
    };

    const handleImageUpload = () => {
        setShowModaleImmagine(true);
    };

    const handleChangeGinBrand = (e) => {
        const selectedBrand = e.target.value;
        if (selectedBrand === "Aggiungi") {
            setPreviousGinBrand(localItem.ginBrand);
            setShowGinBrandModal(true);
        } else {
            dispatch(setGinBrand(selectedBrand));
        }
    };

    const handleChangeGinFlavour = (e) => {
        if (e.target.value === "Aggiungi") {
            setShowGinFlavourModal(true);
        } else {
            dispatch(setFlavour(e.target.value));
        }
    };

    const handleCloseModalAggiungiImmane = () => {
        setShowModaleImmagine(false);
    };

    const handleGinBrandModalClose = () => {
        dispatch(setGinBrand(previousGinBrand));
        setShowGinBrandModal(false);
    };

    const handleGinFlavourModalClose = () => {
        setShowGinFlavourModal(false);
    }

    const handleAnnulla = () => {
        dispatch(resetImageUrl());
        dispatch(deleteImageFile());
    };

    const handleGinBrandModalSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = url;

        if (!useUrl && selectedFile) {
            const formData = new FormData();
            formData.append('name', newItemName);
            formData.append('imageFile', selectedFile);
            formData.append('description', description);
            formData.append('sovrapprezzo', surcharge);

            try {
                const response = await fetch('http://localhost:3001/ginbrand/uploadimage', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Errore durante il caricamento del file');
                }

                const data = await response.json();
                imageUrl = data.url;
            } catch (error) {
                console.error('Errore:', error);
            }
        }

        try {
            const response = await fetch('http://localhost:3001/ginbrand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
                body: JSON.stringify({ name: newItemName, description, imageUrl, sovrapprezzo: surcharge }),
            });

            if (!response.ok) {
                throw new Error('Errore durante l\'aggiunta del brand');
            }

            dispatch(fetchGinBrands())
            dispatch(setGinBrand(newItemName));
            setShowGinBrandModal(false);
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handleGinFlavourModalSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/ginflavours/add', { 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": newGinFlavour
                })
            })

            if (!response.ok) {
                throw new Error('Errore POST new Flavour')
            }

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error('Errore:', error)
        }

          dispatch(fetchGinFlavours())
          dispatch(setFlavour(newGinFlavour))
        setShowGinFlavourModal(false)
    }

    const handleChangeAlcPercentage = (e) => {
        const value = e.target.value === '' ? null : Number(e.target.value);
        if (value === null || value >= 0) {
            dispatch(setAlcPercentage(value));
        }
    };

    const isFormValid = () => {
        return localItem.nome && localItem.volume > 0 && localItem.alcPercentage > 0 && 
            localItem.anno && localItem.data_scadenza && localItem.batchNumber;
    };

    const insertProduct = async () => {
        let updatedItem = { ...localItem };

        if (!updatedItem.ginBrand) {
            updatedItem.ginBrand = ginBrands[0]?.name || '';
        }

        if (!updatedItem.flavour) {
            updatedItem.flavour = ginFlavours[0]?.name || '';
        }

        if (!updatedItem.imageUrl && selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const token = sessionStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:3001/uploadimg', { 
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Errore durante il caricamento del file');
                }

                const data = await response.json();
                updatedItem.imageUrl = data.url;
            } catch (error) {
                console.error('Errore:', error);
            }
        }

        if (!updatedItem.quantita) {
            updatedItem.quantita = 1;
        }

        dispatch(pushGinBottleToCarico(updatedItem));
        dispatch(resetNewItem());
    };

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex mb-2">
                    <select id="tipoProdotto" className="form-control me-2" value={localItem.tipo} onChange={handleChangeTipo}>
                        <option value="Bottiglia di gin">Bottiglia di Gin</option>
                        <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                        <option value="Alimento deperibile">Alimento deperibile</option>
                        <option value="Guarnizione">Guarnizione</option>
                    </select>

                    <select id="ginBrand" className="form-control me-2" value={localItem.ginBrand} onChange={handleChangeGinBrand}>
                        {ginBrands.map((brand) => (
                            <option key={brand.name} value={brand.name}>{brand.name}</option>
                        ))}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>

                    <input type="text" id="ginName" placeholder="Nome Gin" className="form-control me-2" value={localItem.nome || ''} onChange={handleChangeNome} />
                </div>

                <div className="d-flex mb-2">
                    <input type="number" id="volume" placeholder="Volume (ml)" className="form-control me-2" value={localItem.volume || ''} onChange={handleChangeVolume} />
                    <input type="number" id="alcPerc" placeholder="% alcol" className="form-control me-2" value={localItem.alcPercentage || ''} onChange={handleChangeAlcPercentage} />
                    <select id="ginFlavourSelect" value={localItem.flavour} className="form-control me-2" onChange={handleChangeGinFlavour}>
                        {ginFlavours.map((flavour) => (
                            <option key={flavour.name} value={flavour.name}>{flavour.name}</option>
                        ))}
                        <option value="Aggiungi">+Aggiungi</option>
                    </select>
                </div>

                <div className="d-flex mb-2">
                    <input type="number" id="quantity" placeholder="Quantità" className="form-control me-2" value={localItem.quantita || ''} onChange={handleChangeQuantita} />
                    <input type="text" id="productionDate" placeholder="Data di Produzione" className="form-control me-2" value={localItem.anno || ''} onChange={handleChangeAnno} />
                    <input type="date" id="expirationDate" className="form-control me-2" value={localItem.data_scadenza || ''} onChange={handleChangeDataScadenza} />
                    <input type="text" id="batchNumberinput" className="form-control me-2" placeholder="N° lotto" value={localItem.batchNumber || ''} onChange={handleChangeBatchNumber} />
                </div>
                
                <div className="d-flex mb-2">
                    <button className="btn btn-primary me-2" onClick={handleImageUpload}>
                        {localItem.imageUrl === undefined && localItem.immagine === undefined ? "Carica immagine" : "Modifica immagine"}
                    </button>

                    <button className="btn btn-success" onClick={insertProduct} disabled={!isFormValid()}>Ok</button>
                </div>
            </div>

            {/* Modale per immagine */}
            <Modal show={showModaleImmagine} onHide={handleCloseModalAggiungiImmane}>
                <Modal.Header closeButton>
                    <Modal.Title>Inserisci immagine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="file-upload" className="form-label">Carica immagine</label>
                        <button className="btn btn-outline-primary w-100" onClick={() => fileInputRef.current.click()}>
                            Seleziona File
                        </button>
                        <input 
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="file-upload"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="url" className="form-label">Inserisci URL</label>
                        <div className="input-group">
                            <input 
                                type="text" 
                                id="url" 
                                className="form-control" 
                                placeholder="https://url-tua-immagine.png" 
                                value={localItem.imageUrl || ''}  
                                onChange={handleChangeUrl}
                            />
                            <Button variant="outline-primary" onClick={handleAddImageUrl}>Ok</Button>
                        </div>
                    </div>            
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAnnulla}>
                        Annulla
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modale per Gin Brand */}
            <Modal show={showGinBrandModal} onHide={handleGinBrandModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Brand Gin</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleGinBrandModalSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome nuovo brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ophir, Citadelle, ecc"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                Seleziona la spunta per inserire un URL invece di caricare un file
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Checkbox
                                    aria-label="Checkbox per inserire URL invece di file"
                                    checked={useUrl}
                                    onChange={() => setUseUrl(!useUrl)}
                                />
                                {useUrl ? (
                                    <Form.Control
                                        type="text"
                                        aria-label="Inserisci URL"
                                        placeholder="https://example.com/image.jpg"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                ) : (
                                    <Form.Control
                                        type="file"
                                        aria-label="Carica file immagine"
                                        onChange={handleFileChange}
                                    />
                                )}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Sovrapprezzo</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="0.0"
                                value={surcharge}
                                onChange={(e) => setSurcharge(parseFloat(e.target.value) || 0)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleGinBrandModalClose}>
                            Chiudi
                        </Button>
                        <Button variant="primary" type="submit">
                            Salva
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modale per Gin Flavour */}
            <Modal show={showGinFlavourModal} onHide={handleGinFlavourModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Flavour</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="newGinFlavourName">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="newGinFlavourName"
                                value={newGinFlavour}
                                onChange={(e) => setNewGinFlavour(e.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleGinFlavourModalClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleGinFlavourModalSubmit}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RowGinBottleCarico;
