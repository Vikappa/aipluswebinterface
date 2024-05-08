
import { Route, Routes } from 'react-router-dom'
import AdminPage from './components/AdminPage'
import LoginForm from './components/LoginForm'
import WorkerPanel from './components/WorkerPanel'
import './App.css'


function App() {

  return (
    <div className='d-flex flex-column justify-content-center align-items-center' >
    <div className='d-flex flex-column align-items-center justify-content-center ' >
      <h1>я пью</h1>
      <h2>Io bevo</h2>
      <Routes>
      <Route path='/' element={<LoginForm/>} />
      <Route path='/admin' element={<AdminPage/>} />
      <Route path='/workerpanel' element={<WorkerPanel/>} />
      </Routes>
    </div>
    </div>
  )
}

export default App
