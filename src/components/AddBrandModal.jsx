import { useState } from 'react';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';

function AddBrandModal({ show, onHide, addNewBrand, addNewBrandWithImg }) {
  const [name, setName] = useState('');
  const [surcharge, setSurcharge] = useState(0);
  const [description, setDescription] = useState('');
  const [useUrl, setUseUrl] = useState(false);
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCheckboxChange = (e) => {
    setUseUrl(e.target.checked);
    setUrl('');
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      console.warn("Nessun file selezionato");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (useUrl) {
      addNewBrand({
        name,
        description,
        imageUrl: url,
        sovrapprezzo: surcharge,
      });
    } else {
      if (selectedFile) {
        addNewBrandWithImg({ name, description, image: selectedFile, surcharge });
      } else {
        console.warn("Nessun file immagine selezionato");
      }
    }

    onHide();
  };

  const handleOnHide = () =>{
    setName("")
    setSurcharge("")
    setDescription("")
    setUrl("")
    setSelectedFile(null)
    onHide()
  }

  return (
    <Modal show={show} onHide={handleOnHide}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Brand</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome nuovo brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ophir, Citadelle, ecc"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                onChange={handleCheckboxChange}
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
          <Button variant="primary" type="submit">
            Aggiungi
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddBrandModal;
