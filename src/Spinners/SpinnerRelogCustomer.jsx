import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRicette } from '../redux/reducers/ricetteReducer'

function SpinnerRelogCustomer() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ricette = useSelector(state => state.ricette.ricette)
  useEffect(() => {
    dispatch(fetchRicette())
    const timer = setTimeout(() => {
      if(ricette.length === 0){
        sessionStorage.removeItem("token")
        navigate('/')        
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return(
    <div className='d-flex justify-content-center align-items-center'>
    <Spinner animation="grow" />
    </div>
  )
}

export default SpinnerRelogCustomer