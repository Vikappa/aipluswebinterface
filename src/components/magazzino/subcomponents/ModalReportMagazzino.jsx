/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiSolidError } from "react-icons/bi";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ModalReportMagazzino = function (props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [magazzinoCorrente, setMagazzinoCorrente] = useState([]);
    

    const downloadPDF = () => {
        const doc = new jsPDF();
    
        doc.text('Report Magazzino Corrente', 14, 22);
    
        const addTable = (title, columns, data, startY) => {
            doc.text(title, 14, startY + 10);
            doc.autoTable({
                startY: startY + 13, // Spazio tra titolo e inizio tabella
                head: [columns],
                body: data,
            });
    
            // Calcola l'altezza della tabella e aggiungi spazio dopo
            const tableHeight = doc.autoTable.previous.finalY - startY;
            return startY + tableHeight 
        };
    
    
        let startY = 30;
        const spacing = 5; // Spaziatura tra le tabelle
    
        const ginData = magazzinoCorrente[0].map(item => [
            item.nCarico,
            item.name,
            item.volume,
            item.currentVolume,
            item.um,
            item.alcoholPercentage,
            item.expirationDate,
            item.productionDate,
            item.brandName,
            item.flavourName
        ]);
    
        const tonicaData = magazzinoCorrente[1].map(item => [
            item.nCarico,
            item.name,
            item.volume,
            item.um,
            item.flavourName,
            item.scadenzaTonica,
            item.brandName,
        ]);
    
        const extraData = magazzinoCorrente[2].map(item => [
            item.nCarico,
            item.name,
            item.availableQuantity,
            item.um,
            item.flavour,
            item.scadenzaIngrediente
        ]);
    
        const garnishData = magazzinoCorrente[3].map(item => [
            item.nCarico,
            item.name,
            item.availableQuantity,
            item.um,
            item.flavour,
            item.colore
        ]);
    
        if (ginData.length > 0) {
            if (startY + spacing > doc.internal.pageSize.height) {
                doc.addPage(); // Nuova pagina se non c'è spazio sufficiente
                startY = 30;
            }
            startY = addTable('Bottiglie di Gin', ["N° Carico","Nome", "Volume totale", "Volume corrente", "UM", "% alcol", "Data scadenza", "Anno produzione", "Brand", "Flavour"], ginData, startY);
        }
    
        if (tonicaData.length > 0) {
            if (startY + spacing > doc.internal.pageSize.height) {
                doc.addPage(); // Nuova pagina se non c'è spazio sufficiente
                startY = 30;
            }
            startY = addTable('Bottiglie di Tonica', ["N° Carico", "Nome","Volume", "UM", "Flavour", "Scadenza", "Brand"], tonicaData, startY);
        }
    
        if (extraData.length > 0) {
            if (startY + spacing > doc.internal.pageSize.height) {
                doc.addPage(); // Nuova pagina se non c'è spazio sufficiente
                startY = 30;
            }
            startY = addTable('Alimenti Extra ', ["N° Carico", "Nome","Quantità disponibile", "UM", "Flavour", "Scadenza Ingrediente"], extraData, startY);
        }
    
        if (garnishData.length > 0) {
            if (startY + spacing > doc.internal.pageSize.height) {
                doc.addPage(); // Nuova pagina se non c'è spazio sufficiente
                startY = 30;
            }
            startY = addTable('Guarnizioni', ["N° Carico","Nome","Quantità disponibile", "UM", "Flavour", "Colore"], garnishData, startY);
        }
    
        doc.save('magazzino_corrente.pdf');
    };
    

    const downloadExcel = () => {
        const wb = XLSX.utils.book_new();

        const addSheet = (sheetName, data) => {
            const ws = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        };

        const ginData = [
            ["N° Carico", "Nome","Volume iniziale","Volume corrente", "UM", "Alcohol Percentage", "Scadenza", "Anno produzione",  "Carico Data", "Brand Name", "Flavour Name"],
            ...magazzinoCorrente[0].map(item => [
                item.nCarico,
                item.name,
                item.volume,
                item.currentVolume,
                item.um,
                item.alcoholPercentage,
                item.expirationDate,
                item.productionDate,
                item.caricoData,
                item.brandName,
                item.flavourName
            ])
        ];

        const tonicaData = [
            ["N° Carico", "Nome","Volume", "UM", "Flavour", "Scadenza", "Brand"],
            ...magazzinoCorrente[1].map(item => [
                item.nCarico,
                item.name,
                "60",
                item.UM,
                item.flavourName,
                item.scadenzaTonica,
                item.brandName,
            ])
        ];

        const extraData = [
            ["N° Carico", "Nome","Quantità disponibile", "UM", "Flavour", "Scadenza Ingrediente"],
            ...magazzinoCorrente[2].map(item => [
                item.nCarico,
                item.name,
                item.availableQuantity,
                item.UM,
                item.flavour,
                item.scadenzaIngrediente
            ])
        ];

        const garnishData = [
            ["N° Carico", "Nome", "Quantità disponibile", "UM", "Flavour", "Color",],
            ...magazzinoCorrente[3].map(item => [
                item.nCarico,
                item.name,
                item.availableQuantity,
                item.UM,
                item.flavour,
                item.colore
            ])
        ];

        addSheet('Bottiglie di Gin', ginData);
        addSheet('Bottiglie di tonica', tonicaData);
        addSheet('Alimenti extra', extraData);
        addSheet('Guarnizioni', garnishData);

        XLSX.writeFile(wb, 'magazzino corrente.xlsx');
    };

    const reportMagazzino = async () => {
        const response = await fetch("http://localhost:3001/magazzino/totalresume", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setMagazzinoCorrente(data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setIsError(true);
            setTimeout(() => {
                props.handleShowModal();
            }, 2000);
        }
    };

    useEffect(() => {
        reportMagazzino();
    }, []);

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.handleShowModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Report magazzino corrente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? 
                    <Spinner className='d-flex mx-auto my-2' />
                    :
                    isError ?
                        <div className='d-flex justify-content-center flex-column'>
                            <BiSolidError className='text-danger d-flex mx-auto my-2' size={100} />
                            <p className='text-danger mx-auto'>Errore nella creazione del report!</p>
                        </div>
                        :
                        <div className='d-flex justify-content-center'>
                            <Button className='mx-2 rounded-5 btn-info text-white fw-bold' onClick={downloadPDF}>Download PDF</Button>
                            <Button className='mx-2 rounded-5 btn-success text-white fw-bold' onClick={downloadExcel}>Download Excel</Button>
                        </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleShowModal}>Chiudi</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalReportMagazzino;
