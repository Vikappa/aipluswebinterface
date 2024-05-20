import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { fetchGinBrands } from '../redux/reducers/ginBrandsReducer.js';

const AddRicettaForm = () => {
  const ginFlavours = useSelector(state => state.ginFlavours.ginFlavours);
  const flavours = useSelector(state => state.flavours.flavours);
  const wharehouse = useSelector(state => state.wharehouse);
  const dispatch = useDispatch();

  const getInitialExtra = () => wharehouse.foodShortLine.length > 0 ? { extraId: wharehouse.foodShortLine[0].name, UM: wharehouse.foodShortLine[0].um, quantity: "" } : { extraId: "", quantity: "", UM: "" };
  const getInitialGarnish = () => wharehouse.garnishShortLine.length > 0 ? { guarnizioneId: wharehouse.garnishShortLine[0].name, UM: wharehouse.garnishShortLine[0].um, quantity: "" } : { guarnizioneId: "", quantity: "", UM: "" };

  const [newRicetta, setNewRicetta] = useState({
    name: "",
    gin_flavour_id: ginFlavours.length > 0 ? ginFlavours[0].name : "",
    flavour_tonica_id: flavours.length > 0 ? flavours[0].name : "",
    extras: [getInitialExtra()],
    garnishes: [getInitialGarnish()]
  });

  const [showGinFlavourModal, setShowGinFlavourModal] = useState(false);
  const [showFlavourModal, setShowFlavourModal] = useState(false);
  const [newGinFlavour, setNewGinFlavour] = useState("");
  const [newFlavour, setNewFlavour] = useState("")

  // const addRicetta = async function(ricetta){
  //   const responde = await fetch("")
  // }


  useEffect(() => {
    dispatch(fetchGinBrands());
  }, [dispatch]);

  useEffect(() => {
    if (ginFlavours.length > 0) {
      setNewRicetta(prevState => ({
        ...prevState,
        gin_flavour_id: ginFlavours[0].name
      }));
    }
  }, [ginFlavours]);

  useEffect(() => {
    if (flavours.length > 0) {
      setNewRicetta(prevState => ({
        ...prevState,
        flavour_tonica_id: flavours[0].name
      }));
    }
  }, [flavours]);

  useEffect(() => {
    if (wharehouse.foodShortLine.length > 0) {
      setNewRicetta(prevState => ({
        ...prevState,
        extras: [getInitialExtra()]
      }));
    }
  }, [wharehouse.foodShortLine]);

  useEffect(() => {
    if (wharehouse.garnishShortLine.length > 0) {
      setNewRicetta(prevState => ({
        ...prevState,
        garnishes: [getInitialGarnish()]
      }));
    }
  }, [wharehouse.garnishShortLine]);

  const handleChangeGinFlavour = (e) => {
    const value = e.target.value;
    if (value === "Aggiungi") {
      setShowGinFlavourModal(true);
    } else {
      setNewRicetta({ ...newRicetta, gin_flavour_id: value });
    }
  };

  const handleChangeTonicFlavour = (e) => {
    const value = e.target.value;
    if (value === "Aggiungi") {
      setShowFlavourModal(true);
    } else {
      setNewRicetta({ ...newRicetta, flavour_tonica_id: value });
    }
  };

  const handleSelectChange = (e, index, type) => {
    const { value } = e.target;
    if (type === "extra") {
      const extras = [...newRicetta.extras];
      if (value === "Aggiungi") {
        // Open modal or handle adding new extra here
      } else {
        const selected = wharehouse.foodShortLine.find(item => item.name === value);
        extras[index] = { extraId: selected.name, quantity: "", UM: selected.um };
      }
      setNewRicetta({ ...newRicetta, extras });
    } else if (type === "garnish") {
      const garnishes = [...newRicetta.garnishes];
      if (value === "Aggiungi") {
        // Open modal or handle adding new garnish here
      } else {
        const selected = wharehouse.garnishShortLine.find(item => item.name === value);
        garnishes[index] = { guarnizioneId: selected.name, quantity: "", UM: selected.um };
      }
      setNewRicetta({ ...newRicetta, garnishes });
    }
  };

  const handleQuantityChange = (e, index, type) => {
    const { value } = e.target;
    if (type === "extra") {
      const extras = [...newRicetta.extras];
      extras[index].quantity = value;
      setNewRicetta({ ...newRicetta, extras });
    } else if (type === "garnish") {
      const garnishes = [...newRicetta.garnishes];
      garnishes[index].quantity = value;
      setNewRicetta({ ...newRicetta, garnishes });
    }
  };

  const handleAddExtra = () => {
    const newExtra = getInitialExtra();
    setNewRicetta({
      ...newRicetta,
      extras: [...newRicetta.extras, newExtra]
    });
  };

  const handleAddGarnish = () => {
    const newGarnish = getInitialGarnish();
    setNewRicetta({
      ...newRicetta,
      garnishes: [...newRicetta.garnishes, newGarnish]
    });
  };

  const handleRemoveExtra = (index) => {
    const extras = [...newRicetta.extras];
    extras.splice(index, 1);
    setNewRicetta({ ...newRicetta, extras });
  };

  const handleRemoveGarnish = (index) => {
    const garnishes = [...newRicetta.garnishes];
    garnishes.splice(index, 1);
    setNewRicetta({ ...newRicetta, garnishes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRicetta(newRicetta)
  };

  const handleGinFlavourModalClose = () => {
    setShowGinFlavourModal(false);
  };

  const handleFlavourModalClose = () => {
    setShowFlavourModal(false);
  };

  const handleGinFlavourModalSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/ginflavours/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": newGinFlavour })
      });

      if (!response.ok) {
        throw new Error('Errore POST new Flavour');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Errore:', error);
    }
    setShowGinFlavourModal(false);
  };

  const handleFlavourModalSubmit = async () => {
    const response = await fetch('http://localhost:3001/flavours/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({ name: newFlavour })
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("Error adding new flavour");
    }

    dispatch(setNewFlavour(newFlavour));
    setShowFlavourModal(false);
  };

  const isFormValid = function () {
    return newRicetta.name !== "" && newRicetta.flavour_tonica_id !== "" && newRicetta.gin_flavour_id !== "";
  };

  const salvaRicetta = () => {
    if (isFormValid()) {
      addRicetta(newRicetta)
    }
  };

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingNew">
          <button
            className="accordion-button collapsed text-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseNew"
            aria-expanded="false"
            aria-controls="collapseNew"
          >
            Aggiungi ricetta
          </button>
        </h2>
        <div
          id="collapseNew"
          className="accordion-collapse collapse"
          aria-labelledby="headingNew"
          data-bs-parent="#accordionRicette"
        >
          <div className="accordion-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome Ricetta</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newRicetta.name}
                  onChange={(e) => setNewRicetta({ ...newRicetta, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gin Flavour</label>
                <select
                  id="ginFlavourSelect"
                  value={newRicetta.gin_flavour_id}
                  className="form-control me-2"
                  onChange={handleChangeGinFlavour}
                >
                  {ginFlavours.length === 0 ? (
                    <option value="">Nessun flavour disponibile</option>
                  ) : (
                    ginFlavours.map((flavour) => (
                      <option key={flavour.name} value={flavour.name}>
                        {flavour.name}
                      </option>
                    ))
                  )}
                  <option value="Aggiungi">+Aggiungi</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Tonica Flavour</label>
                <select
                  id="flavourSelect"
                  value={newRicetta.flavour_tonica_id}
                  className="form-control me-2"
                  onChange={handleChangeTonicFlavour}
                >
                  {flavours.length === 0 ? (
                    <option value="">Nessun flavour disponibile</option>
                  ) : (
                    flavours.map((flavour) => (
                      <option key={flavour.name} value={flavour.name}>
                        {flavour.name}
                      </option>
                    ))
                  )}
                  <option value="Aggiungi">+Aggiungi</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Extras</label>
                {newRicetta.extras.map((extra, index) => (
                  <div key={index} className="mb-2 d-flex align-items-center">
                    <select
                      id="extraSelect"
                      value={extra.extraId}
                      className="form-control me-2"
                      onChange={(e) => handleSelectChange(e, index, "extra")}
                    >
                      {wharehouse.foodShortLine.length === 0 ? (
                        <option value="">Nessun extra disponibile</option>
                      ) : (
                        wharehouse.foodShortLine.map((flavour) => (
                          <option key={flavour.name} value={flavour.name}>
                            {flavour.name} ({flavour.um})
                          </option>
                        ))
                      )}
                      <option value="Aggiungi">+Aggiungi</option>
                    </select>
                    <input
                      type="text"
                      className="form-control mb-1 me-1"
                      placeholder="Quantity"
                      name="quantity"
                      value={extra.quantity}
                      onChange={(e) => handleQuantityChange(e, index, "extra")}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-danger mb-1"
                      onClick={() => handleRemoveExtra(index)}
                    >
                      Rimuovi
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary mb-2" onClick={handleAddExtra}>
                  Aggiungi Extra
                </button>
              </div>
              <div className="mb-3">
                <label className="form-label">Garnishes</label>
                {newRicetta.garnishes.map((garnish, index) => (
                  <div key={index} className="mb-2 d-flex align-items-center">
                    <select
                      id="garnishSelect"
                      value={garnish.guarnizioneId}
                      className="form-control me-2"
                      onChange={(e) => handleSelectChange(e, index, "garnish")}
                    >
                      {wharehouse.garnishShortLine.length === 0 ? (
                        <option value="">Nessun garnish disponibile</option>
                      ) : (
                        wharehouse.garnishShortLine.map((garnish) => (
                          <option key={garnish.name} value={garnish.name}>
                            {garnish.name} ({garnish.um})
                          </option>
                        ))
                      )}
                      <option value="Aggiungi">+Aggiungi</option>
                    </select>
                    <input
                      type="text"
                      className="form-control mb-1 me-1"
                      placeholder="Quantity"
                      name="quantity"
                      value={garnish.quantity}
                      onChange={(e) => handleQuantityChange(e, index, "garnish")}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-danger mb-1"
                      onClick={() => handleRemoveGarnish(index)}
                    >
                      Rimuovi
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary mb-2" onClick={handleAddGarnish}>
                  Aggiungi Guarnizione
                </button>
              </div>
              <Button className="btn btn-success" onClick={salvaRicetta} disabled={!isFormValid()}>
                Salva Ricetta
              </Button>
            </form>

            <div className="mt-4">
              <h5>Anteprima Ricetta</h5>
              <div className="card">
                <div className="card-body">
                  <h6>Nome: {newRicetta.name}</h6>
                  <h6>Gin Flavour: {newRicetta.gin_flavour_id}</h6>
                  <h6>Tonica Flavour: {newRicetta.flavour_tonica_id}</h6>
                  <h6>Extras:</h6>
                  <ul>
                    {newRicetta.extras.map((extra, index) => (
                      <li key={index}>
                        {extra.extraId} - {extra.quantity} {extra.UM}
                      </li>
                    ))}
                  </ul>
                  <h6>Guarnizioni:</h6>
                  <ul>
                    {newRicetta.garnishes.map((garnish, index) => (
                      <li key={index}>
                        {garnish.guarnizioneId} - {garnish.quantity} {garnish.UM}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                value={newFlavour}
                onChange={(e) => setNewFlavour(e.target.value)}
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

export default AddRicettaForm;
