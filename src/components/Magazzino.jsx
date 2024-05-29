import React,{ useEffect, useState } from "react";
import ResumeGin from './magazzino/resumeSubcomponents/ResumeGin';
import ResumeTonica from './magazzino/resumeSubcomponents/ResumeTonica';
import ResumeExtra from './magazzino/resumeSubcomponents/ResumeExtra';
import ResumeGarnish from './magazzino/resumeSubcomponents/ResumeGarnish';
import { Table, Button } from 'react-bootstrap';
const Magazzino = function () {
    const [magazzinoCorrente, setMagazzinoCorrente] = useState([]);

    useEffect(() => {
        if (magazzinoCorrente.length === 0) {
            fetchMagazzino();
        }
    }, []);

    const fetchMagazzino = async function () {
        const response = await fetch("https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/magazzino/resume", {
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

    const reportMagazzino = () => {

    }

    return (
        <>
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
        {/* <div className="m-3">
        <Button onClick={fetchMagazzino}>Aggiorna</Button>
        <Button onClick={reportMagazzino}>Report</Button>
        </div> */}
                </>
    );
}

export default Magazzino;
