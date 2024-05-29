import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdini } from "../redux/reducers/wharehouseReducers";
import sadCatImage from '../assets/noOrdini.png'

const WorkerPanel = function() {
    const dispatch = useDispatch();
    const ordini = useSelector(state => state.wharehouse.ordini);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchOrdini());
            setIsLoading(false);
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 6000);

        return () => clearInterval(interval);
    }, [dispatch]);

    const handleCardClick = (ordineId) => {
        updateOrdineStatus(ordineId);
    };

    const updateOrdineStatus = async (ordineId) => {
        const response = await fetch(
            `https://aipluswebserver-vincenzocostantini-082c8784.koyeb.app/ordina/preparato`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    ordineId: ordineId
                })
            }
        )
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            await dispatch(fetchOrdini());
        } else {
            console.log("error");
        }
    };

    const cardStyles = {
        base: {
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s, transform 0.3s',
            cursor: 'pointer',
            flex: '1 1 calc(33% - 32px)',
            boxSizing: 'border-box',
            margin: '8px',
        },
        sent: {
            backgroundColor: '#FFA500',
        },
        delivered: {
            backgroundColor: '#e0ffe0', 
        },
        hover: {
            backgroundColor: '#f0f0f0',
            transform: 'translateY(-2px)',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
        },
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h2>Ordini:</h2>
            <div style={cardStyles.container}>
                {ordini && ordini.length > 0 ? ordini.map((ordine, index) => {
                    const cardStyle = {
                        ...cardStyles.base,
                        ...(ordine.status === "SENT" ? cardStyles.sent : {}),
                        ...(ordine.status === "DELIVERED" ? cardStyles.delivered : {}),
                    };

                    return (
                        <div
                            key={index}
                            style={cardStyle}
                            onClick={() => handleCardClick(ordine.id)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = cardStyles.hover.transform}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                        >
                            <h3>Tavolo {ordine.ntavolo}</h3>
                            <p><strong>Gin Tonic:</strong> {ordine.ginTonic?.name}</p>
                            <p><strong>Gin Bottle:</strong> {ordine.ginTonic?.ginBottle.name} ({ordine.ginTonic?.ginBottle.brand?.name})</p>
                            <p><strong>Tonica:</strong> {ordine.ginTonic?.tonica?.name} ({ordine.ginTonic?.tonica?.brandTonica?.name})</p>
                            <p><strong>Extra:</strong></p>
                            {ordine.ginTonic?.extras?.length > 0 ? (
                                ordine.ginTonic.extras.map((extra, index) => (
                                    <p key={index}>{extra.extra?.name} {extra.quantity}{extra.um}</p>
                                ))
                            ) : (
                                <p>Nessun extra</p>
                            )}
                            <p><strong>Guarnizioni:</strong></p>
                            {ordine.ginTonic?.garnishes?.length > 0 ? (
                                ordine.ginTonic.garnishes.map((garnish, index) => (
                                    <p key={index}>{garnish.guarnizione.name} {garnish.quantity}{garnish.um}</p>
                                ))
                            ) : (
                                <p>Nessuna guarnizione</p>
                            )}
                            <p><strong>Prezzo:</strong> €{ordine.ginTonic?.finalPrice}</p>
                        </div>
                    );
                }) : 
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <p>Nessun ordine</p>
                    <img className="mx-5 rounded-4" height={"200px"} src={sadCatImage}/>
                </div>
                }
            </div>
        </>
    );
};

export default WorkerPanel;
