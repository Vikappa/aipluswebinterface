import { Route, Routes, useLocation } from 'react-router-dom'
import AdminPage from './components/AdminPage'
import LoginForm from './components/LoginForm'
import WorkerPanel from './components/WorkerPanel'
import './App.css'
import CaricoWindow from './components/magazzino/CaricoWindow'
import NavBarAipiu from './components/NavBarAipiu'
import GinBrandsWindow from './components/GinBrandsWindow'
import Magazzino from './components/Magazzino'
import RicetteWindow from './components/RicetteWindow'
import CustomerPanel from './components/Customer/CustomerPanel'
import CustomerNavBar from "./components/Customer/CustomerNavBar"

function App() {

  const location = useLocation();


  return (<div>
      {location.pathname !== '/customer' && <NavBarAipiu/>}
      {location.pathname === '/customer' && <CustomerNavBar/>}

    <Routes>
      <Route path='/' element={<LoginForm/>} />
      <Route path='/admin' element={<AdminPage/>} />
      <Route path='/admin/carico' element={<CaricoWindow/>} />
      <Route path='/admin/ginbrands' element={<GinBrandsWindow/>} />
      <Route path='/admin/magazzino' element={<Magazzino/>} />
      <Route path='/admin/ricette' element={<RicetteWindow/>} />
      <Route path='/workerpanel' element={<WorkerPanel/>} />
      <Route path='/customer' element={<CustomerPanel/>} />
    </Routes>

  </div>
  )
}

export default App

