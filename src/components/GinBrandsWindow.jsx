import { useState, useEffect } from "react";
import { Accordion, Button, Modal, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Spinner1 from "./Spinner1";

const GinBrandsWindow = () => {
    const [sessionToken, setSessionToken] = useState(sessionStorage.getItem("token") || null);
    const [isLoading, setIsLoading] = useState(true);
    const [ginBrands, setGinBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [uploadMode, setUploadMode] = useState("url"); // "url" o "file"
    const [newBrandName, setNewBrandName] = useState('');
    const [newBrandDescription, setNewBrandDescription] = useState('');
    const [newBrandSovrapprezzo, setNewBrandSovrapprezzo] = useState('');
    const [newBrandImageUrl, setNewBrandImageUrl] = useState('');
    const [newBrandImageFile, setNewBrandImageFile] = useState(null);

    // Carica i brand di gin
    const fetchGinBrands = async () => {
        try {
            const response = await fetch('http://localhost:3001/ginbrand/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setGinBrands(data);
            } else {
                console.error('Failed to fetch gin brands:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Aggiungi un nuovo brand
    const addNewBrand = async () => {
        let response;
        try {
            if (uploadMode === "url") {
                // Usa l'endpoint per URL immagine
                response = await fetch('http://localhost:3001/ginbrand', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionToken
                    },
                    body: JSON.stringify({
                        name: newBrandName,
                        description: newBrandDescription,
                        img: newBrandImageUrl,
                        sovrapprezzo: newBrandSovrapprezzo
                    })
                });
            } else if (uploadMode === "file") {
                // Usa l'endpoint per file immagine
                const formData = new FormData();
                formData.append("name", newBrandName);
                formData.append("description", newBrandDescription);
                formData.append("sovrapprezzo", newBrandSovrapprezzo);
                formData.append("img", newBrandImageFile);

                response = await fetch('http://localhost:3001/ginbrand/uploadimage', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + sessionToken
                    },
                    body: formData
                });
            }

            if (response && response.ok) {
                fetchGinBrands(); // Aggiorna la lista dei brand
                closeModal(); // Chiudi il form modale
            } else {
                console.error('Failed to add gin brand:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // Apre il form modale
    const openModal = () => setShowModal(true);

    // Chiude il form modale e resetta i campi
    const closeModal = () => {
        setShowModal(false);
        setNewBrandName('');
        setNewBrandDescription('');
        setNewBrandSovrapprezzo('');
        setNewBrandImageUrl('');
        setNewBrandImageFile(null);
        setUploadMode("url");
    };

    // Carica i dati al montaggio del componente
    useEffect(() => {
        if (sessionToken) {
            fetchGinBrands();
        }
    }, [sessionToken]);

    // Ritorna il contenuto dell'accordion
    const GinBrandsSection = () => (
        <>
            {isLoading ? (
                <Spinner1 />
            ) : (
                <div>
                    <h5>Brands di Gin registrati</h5>
                    <Accordion>
                        {ginBrands.map((brand, index) => (
                            <Accordion.Item eventKey={index.toString()} key={brand.id}>
                                <Accordion.Header>{brand.name}</Accordion.Header>
                                <Accordion.Body>
                                    <div className="d-flex">
                                        <img height="28px" src={brand.img} alt="Gin Brand" />
                                        <div className="ms-3">
                                            <p>Descrizione: {brand.description}</p>
                                            <p>Sovrapprezzo: {brand.sovrapprezzo}</p>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                        {/* Riga per aggiungere nuovi brand */}
                        <Accordion.Item eventKey="add">
                            <Accordion.Header>
                                <Button variant="outline-primary" size="sm" onClick={openModal}>
                                    + Aggiungi Nuovo Brand
                                </Button>
                            </Accordion.Header>
                        </Accordion.Item>
                    </Accordion>
                </div>
            )}
        </>
    );

    // Form Modale per aggiungere un nuovo brand
    const AddBrandModal = () => (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Aggiungi un Nuovo Gin Brand</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBrandName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBrandDescription">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control
                            type="text"
                            value={newBrandDescription}
                            onChange={(e) => setNewBrandDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBrandSovrapprezzo">
                        <Form.Label>Sovrapprezzo</Form.Label>
                        <Form.Control
                            type="number"
                            value={newBrandSovrapprezzo}
                            onChange={(e) => setNewBrandSovrapprezzo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Label>Carica Immagine</Form.Label>
                    <ToggleButtonGroup
                        type="radio"
                        name="uploadMode"
                        value={uploadMode}
                        onChange={(val) => setUploadMode(val)}
                    >
                        <ToggleButton id="url" value="url">URL Immagine</ToggleButton>
                        <ToggleButton id="file" value="file">File Immagine</ToggleButton>
                    </ToggleButtonGroup>
                    {uploadMode === "url" ? (
                        <Form.Group controlId="formBrandImageUrl">
                            <Form.Label>URL Immagine</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBrandImageUrl}
                                onChange={(e) => setNewBrandImageUrl(e.target.value)}
                            />
                        </Form.Group>
                    ) : (
                        <Form.Group controlId="formBrandImageFile">
                            <Form.Label>File Immagine</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setNewBrandImageFile(e.target.files[0])}
                            />
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Annulla
                </Button>
                <Button variant="primary" onClick={addNewBrand}>
                    Aggiungi Brand
                </Button>
            </Modal.Footer>
        </Modal>
    );

    // Ritorna il componente con il form modale
    return (
        <div>
            {sessionToken ? <GinBrandsSection /> : <h1>Errore, torna al login</h1>}
            <AddBrandModal />
        </div>
    );
};

export default GinBrandsWindow;
