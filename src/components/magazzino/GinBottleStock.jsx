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
        <div className="gin-bottles-container">
            <h1 className="gin-bottles-title">Gin Bottles Stock</h1>
            <table className="gin-bottles-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Brand ID</th>
                        <th>Name</th>
                        <th>Flavour</th>
                        <th>Batch Number</th>
                        <th>Alcohol Percentage</th>
                        <th>Production Date</th>
                        <th>Expiration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ginBottles.map(bottle => (
                        <tr key={bottle.id}>
                            <td>{bottle.id}</td>
                            <td>{bottle.brand.name}</td>
                            <td>{bottle.name}</td>
                            <td>{bottle.flavour}</td>
                            <td>{bottle.batchNumber}</td>
                            <td>{bottle.alcoholPercentage}%</td>
                            <td>{bottle.productionDate}</td>
                            <td>{bottle.expirationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default GinBottleStock