import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const LoginForm = function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    

    const fetchLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                console.error('Login request failed:', response.statusText);
                return;
            }

            const data = await response.json()
            
            sessionStorage.setItem("token", data.accessToken);
            if(data.role === "ADMIN"){
                navigate('/admin');
            } else {
                if(data.role === "BARMAN"){
                    navigate('/workerpanel');
                }
            }


        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        fetchLogin(); 
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Indirizzo email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                    Inserisci l&apos;email fornita in fase di registrazione
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
