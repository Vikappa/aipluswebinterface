import GinBrandsWindow from "./GinBrandsWindow"
import UsersWindows from './UsersWindow'
import Magazzino from "./Magazzino"

const DataBaseMonitor = function(){
    return(
    <>
    <UsersWindows/>
    <GinBrandsWindow/>
    <Magazzino/>
    </>
    )
}
export default DataBaseMonitor