import GinBrandsWindow from "./GinBrandsWindow"
import UsersWindows from './UsersWindow'
import Magazzino from "./Magazzino"
import RicetteWindow from "./RicetteWindow"

const DataBaseMonitor = function(){
    return(
    <>
    <UsersWindows/>
    <GinBrandsWindow/>
    <Magazzino/>
    <RicetteWindow/>
    </>
    )
}
export default DataBaseMonitor