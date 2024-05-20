
import { Route, Routes } from 'react-router-dom'
import AdminPage from './components/AdminPage'
import LoginForm from './components/LoginForm'
import WorkerPanel from './components/WorkerPanel'
import './App.css'
import CaricoWindow from './components/magazzino/CaricoWindow'
import NavBarAipiu from './components/NavBarAipiu'
import GinBrandsWindow from './components/GinBrandsWindow'
import Magazzino from './components/Magazzino'
import RicetteWindow from './components/RicetteWindow'


function App() {

  return (<>
      <NavBarAipiu/>

      <Routes>
      <Route path='/' element={<LoginForm/>} />
      <Route path='/admin' element={<AdminPage/>} />
      <Route path='/admin/carico' element={<CaricoWindow/>} />
      <Route path='/admin/ginbrands' element={<GinBrandsWindow/>} />
      <Route path='/admin/magazzino' element={<Magazzino/>} />
      <Route path='/admin/ricette' element={<RicetteWindow/>} />
      <Route path='/workerpanel' element={<WorkerPanel/>} />
      </Routes>

  </>
  )
}

export default App
