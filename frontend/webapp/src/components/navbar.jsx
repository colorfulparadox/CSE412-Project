import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useEffect, useState } from 'react';
import '../styles/navbar.css'; 

async function handleLogout() {
  try {
    await fetch("http://localhost:5001/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export default function NavBar() {

//   const [user, setAdminData] = useState(null);

    const onSubmit = (event) => {
      handleLogout();
    }

    return (
      <Navbar className="custom-navbar" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="/ui_assets/PokemonSearch_Logo.png"
            width="300"
            height="auto"
            className="d-inline-block align-top"
            alt="Pokemon Search Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link href="/collection">Collection</Nav.Link>
            <Nav.Link href="/statcompare">Stat Comparison</Nav.Link>
            <Nav.Link href="/pokedex">Pokédex</Nav.Link>
            <Nav.Link href="/userprofile">Profile</Nav.Link>
          </Nav>
          <Button className="logout-button" variant="outline-primary" onClick={onSubmit}>
            LOGOUT
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}