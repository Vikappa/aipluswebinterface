import RicetteGinTonic from "./RicetteGinTonic"
import DashBoardGinTonic from "./DashBoardGinTonic"
import { Button } from "react-bootstrap"
import { BiDrink } from "react-icons/bi";
import CarrelloCustomer from "./CarrelloCustomer";


const CustomerPanel = function() {


    return (
    <div className="customerPanel h-100"> 
            <DashBoardGinTonic/>
            <RicetteGinTonic/>

        <div className="d-flex">
                
            <button className="mx-auto p-2 my-3 d-flex align-items-center gap-2 btn btn-emphasized shadow rounded-pill">
                <BiDrink />Crea il tuo GinTonic!
            </button> 

        </div>

        <CarrelloCustomer/>
     </div>
    )
}

export default CustomerPanel
