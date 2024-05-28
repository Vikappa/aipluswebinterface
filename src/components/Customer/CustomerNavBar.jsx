import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

const CustomerNavBar = () => {
    return(
        <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Ya p&apos;yu</Navbar.Brand>
        </Container>
      </Navbar>
        </>
    )
}
export default CustomerNavBar