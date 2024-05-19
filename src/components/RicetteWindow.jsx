import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRicette } from "../redux/reducers/ricetteReducer.js";

const RicetteWindow = () => {
  const dispatch = useDispatch();
  const ricette = useSelector((state) => state.ricette.ricette); // Directly access the array

  useEffect(() => {
    dispatch(fetchRicette());
  }, [dispatch]);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Ricette</h1>
      <div className="accordion" id="accordionRicette">
        {ricette &&
          ricette.map((ricetta, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={"heading" + index}>
                <button
                  className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  {ricetta.name}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#accordionRicette"
              >
                <div className="accordion-body">
                  <h5>Gin Flavour: {ricetta.ginFlavourName}</h5>
                  <h5>Tonica: {ricetta.tonicaName}</h5>
                  <h6 className="mt-3">Extras:</h6>
                  <ul>
                    {ricetta.extras.map((extra, extraIndex) => (
                      <li key={extraIndex}>
                        {extra.extraName || extra.extraId} - {extra.quantity} {extra.UM}
                      </li>
                    ))}
                  </ul>
                  <h6 className="mt-3">Garnishes:</h6>
                  <ul>
                    {ricetta.garnishes.map((garnish, garnishIndex) => (
                      <li key={garnishIndex}>
                        {garnish.guarnizioneName || garnish.guarnizioneId} - {garnish.quantity} {garnish.UM}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3">
                    <strong>Preparabile:</strong> {ricetta.preparabile ? "Sì" : "No"}
                  </div>
                  <div className="mt-3">
                    <strong>Quantità Preparabile:</strong> {ricetta.quantitaPreparabile}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RicetteWindow;
