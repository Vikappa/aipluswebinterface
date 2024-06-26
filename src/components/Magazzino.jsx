import React,{ useEffect, useState } from "react";
import ResumeGin from './magazzino/resumeSubcomponents/ResumeGin';
import ResumeTonica from './magazzino/resumeSubcomponents/ResumeTonica';
import ResumeExtra from './magazzino/resumeSubcomponents/ResumeExtra';
import ResumeGarnish from './magazzino/resumeSubcomponents/ResumeGarnish';
import { Table, Button } from 'react-bootstrap';
import ModalReportMagazzino from "./magazzino/subcomponents/ModalReportMagazzino";
import ModalReportCarichi from "./magazzino/subcomponents/ModalReportCarichi";
const Magazzino = function () {

    const [magazzinoCorrente, setMagazzinoCorrente] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        if (magazzinoCorrente.length === 0) {
            fetchMagazzino();
        }
    }, []);

    const fetchMagazzino = async function () {
        const response = await fetch("http://localhost:3001/magazzino/resume", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            setMagazzinoCorrente(data);
        }
    }

    const handleShowModal2 = () => {
        setShowModal2(!showModal2)
    }

    return (
        <>
        
        <div className="d-flex p-2 gap-2 ">

        <Button onClick={handleShowModal}>Report magazzino corrente</Button>

        <Button onClick={handleShowModal2}>Report carichi magazzino</Button>

        </div>
        
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Pezzi</th>
                    <th>Qtà</th>
                    <th>UM</th>
                    <th>Caratteristiche</th>
                </tr>
            </thead>
            <tbody>
                {magazzinoCorrente.length > 0 && magazzinoCorrente.map((itemMagazzino, index) => (
                    itemMagazzino.discriminatorType === "GIN_BOTTLE" ? <ResumeGin key={index} gin={itemMagazzino} /> :
                    itemMagazzino.discriminatorType === "TONICA" ? <ResumeTonica key={index} tonica={itemMagazzino} /> :
                    itemMagazzino.discriminatorType === "ALIMENTO_EXTRA" ? <ResumeExtra key={index} extra={itemMagazzino} /> :
                    itemMagazzino.discriminatorType === "GUARNIZIONE" ? <ResumeGarnish key={index} garnish={itemMagazzino} /> :
                    <tr key={index}><td colSpan="4">Errore</td></tr>
                ))}
            </tbody>
        </Table>

        { showModal &&
        <ModalReportMagazzino show={showModal} handleShowModal={handleShowModal} />
        } 
        
        { showModal2 &&
        <ModalReportCarichi show={showModal2} handleShowModal={handleShowModal2} />
        }
        </>
    );
}

export default Magazzino;
