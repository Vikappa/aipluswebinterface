/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { Row, Spinner, Table, Col, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

const ModalReportCarichi = function (props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [arrayOrdini, setArrayOrdini] = useState([]);
    const [filteredOrdini, setFilteredOrdini] = useState([]);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [filterYear, setFilterYear] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterOperator, setFilterOperator] = useState('');
    const [filterProductType, setFilterProductType] = useState('');

    const downloadOrderDetailExcel = () => {
        // Implementa la funzione di download Excel
    };

    const downloadOrderDetailPDF = () => {
        // Implementa la funzione di download PDF
    };

    const reportCarichi = async () => {
        try {
            const response = await fetch("http://localhost:3001/carichi", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setArrayOrdini(data);
                setFilteredOrdini(data);
                setIsLoading(false);
            } else {
                throw new Error('Errore nella risposta del server');
            }
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            setTimeout(() => {
                props.handleShowModal();
            }, 2000);
        }
    };

    useEffect(() => {
        reportCarichi();
    }, []);

    const handleSecondModalShow = (ordine) => {
        setSelectedOrder(ordine);
        setShowSecondModal(true);
    };

    const handleSecondModalClose = () => {
        setShowSecondModal(false);
        setSelectedOrder(null);
    };

    const handleFilterChange = () => {
        let filtered = arrayOrdini;

        if (filterYear) {
            filtered = filtered.filter(order => new Date(order.data).getFullYear().toString() === filterYear);
        }

        if (filterMonth) {
            filtered = filtered.filter(order => (new Date(order.data).getMonth() + 1).toString() === filterMonth);
        }

        if (filterOperator) {
            filtered = filtered.filter(order => (order.operatore.name + " " + order.operatore.surname) === filterOperator);
        }

        if (filterProductType) {
            filtered = filtered.filter(order => order.prodotti.some(prodotto => prodotto.name.includes(filterProductType)));
        }

        setFilteredOrdini(filtered);
    };

    useEffect(() => {
        handleFilterChange();
    }, [filterYear, filterMonth, filterOperator, filterProductType]);

    const renderProductDetailsTable = (prodotti) => {
        const groupedProducts = prodotti.reduce((acc, prodotto) => {
            const type = prodotto.name;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(prodotto);
            return acc;
        }, {});
    
        const getColumns = (products) => {
            const columns = new Set();
            products.forEach(product => {
                if (product.id) columns.add('ID');
                if (product.name) columns.add('Nome');
                if (product.brand?.name || product.brandTonica?.name) columns.add('Marca');
                if (product.productionDate) columns.add('Data di Produzione');
                if (product.volume) columns.add('Volume');
                if (product.scadenza_tonica || product.scadenza_ingrediente) columns.add('Scadenza');
                if (product.flavour?.name) columns.add('Flavour');
                if (product.colore?.name) columns.add('Colore');
                if (product.quantitaGarnish) columns.add('Quantità Garnish');
                if (product.qtaExtra) columns.add('Qta Extra');
            });
            return Array.from(columns);
        };
    
        return Object.keys(groupedProducts).map((type, index) => {
            console.log(type);
            const columns = getColumns(groupedProducts[type]);
            return (
                <div key={index} className="mb-4">
                    <h5>{type}</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {columns.includes('ID') && <th>ID Magazzino</th>}
                                {columns.includes('Nome') && <th>Nome</th>}
                                {columns.includes('Marca') && <th>Marca</th>}
                                {columns.includes('Data di Produzione') && <th>Data di Produzione</th>}
                                {columns.includes('Volume') && <th>Volume</th>}
                                {columns.includes('Scadenza') && <th>Scadenza</th>}
                                {columns.includes('Flavour') && <th>Flavour</th>}
                                {columns.includes('Colore') && <th>Colore</th>}
                                {columns.includes('Quantità Garnish') && <th>Quantità Garnish</th>}
                                {columns.includes('Qta Extra') && <th>Qta Extra</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {groupedProducts[type].map((prodotto) => (
                                <tr key={prodotto.id}>
                                    {columns.includes('ID') && <td>{prodotto.id}</td>}
                                    {columns.includes('Nome') && <td>{prodotto.name}</td>}
                                    {columns.includes('Marca') && <td>{prodotto.brand?.name || prodotto.brandTonica?.name}</td>}
                                    {columns.includes('Data di Produzione') && <td>{prodotto.productionDate}</td>}
                                    {columns.includes('Volume') && <td>{prodotto.volume + "" + prodotto.um}</td>}
                                    {columns.includes('Scadenza') && <td>{prodotto.scadenza_tonica || prodotto.scadenza_ingrediente}</td>}
                                    {columns.includes('Flavour') && <td>{prodotto.flavour?.name}</td>}
                                    {columns.includes('Colore') && <td>{prodotto.colore?.name}</td>}
                                    {columns.includes('Quantità Garnish') && <td>{prodotto.quantitaGarnish + "" + prodotto.um}</td>}
                                    {columns.includes('Qta Extra') && <td>{prodotto.qtaExtra + "" + prodotto.um}</td>}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        });
    };

    return (
        <>
            <Modal
                size="lg"
                show={props.show}
                onHide={props.handleShowModal}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Report carichi
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <Spinner animation="border" className='d-flex mx-auto my-2' />
                    ) : isError ? (
                        <div className='d-flex justify-content-center flex-column'>
                            <BiSolidError className='text-danger d-flex mx-auto my-2' size={100} />
                            <p className='text-danger mx-auto'>Errore nella creazione dei reports!</p>
                        </div>
                    ) : arrayOrdini.length === 0 ? (
                        <p className='text-center'>Non ci sono ordini</p>
                    ) : (
                        <Container>
                            <Row className="d-flex align-items-end mb-3">
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Anno</Form.Label>
                                        <Form.Control as="select" className="form-control" onChange={(e) => setFilterYear(e.target.value)}>
                                            <option value="">Tutti</option>
                                            {[...new Set(arrayOrdini.map(order => new Date(order.data).getFullYear()))].map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
    <Form.Group>
        <Form.Label>Mese</Form.Label>
        <Form.Control as="select" className="form-control" onChange={(e) => setFilterMonth(e.target.value)}>
            <option value="">Tutti</option>
            {[
                { num: 1, name: 'Gennaio' },
                { num: 2, name: 'Febbraio' },
                { num: 3, name: 'Marzo' },
                { num: 4, name: 'Aprile' },
                { num: 5, name: 'Maggio' },
                { num: 6, name: 'Giugno' },
                { num: 7, name: 'Luglio' },
                { num: 8, name: 'Agosto' },
                { num: 9, name: 'Settembre' },
                { num: 10, name: 'Ottobre' },
                { num: 11, name: 'Novembre' },
                { num: 12, name: 'Dicembre' }
            ].map(month => (
                <option key={month.num} value={month.num}>{month.name}</option>
            ))}
        </Form.Control>
    </Form.Group>
</Col>

                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Operatore</Form.Label>
                                        <Form.Control as="select" className="form-control" onChange={(e) => setFilterOperator(e.target.value)}>
                                            <option value="">Tutti</option>
                                            {[...new Set(arrayOrdini.map(order => order.operatore.name + " " + order.operatore.surname))].map(operator => (
                                                <option key={operator} value={operator}>{operator}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Tipo di Prodotto</Form.Label>
                                        <Form.Control as="select" className="form-control" onChange={(e) => setFilterProductType(e.target.value)}>
                                            <option value="">Tutti</option>
                                            {['Gin', 'Tonica', 'Alimento', 'Guarnizione'].map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <ListGroup>
                                {filteredOrdini.map((ordine, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                        <div><strong>Carico N°:</strong> {ordine.ncarico}</div>
                                        <div><strong>Operatore:</strong> {ordine.operatore.name + " " + ordine.operatore.surname}</div>
                                        <div><strong>Prodotti:</strong> {ordine.prodotti.length}</div>
                                        <div><strong>Note:</strong> {ordine.note}</div>
                                        <Button variant="primary" onClick={() => handleSecondModalShow(ordine)}>Dettagli</Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Container>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleShowModal}>Chiudi</Button>
                </Modal.Footer>
            </Modal>

            {selectedOrder && (
                <Modal
                    show={showSecondModal}
                    onHide={handleSecondModalClose}
                    fullscreen={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Dettagli Carico N° {selectedOrder.ncarico}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Operatore:</strong> {selectedOrder.operatore.name + " " + selectedOrder.operatore.surname}</p>
                        <p><strong>Prodotti:</strong> {selectedOrder.prodotti.length}</p>
                        <p><strong>Data:</strong> {selectedOrder.data}</p>
                        <p><strong>Note:</strong> {selectedOrder.note}</p>
                        {renderProductDetailsTable(selectedOrder.prodotti)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={downloadOrderDetailExcel}>Scarica report Excel</Button>
                        <Button variant="info" className="text-white" onClick={downloadOrderDetailPDF}>Scarica report PDF</Button>
                        <Button variant="secondary" onClick={handleSecondModalClose}>Chiudi</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export default ModalReportCarichi;
