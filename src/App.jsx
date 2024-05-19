
import { Route, Routes } from 'react-router-dom'
import AdminPage from './components/AdminPage'
import LoginForm from './components/LoginForm'
import WorkerPanel from './components/WorkerPanel'
import './App.css'
import CaricoWindow from './components/magazzino/CaricoWindow'
import NavBarAipiu from './components/NavBarAipiu'


function App() {

  return (<>
      <NavBarAipiu/>

      <Routes>
      <Route path='/' element={<LoginForm/>} />
      <Route path='/admin' element={<AdminPage/>} />
      <Route path='/admin/carico' element={<CaricoWindow/>} />
      <Route path='/workerpanel' element={<WorkerPanel/>} />
      </Routes>

  </>
  )
}

export default App
