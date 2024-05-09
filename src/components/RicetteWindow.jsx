const RicetteWindow = function(){
    return(
        <div className="container-fluid my-5">
        <h1>Ricette</h1>
        <div className="accordion" id="accordionRicette">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Ricetta #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionRicette">
      <div className="accordion-body d-flex align-intems-center justify-content-between ">
        <div className="d-flex flex-column ">
            <h5>Ricetta</h5>
            <p className="m-0">Blablablablablabla</p> 
            <p className="m-0">Blablablablablabla</p> 
            <p className="m-0">Blablablablablabla</p> 
            <br/>
            <p className="m-0">Blablablablablabla</p> 
        </div>

        <div className="d-flex flex-column ">
        <div className="d-flex">
        <i className="bi bi-currency-euro"></i>
        <p>10€</p>
        </div>


        </div>

      </div>
    </div>
  </div>
        </div>
        </div>
    )
}

export default RicetteWindow;