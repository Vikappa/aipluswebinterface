import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';

const UsersWindows = function () {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const dispatch = useDispatch()

    const handleShow = () => setShowModal(true);

    const handleClose = function(){
        setShowModal(false)
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/users/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
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

    useEffect(() => {
        setIsFormValid(
            name.trim() !== '' &&
            surname.trim() !== '' &&
            email.trim() !== '' &&
            role.trim() !== '' &&
            password.trim() !== ''
        );
    }, [name, surname, email, role, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ name, surname, email, role, password })

        const response = await fetch('http://localhost:3001/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                name:name,
                surname:surname,
                email:email,
                password:password,
                role:role
            })
        });

        if (response && response.ok) {
            const data = await response.json()
            console.log(data)
            setShowModal(false)
            dispatch(fetchUsers())
        } else {
            console.error('Failed to fetch users:', response.statusText);
        }
    }

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

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registra nuovo utente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSurname">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cognome"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                L&apos;email sarà richiesta ad ogni login dell&apos;utente
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Ruolo</Form.Label>
                            <Form.Select
                                aria-label="Seleziona ruolo utente"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Seleziona ruolo utente</option>
                                <option value="BARMAN">BARMAN</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!isFormValid}>
                            Registra
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annulla
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UsersWindows;
