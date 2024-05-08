import { useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import Spinner1 from "./Spinner1";
import AddBrandModal from "./AddBrandModal";

const GinBrandsWindow = () => {
    const [sessionToken] = useState(sessionStorage.getItem("token") || null);
    const [isLoading, setIsLoading] = useState(true);
    const [ginBrands, setGinBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);


    const fetchGinBrands = async () => {
        try {
            const response = await fetch('http://localhost:3001/ginbrand/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setGinBrands(data);
            } else {
                console.error('Failed to fetch gin brands:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addNewBrand = async ({ name, description, imageUrl, sovrapprezzo }) => {
        let response;
        try {

                response = await fetch('http://localhost:3001/ginbrand', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionToken
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        imageUrl,
                        sovrapprezzo
                    })
                })

            if (response && response.ok) {
                fetchGinBrands(); 
            } else {
                console.error('Failed to add gin brand:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const addNewBrandWithImg = async function ({name, description, image, surcharge}) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('sovrapprezzo', surcharge);
        formData.append('imageFile', image); 
    
        try {
            const response = await fetch('http://localhost:3001/ginbrand/uploadimage', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionToken
                },
                body: formData 
            });
    
            if (response && response.ok) {
                fetchGinBrands(); 
            } else {
                console.error('Failed to add gin brand:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        if (sessionToken) {
            fetchGinBrands();
        }
    }, [sessionToken]);

    const GinBrandsSection = () => (
        <>
            {isLoading ? (
                <Spinner1 />
            ) : (
                <div style={{ width: '100%' }}>
                    <h5>Registered Gin Brands</h5>
                    <Accordion >
                        {ginBrands.map((brand, index) => (
                            <Accordion.Item eventKey={index.toString()} key={index}>
                                <Accordion.Header><img height="28px" src={brand.imageUrl} />{brand.name}</Accordion.Header>
                                <Accordion.Body>
                                    <div className="d-flex">
                                        <div className="ms-3">
                                            <p>Descrizione: {brand.description}</p>
                                            <p>Sovrapprezzo: {brand.sovrapprezzo}</p>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                        <Card>
                            <Card.Header>
                                <div className="d-flex align-items-baseline justify-content-between">
                                    <p className="mb-1">Aggiungi Brand</p>
                                <i onClick={openModal} className="bi bi-plus-square-fill" style={{color:"skyblue"}}></i>
                                </div>
                            </Card.Header>
                        </Card>
                    </Accordion>
                </div>
            )}
        </>
    );

    return (
        <div>
            {sessionToken ? <GinBrandsSection /> : <h1>Error, please log in again</h1>}
            <AddBrandModal
                show={showModal}
                onHide={closeModal}
                addNewBrand={addNewBrand}
                addNewBrandWithImg={addNewBrandWithImg}
            />
        </div>
    );
};

export default GinBrandsWindow;
