/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiSolidError } from "react-icons/bi";
import { Navigate } from 'react-router-dom';

const ModalReportMagazzino = function (props) {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)
    const [magazzinoCorrente, setMagazzinoCorrente] = useState([]);
    const useNavigate = Navigate()

    const downloadPDF = () => {
        //useNavigate("/reporttotalecorrente")
    }

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
            setIsLoading(false)
        }

        if (!response.ok) {
            setIsLoading(false)
            setIsError(true)
            console.log(props)
            setTimeout(() => {
                props.handleShowModal()
            }, 1000);
        }
    }

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
                {isLoading? 
                <Spinner className='d-flex mx-auto my-2'/>
            :

            isError?
            <div className='d-flex justify-content-center flex-column'>
            <BiSolidError className='text-danger d-flex mx-auto my-2' size={100}/>
            <p className='text-danger mx-auto'>Errore nella creazione del report!</p>
            </div>
            :
            <>
                <Button className='d-flex mx-auto rounded-5 btn-info text-white fw-bold' onClick={downloadPDF}>Download PDF</Button> 
            </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleShowModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalReportMagazzino;
