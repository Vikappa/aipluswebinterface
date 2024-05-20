import { useState } from "react"
import { useDispatch } from "react-redux"
import { addRicetta } from "../redux/reducers/ricetteReducer.js"

const AddRicettaForm = () => {
  const dispatch = useDispatch()
  const [newRicetta, setNewRicetta] = useState({
    name: "",
    gin_flavour_id: "",
    flavour_tonica_id: "",
    extras: [{ extraId: "", quantity: "", UM: "" }],
    garnishes: [{ guarnizioneId: "", quantity: "", UM: "" }]
  })

  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target
    if (type === "extra") {
      const extras = [...newRicetta.extras]
      extras[index][name] = value
      setNewRicetta({ ...newRicetta, extras })
    } else if (type === "garnish") {
      const garnishes = [...newRicetta.garnishes]
      garnishes[index][name] = value
      setNewRicetta({ ...newRicetta, garnishes })
    } else {
      setNewRicetta({ ...newRicetta, [name]: value })
    }
  }

  const handleAddExtra = () => {
    setNewRicetta({
      ...newRicetta,
      extras: [...newRicetta.extras, { extraId: "", quantity: "", UM: "" }]
    })
  }

  const handleAddGarnish = () => {
    setNewRicetta({
      ...newRicetta,
      garnishes: [...newRicetta.garnishes, { guarnizioneId: "", quantity: "", UM: "" }]
    })
  }

  const handleRemoveExtra = (index) => {
    const extras = [...newRicetta.extras]
    extras.splice(index, 1)
    setNewRicetta({ ...newRicetta, extras })
  }

  const handleRemoveGarnish = (index) => {
    const garnishes = [...newRicetta.garnishes]
    garnishes.splice(index, 1)
    setNewRicetta({ ...newRicetta, garnishes })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addRicetta(newRicetta))
  }

  return (
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
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gin Flavour</label>
              <input
                type="text"
                className="form-control"
                name="gin_flavour_id"
                value={newRicetta.gin_flavour_id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tonica Flavour</label>
              <input
                type="text"
                className="form-control"
                name="flavour_tonica_id"
                value={newRicetta.flavour_tonica_id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Extras</label>
              {newRicetta.extras.map((extra, index) => (
                <div key={index} className="mb-2 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control mb-1 me-1"
                    placeholder="Extra"
                    name="extraId"
                    value={extra.extraId}
                    onChange={(e) => handleInputChange(e, index, "extra")}
                    required
                  />
                    <input
                      type="text"
                      className="form-control mb-1 me-1"
                      placeholder="UM"
                      name="UM"
                      value={extra.UM}
                      onChange={(e) => handleInputChange(e, index, "extra")}
                      required
                    />
                  <input
                    type="text"
                    className="form-control mb-1 me-1"
                    placeholder="Quantity"
                    name="quantity"
                    value={extra.quantity}
                    onChange={(e) => handleInputChange(e, index, "extra")}
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
                  <input
                    type="text"
                    className="form-control mb-1 me-1"
                    placeholder="Guarnizione"
                    name="guarnizioneId"
                    value={garnish.guarnizioneId}
                    onChange={(e) => handleInputChange(e, index, "garnish")}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-1 me-1"
                    placeholder="Quantity"
                    name="quantity"
                    value={garnish.quantity}
                    onChange={(e) => handleInputChange(e, index, "garnish")}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-1 me-1"
                    placeholder="UM"
                    name="UM"
                    value={garnish.UM}
                    onChange={(e) => handleInputChange(e, index, "garnish")}
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
            <button type="submit" className="btn btn-primary">
              Salva Ricetta
            </button>
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
  )
}

export default AddRicettaForm
