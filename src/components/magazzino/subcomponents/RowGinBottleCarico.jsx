import { useSelector, useDispatch } from "react-redux";
import { useRef } from 'react'
import Modal from 'react-bootstrap/Modal';

import {
    setNewItemCaricoType,
    setGinBrand,
    setNome,
    setQuantita,
    setVolume,
    setAnno,
    setDataScadenza, 
    resetNewItem,
    setBatchNumber, 
    setFlavour,
    setImageUrl,
} from "/src/redux/reducers/newItemCaricoReducer";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const RowGinBottleCarico = function() {
    const dispatch = useDispatch();
    const ginBrands = useSelector(state => state.ginBrands.ginbrands);
    const ginFlavours = useSelector(state => state.ginFlavours.ginFlavours);
    const ginImage = useSelector(state => state.newItemCarico.newItem.immagine)

    const [localItem, setLocalItem] = useState({})
    const fileInputRef = useRef(null);

    const handleChangeUrl = (e) => {
        const { value } = e.target;
        setLocalItem(prev => ({ ...prev, imageUrl: value }));
    }
    
    const handleChangeTipo = (e) => {
        const { value } = e.target;
        setLocalItem(prev => ({ ...prev, tipo: value }));
        dispatch(setNewItemCaricoType(value));
    }

    const handleChangeBatchNumber = (e) => {
        const { value } = e.target;
        setLocalItem(prev => ({ ...prev, batchNumber: value }));
        dispatch(setBatchNumber(value));
    }

    const handleChangeNome = (e) => {
        const { value } = e.target;
        setLocalItem(prev => ({ ...prev, nome: value }));
        dispatch(setNome(value));
    }

    const handleAddImageFile = function(e){
        e.preventDefault();
        handleCloseModalAggiungiImmane()
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5242880) {
            alert("Immagine troppo pesante. Massimo peso previsto 5MB.");
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width > 500 || img.height > 500) {
                alert("Dimensione massima immagine 500x500px");
                URL.revokeObjectURL(img.src); 
            } else {
                setLocalItem(prev => ({ ...prev, immagine: file }));
                console.log("Immagine caricata:", file);
            }
        };
    }

    const handleAddImageUrl = function(){
        dispatch(setImageUrl(localItem.imageUrl));
        handleCloseModalAggiungiImmane()
    }

    const handleChangeQuantita = (e) => {
        const { value } = e.target;
        setLocalItem(prev => ({ ...prev, quantita: value === '' ? null : Number(value) }));
        dispatch(setQuantita(value === '' ? null : Number(value)));
    }

    const handleChangeVolume = (e) => {
        const { value } = e.target;
        setLocalItem(prev => ({ ...prev, volume: value === '' ? null : Number(value) }));
        dispatch(setVolume(value === '' ? null : Number(value)));
    }

    const handleChangeAnno = (e) => {
        const { value } = e.target;
        setLocalItem(prev => ({ ...prev, anno: value }));
        dispatch(setAnno(value));
    }

    const handleChangeDataScadenza = (e) => {
        const { value } = e.target;
        setLocalItem(prev => ({ ...prev, data_scadenza: value }));
        dispatch(setDataScadenza(value));
    }

    const handleImageUpload = () => {
        setShowModaleImmage(true);
    }

    const handleChangeGinBrand = (e) => {
        const { value } = e.target;
        console.log(value.ginBrand)
        setLocalItem(prev => ({ ...prev, ginBrand: value }));
        dispatch(setGinBrand(value.ginBrand)); 
    }

    const handleCloseModalAggiungiImmane = function(){
        setShowModaleImmage(false);
    }
    
    const handleChangeGinFlavour = (e) => {
        const { value } = e.target;
        console.log(value)
        setLocalItem(prev => ({ ...prev, flavour: value }));
        dispatch(setFlavour(value));
    }
    
    const [showModaleImmagine, setShowModaleImmage] = useState(false);

    const insertProduct = () => {
        console.log(localItem);

        if(!localItem.ginBrand){
            localItem.brand = ginBrands[0]
        }

        if(!localItem.flavour){
            localItem.flavour = ginFlavours[0]
        }

        console.log(localItem)

        dispatch(resetNewItem())
    }

    useEffect(() => {
        console.log(localItem)
    }, [localItem])

    return (
        <>
        <div className="d-flex">

            <select id="tipoProdotto" className="form-control" value={localItem.tipo} style={{flex:1}} onChange={handleChangeTipo}>
                <option value="Bottiglia di gin">Bottiglia di Gin</option>
                <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                <option value="Alimento deperibile">Alimento deperibile</option>
                <option value="Guarnizione">Guarnizione</option>
            </select>

            <div className="d-flex flex-column ">


            <div className="d-flex">

            <select id="ginBrand" className="" value={localItem.ginBrand} onChange={handleChangeGinBrand}>
                {ginBrands.map((brand) => (
                    <option key={brand.name} value={brand.name}>{brand.name}</option>
                ))}
                <option value="">+Aggiungi</option>
            </select>
            <input type="text" id="ginName" placeholder="Nome Gin" className="form-control" value={localItem.nome || ''} onChange={handleChangeNome} />
            
            <input type="number" id="volume" placeholder="Volume (ml)" className="form-control" value={localItem.volume || ''} onChange={handleChangeVolume} />
            
            <select id="ginFlavourSelect" value={localItem.flavour} className="form-control" onChange={handleChangeGinFlavour} >
                {
                    ginFlavours && ginFlavours.map((flavour) => {
                        return (
                            <option key={flavour.name} value={flavour.name}>{flavour.name}</option>
                        )
                    }   
                )
                
            }
            </select>
            
            </div>

            <div className="d-flex">

            <input type="number" id="quantity" placeholder="Quantità" className="form-control" value={localItem.quantita || ''} onChange={handleChangeQuantita} />
            <input type="text" id="productionDate" placeholder="Data di Produzione" className="form-control" value={localItem.anno || ''} onChange={handleChangeAnno} />
            <input type="date" id="expirationDate" className="form-control" value={localItem.data_scadenza || ''} onChange={handleChangeDataScadenza} />
            <input type="text" id="batchNumberinput" className="form-control" placeholder="N° lotto" value={localItem.batchNumber || ''} onChange={handleChangeBatchNumber} ></input>
            </div>
            </div>
                
                <button className="btn btn-primary m-2 my-3" onClick={handleImageUpload}>
                    {ginImage === undefined?"Carica immagine": "Modifica immagine"}
                </button>

            <button className="btn btn-success m-2 my-3" onClick={insertProduct}>Ok</button>

        </div>

{/* modal */}
<Modal show={showModaleImmagine} onHide={handleCloseModalAggiungiImmane}>
    <Modal.Header closeButton>
        <Modal.Title>Inserisci immagine</Modal.Title>
    </Modal.Header>
    <Modal.Body className="container-fluid">
        <div className="mb-3">
            <label htmlFor="file-upload" className="form-label">Carica immagine</label>
            <button className="btn btn-outline-primary w-100" onClick={() => fileInputRef.current.click()}>
                Seleziona File
            </button>
            <input 
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleAddImageFile}
                style={{ display: 'none' }}
                id="file-upload"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="url" className="form-label">Inserisci URL</label>
            <div className="input-group">
            <input 
            type="text" 
            id="url" 
            className="form-control" 
            placeholder="https://url-tua-immagine.png" 
            value={localItem.imageUrl || ''}  
            onChange={handleChangeUrl}
/>
                <Button variant="outline-primary" onClick={handleAddImageUrl}>Ok</Button>
            </div>
        </div>            
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModalAggiungiImmane}>
            Annulla
        </Button>
    </Modal.Footer>
</Modal>


    </>
    );
};

export default RowGinBottleCarico;
