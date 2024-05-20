import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBarAipiu() {
  const location = useLocation();
  const isHome = location.pathname === "/"
  const isAdmin = location.pathname === "/admin" || "admin/magazzino"

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

  return (
    <Navbar expand="md" bg="primary" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Ya p&apos;yu - Io bevo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
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
                  <NavDropdown.Item as={Link} to="/">LogOut</NavDropdown.Item>
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
