import { useState, useEffect } from "react";
import Spinner1 from "../Spinner1";

const FullMagazzino = function(){

    const [sessionToken] = useState(sessionStorage.getItem('token') || null);
    const [isLoading, setIsLoading] = useState(true);
    const [prodotti, setProdotti] = useState([]);

    useEffect(() => {
        fetchProdotti();
    }, [])
    
    const fetchProdotti = async function(){
        try {
            const response = await fetch('http://localhost:3001/prodotto/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ sessionToken
                }})
            if (response.ok) {
                const data = await response.json();
                setProdotti(data);
            }
            } catch (error) {
                console.error('An error occurred:', error);
            }
    }

    return(
        <>

        </>
    )
}

export default FullMagazzino