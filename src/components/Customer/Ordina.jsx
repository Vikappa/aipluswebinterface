/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGinBrands } from '../../redux/reducers/ginBrandsReducer';
import { fetchGinBottleShortLine, fetchTonicaBottleShortLine } from '../../redux/reducers/wharehouseReducers';
import { resetGinTonic, setGinBottleBrandName, setGinBottleName, setGinFlavourName, setTonicaBrand, setTonicaFlavour, setTonicaName } from '../../redux/reducers/newGinTonicReducer';

function Ordina(props) {

    const setShow = (boolean) => {
      props.showController(boolean);
    }

    const handleClose = () => {
        dispatch(resetGinTonic())
        setShow(false)
    }

    const dispatch = useDispatch();
    const ginTonicDaInviare = useSelector((state) => state.nuovoGinTonic);
    const ginShortLine = useSelector((state) => state.wharehouse.ginShortLine);
    const tonicShortLine = useSelector((state) => state.wharehouse.tonicShortLine);
    const [selectedGin, setSelectedGin] = useState(null);
    const [selectedTonica, setSelectedTonica] = useState(null)

    let prezzoTotale = 7

  useEffect(() => {
    dispatch(fetchGinBrands());
    dispatch(fetchGinBottleShortLine());
    dispatch(fetchTonicaBottleShortLine());
  }, [dispatch])

  const handleGinChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);
    setSelectedGin(selectedValue);
    dispatch(setGinBottleName(selectedValue.name))
    dispatch(setGinBottleBrandName(selectedValue.ginBrandName))
    dispatch(setGinFlavourName(selectedValue.ginFlavourName))
  }

  const handleTonicaChange = (e) => {
    const selectedValue = JSON.parse(e.target.value)
    setSelectedTonica(selectedValue)
    dispatch(setTonicaName(selectedValue.name))
    dispatch(setTonicaBrand(selectedValue.tonicaBrandName))
    dispatch(setTonicaFlavour(selectedValue.tonicaFlavourName))
  }

  const handleOrina = () => {
    if(ginTonicDaInviare.ginBottleName===null){
        dispatch(setGinBottleName(ginShortLine.filter((ginshortlineElement) => ginshortlineElement.ginFlavourName === ginTonicDaInviare.ginFlavourName)[0].name))
        dispatch(setGinBottleBrandName(ginShortLine.filter((ginshortlineElement) => ginshortlineElement.ginFlavourName === ginTonicDaInviare.ginFlavourName)[0].ginBrandName))
    }
    if(ginTonicDaInviare.tonicaName === null){
        dispatch(setTonicaName(tonicShortLine.filter((tonicShortLineElement) => tonicShortLineElement.tonicaFlavourName === ginTonicDaInviare.tonicaFlavour)[0].tonicaName))
        dispatch(setTonicaBrand(tonicShortLine.filter((tonicShortLineElement) => tonicShortLineElement.tonicaFlavourName === ginTonicDaInviare.tonicaFlavour)[0].tonicaBrandName))
    }
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Personalizza il tuo ordine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Label className='mb-0 '>Gin: {ginTonicDaInviare.ginFlavourName}</Form.Label>
          <Form.Group as="select" className="form-control me-2" onChange={handleGinChange}>
            {ginShortLine.length > 0 &&
              ginShortLine
                .filter((ginshortlineElement) => ginshortlineElement.ginFlavourName === ginTonicDaInviare.ginFlavourName)
                .map((ginshortlineElement) => (
                  <option key={ginshortlineElement.name} value={JSON.stringify(ginshortlineElement)}>
                    {ginshortlineElement.ginBrandName} - {ginshortlineElement.name} (+{ginshortlineElement.ginBrandSurcharge}€ sovrapprezzo)
                  </option>
                ))}
          </Form.Group>

          <Form.Label className='mb-0 mt-2'>Tonica: {ginTonicDaInviare.tonicaFlavour}</Form.Label>
          <Form.Group as="select" className="form-control me-2" onChange={handleTonicaChange}>
            {tonicShortLine.length > 0 &&
              tonicShortLine
                .filter((tonicShortLineElement) => tonicShortLineElement.tonicaFlavourName === ginTonicDaInviare.tonicaFlavour)
                .map((tonicaShortLineElement) => (
                  <option key={tonicaShortLineElement.name} value={JSON.stringify(tonicaShortLineElement)}>
                    {tonicaShortLineElement.tonicaBrandName} - {tonicaShortLineElement.name}
                  </option>
                ))}
          </Form.Group>
        <div className="">
            {
                ginTonicDaInviare.extras.length>0 &&
                <>
                <h5 className='p-1 m-0'>Alimenti extra</h5>
                    {
                        ginTonicDaInviare.extras.map((extra, index) => (
                            <p className='p-1 m-0' key={index}>{extra.extraName} - {extra.quantity}{extra.um}</p>
                        ))
                    }
                </>
            }
        {
            ginTonicDaInviare.garnishes.length>0 &&
            <>
            <h5 className='p-1 m-0'>Guarnizioni</h5>
            <div className="d-flex flex-column ">
                    {
                        ginTonicDaInviare.garnishes.map((garnish, index) => (
                            <p className='p-1 m-0' key={index}>{garnish.garnishName} - {garnish.quantity}{garnish.um}</p>
                        ))
                    }
                </div>
            </>
            }
        </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOrina}>
            Ordina ({prezzoTotale}€)
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Ordina
