import { useState, useEffect } from "react"

const GinBottleStock = function(){
    const [sessionToken] = useState(sessionStorage.getItem('token') || null);
    const [ginBottles, setGinBottles] = useState([])

    const fetchGinBottles = async () => {
        try {
            const response = await fetch('http://localhost:3001/ginbottle/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ sessionToken
                }

            })
            if (response.ok) {
                const data = await response.json();
                setGinBottles(data);
                
            }
        }catch (error) {
            console.error('An error occurred:', error);
        }
    }

    useEffect(() => {
        fetchGinBottles()
    }, [])


    

    return(
        <>

        </>
    )
}

export default GinBottleStock