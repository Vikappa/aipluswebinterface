import { useState, useEffect } from 'react';

const UsersWindows = function () {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [sessionToken] = useState(sessionStorage.getItem("token") || null);

    const handleShow = () => setShowModal(true);


    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionToken
                }
            });

            if (response && response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <>
            <h5>Tabella utenti e diritti</h5>
            <div className="table-responsive full-width">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Ruolo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="4">Caricamento...</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="4">Nessun utente trovato</td>
                            </tr>
                        ) : (
                            <>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>
                                    <button className='full-width d-flex align-items-center justify-content-between btn-outline-primary rounded-3 border-primary border-3' onClick={handleShow} >
                                    <p className='m-1 text-primary'>Registra utente</p>
                                    <i className="bi bi-plus-circle m-2 fs-4 text-primary"></i>
                                    </button>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UsersWindows;
