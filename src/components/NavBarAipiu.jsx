import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import React from 'react';

function NavBarAipiu() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/workerpanel"
  const isAdmin = location.pathname === "/admin" || "admin/magazzino"
  const navigate = useNavigate()
  const logOut = function(){
    sessionStorage.removeItem("token")
    navigate("/")
  }


  return (
    <Navbar expand="md" bg="primary" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Ya p&apos;yu - Io bevo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
              location.pathname === "/workerpanel" && <Button variant='secondary' onClick={logOut}>Logout</Button>
            }
            {!isHome && (
              <>
                <Nav.Link as={Link} to="/admin">Home</Nav.Link>
                <Nav.Link as={Link} to="/admin/magazzino">Magazzino</Nav.Link>
                <NavDropdown title="Funzioni" id="basic-nav-dropdown">

                  <NavDropdown.Item as={Link} to="/admin/ricette">Ricette</NavDropdown.Item>
                  {
                    isAdmin &&
                    <>
                    <NavDropdown.Item as={Link} to="/admin/carico">Carichi</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/utenti">Utenti</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/ginbrands">Brands di Gin</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/flavours">Flavours</NavDropdown.Item>
                    </>
                  }
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/"} onClick={logOut}>LogOut</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarAipiu;
