import GinBrandsWindow from "./GinBrandsWindow"
import UsersWindows from './UsersWindow'
import Magazzino from "./Magazzino"
import RicetteWindow from "./RicetteWindow"
import { Link } from'react-router-dom'

const DataBaseMonitor = function(){
    return(
    <>
    <UsersWindows/>
    <GinBrandsWindow/>
    <Magazzino/>
    <RicetteWindow/>
    <div className="d-flex">
    <Link to="/admin/carico" className="btn btn-primary">Carica prodotti</Link>
    <button></button>
    </div>
    </>
    )
}
export default DataBaseMonitor