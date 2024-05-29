/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGinBrands } from '../../redux/reducers/ginBrandsReducer';
import { fetchGinBottleShortLine, fetchTonicaBottleShortLine } from '../../redux/reducers/wharehouseReducers';
import { resetGinTonic, setGinBottleBrandName, setGinBottleName, setGinFlavourName, setTonicaBrand, setTonicaFlavour, setTonicaName } from '../../redux/reducers/newGinTonicReducer';
import { useNavigate } from 'react-router-dom';

function Ordina(props) {

  const navigator = useNavigate();

  const setShow = (boolean) => {
    props.showController(boolean);
  }

  const handleClose = () => {
    dispatch(resetGinTonic());
    setShow(false);
  }

  const dispatch = useDispatch();
  const ginTonicDaInviare = useSelector((state) => state.nuovoGinTonic);
  const ginShortLine = useSelector((state) => state.wharehouse.ginShortLine);
  const tonicShortLine = useSelector((state) => state.wharehouse.tonicShortLine);
  const ginBrands = useSelector((state) => state.ginBrands.ginbrands);

  const base_price = 7;
  const [prezzoTotale, setPrezzoTotale] = useState(base_price);

  const updateBasePrice = () => {
    if (ginBrands && ginTonicDaInviare) {
      const extrasPrice = ginTonicDaInviare.extras.length * 0.5;
      const garnishesPrice = ginTonicDaInviare.garnishes.length * 0.25;
      const selectedGinBrand = ginBrands.find(brand => brand.name === ginTonicDaInviare.ginBottleBrandName) 
      const brandSurcharge = selectedGinBrand ? selectedGinBrand.sovrapprezzo : ginBrands[0].sovrapprezzo
      setPrezzoTotale(base_price + extrasPrice + garnishesPrice + brandSurcharge);
    }
  };

  useEffect(() => {
    dispatch(fetchGinBrands());
    dispatch(fetchGinBottleShortLine());
    dispatch(fetchTonicaBottleShortLine());
  }, [dispatch]);

  useEffect(() => {
    updateBasePrice();
  }, [ginTonicDaInviare, ginBrands]);

  const handleGinChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);
    dispatch(setGinBottleName(selectedValue.name));
    dispatch(setGinBottleBrandName(selectedValue.ginBrandName));
    dispatch(setGinFlavourName(selectedValue.ginFlavourName));
  }

  const handleTonicaChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);
    dispatch(setTonicaName(selectedValue.name));
    dispatch(setTonicaBrand(selectedValue.tonicaBrandName));
    dispatch(setTonicaFlavour(selectedValue.tonicaFlavourName));
  }

  const handleOrdina = async () => {
    let updatedGinBottleName = ginTonicDaInviare.ginBottleName;
    let updatedGinBottleBrandName = ginTonicDaInviare.ginBottleBrandName;
    let updatedTonicaName = ginTonicDaInviare.tonicaName;
    let updatedTonicaBrandName = ginTonicDaInviare.tonicaBrand;

    if (ginTonicDaInviare.ginBottleName === null) {
      const gin = ginShortLine.find((ginshortlineElement) => ginshortlineElement.ginFlavourName === ginTonicDaInviare.ginFlavourName);
      updatedGinBottleName = gin.name;
      updatedGinBottleBrandName = gin.ginBrandName;
      await dispatch(setGinBottleName(updatedGinBottleName));
      await dispatch(setGinBottleBrandName(updatedGinBottleBrandName));
    }

    if (ginTonicDaInviare.tonicaName === null) {
      const tonica = tonicShortLine.find((tonicShortLineElement) => tonicShortLineElement.tonicaFlavourName === ginTonicDaInviare.tonicaFlavour);
      updatedTonicaName = tonica.name;
      updatedTonicaBrandName = tonica.tonicaBrandName;
      await dispatch(setTonicaName(updatedTonicaName));
      await dispatch(setTonicaBrand(updatedTonicaBrandName));
    }

    postGinTonic({
      ...ginTonicDaInviare,
      ginBottleName: updatedGinBottleName,
      ginBottleBrandName: updatedGinBottleBrandName,
      tonicaName: updatedTonicaName,
      tonicaBrand: updatedTonicaBrandName
    });
  }

  const postGinTonic = async (data) => {
    const response = await fetch('https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/ordina/ordina', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gintonic: data
      })
    });

    if (!response.ok) {
      throw new Error('Errore POST Ordine');
    }

    const responseData = await response.json();
    handleClose();
    navigator('/')

  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Personalizza il tuo ordine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className='mb-0'>Gin: {ginTonicDaInviare.ginFlavourName}</Form.Label>
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
            {ginTonicDaInviare.extras.length > 0 &&
              <>
                <h5 className='p-1 m-0'>Alimenti extra</h5>
                {ginTonicDaInviare.extras.map((extra, index) => (
                  <p className='p-1 m-0' key={index}>{extra.extraName} - {extra.quantity}{extra.um}</p>
                ))}
              </>
            }
            {ginTonicDaInviare.garnishes.length > 0 &&
              <>
                <h5 className='p-1 m-0'>Guarnizioni</h5>
                <div className="d-flex flex-column">
                  {ginTonicDaInviare.garnishes.map((garnish, index) => (
                    <p className='p-1 m-0' key={index}>{garnish.garnishName} - {garnish.quantity}{garnish.um}</p>
                  ))}
                </div>
              </>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOrdina}>
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

export default Ordina;

