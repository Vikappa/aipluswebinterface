
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
    <div className='d-flex flex-column justify-content-center align-items-center full-width' >
    <div className='d-flex flex-column align-items-center justify-content-center full-width' >
      <Routes>
      <Route path='/' element={<LoginForm/>} />
      <Route path='/admin' element={<AdminPage/>} />
      <Route path='/admin/carico' element={<CaricoWindow/>} />
      <Route path='/workerpanel' element={<WorkerPanel/>} />
      </Routes>
    </div>
    </div>
  </>
  )
}

export default App
