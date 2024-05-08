import { useState, useEffect } from 'react';
import AddBrandModal from './AddBrandModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Spinner1 from './Spinner1';

const GinBrandsWindow = () => {
    const [sessionToken] = useState(sessionStorage.getItem('token') || null);
    const [isLoading, setIsLoading] = useState(true);
    const [ginBrands, setGinBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchGinBrands = async () => {
        try {
            const response = await fetch('http://localhost:3001/ginbrand/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionToken,
                },
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
        try {
            const response = await fetch('http://localhost:3001/ginbrand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionToken,
                },
                body: JSON.stringify({ name, description, imageUrl, sovrapprezzo }),
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

    const addNewBrandWithImg = async function ({ name, description, image, surcharge }) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('sovrapprezzo', surcharge);
        formData.append('imageFile', image);

        try {
            const response = await fetch('http://localhost:3001/ginbrand/uploadimage', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionToken,
                },
                body: formData,
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

    return (
        <div className="container-fluid">
            <h5>Brands Gin Registrati</h5>
            {isLoading ? (
                <Spinner1 />
            ) : (
                <div className="accordion w-100" id="ginBrandsAccordion">
                    {ginBrands.map((brand, index) => {
                        const idHeading = `heading-${index}`;
                        const idCollapse = `collapse-${index}`;
                        return (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header" id={idHeading}>
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#${idCollapse}`}
                                        aria-expanded="true"
                                        aria-controls={idCollapse}
                                    >
                                        <img
                                            height="28px"
                                            src={brand.imageUrl}
                                            alt="brand"
                                        />{' '}
                                        {brand.name}
                                    </button>
                                </h2>
                                <div
                                    id={idCollapse}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={idHeading}
                                    data-bs-parent="#ginBrandsAccordion"
                                >
                                    <div className="accordion-body">
                                        <p>Descrizione: {brand.description}</p>
                                        <p>Sovrapprezzo: {brand.sovrapprezzo}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    
                    <button className='full-width d-flex align-items-center justify-content-between btn-outline-primary rounded-3 border-primary border-3' onClick={openModal} >
                         <p className='m-1 text-primary'>Aggiungi brand</p>
                         <i className="bi bi-plus-circle m-2 fs-4 text-primary"></i>
                    </button>

                </div>
            )}
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
