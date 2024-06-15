import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import SpinnerRelogCustomer from '../Spinners/SpinnerRelogCustomer'
import { set } from 'date-fns';
import UserLoginFailed from '../Spinners/UserLoginFailed';

const LoginForm = function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoadingLoginTop, setIsLoadingLoginTop] = useState(false);
    const [userloginFailed, setUserloginFailed] = useState(false);

    const customerLogin = async (tavnum) => {
        try {
            const response = await fetch(`http://localhost:3001/customer/createcustomer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tavNum: tavnum,
                })
            });

            if (!response.ok) {
                console.error('Customer registration request failed:', response.statusText);
                return;
            }

            const data = await response.json();
            console.log('Customer data:', data)
            sessionStorage.setItem("token", data.accessToken);
            navigate('/customer');

        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const fetchLogin = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 10000); // 10 secondi di timeout
    
        try {
            setIsLoadingLoginTop(true);
    
            const response = await fetch(`http://localhost:3001/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                signal: controller.signal 
            });
    
            clearTimeout(timeoutId); 
    
            if (!response.ok) {
                console.error('Login request failed:', response.statusText);
                setIsLoadingLoginTop(false);
                setUserloginFailed(true);
                return;
            }
    
            const data = await response.json();
            console.log('Login data:', data);
    
            sessionStorage.setItem("token", data.accessToken);
    
            if (data.role === "ADMIN") {
                navigate('/admin');
            } else if (data.role === "BARMAN") {
                navigate('/workerpanel');
            }
    
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Login request timed out');
            } else {
                console.error('An error occurred:', error);
            }
            setIsLoadingLoginTop(false);
            setUserloginFailed(true);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchLogin();
    };
    

    const customer1 = () => customerLogin(1);
    const customer2 = () => customerLogin(2);
    const customer3 = () => customerLogin(3);
    const customer4 = () => customerLogin(4);
    const customer5 = () => customerLogin(5);
    const customer6 = () => customerLogin(6);

    return (
        <>
            {
                !isLoadingLoginTop?
                userloginFailed?
               <UserLoginFailed userloginFailed={userloginFailed} setUserloginFailed={setUserloginFailed} />
                :
                (
                <Form className='p-1' onSubmit={handleSubmit}>
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
                ) :
                (
                <div className="m-2 p-5 d-flex justify-content-center w-100" role="status">
                    <SpinnerRelogCustomer/>
                    <span className="visually-hidden">Loading...</span>
                </div>
                )
        }
            <Container className="mt-4">
                <Row className="gy-2">
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <Button onClick={customer1} variant="outline-primary" className='btn w-100'>Ordina Tavolo 1</Button>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <Button onClick={customer2} variant="outline-primary" className='btn w-100'>Ordina Tavolo 2</Button>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <Button onClick={customer3} variant="outline-primary" className='btn w-100'>Ordina Tavolo 3</Button>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <Button onClick={customer4} variant="outline-primary" className='btn w-100'>Ordina Tavolo 4</Button>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <Button onClick={customer5} variant="outline-primary" className='btn w-100'>Ordina Tavolo 5</Button>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <Button onClick={customer6} variant="outline-primary" className='btn w-100'>Ordina Tavolo 6</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginForm;
