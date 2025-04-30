import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/navbar.css'; 

import Cookies from 'js-cookie';

async function handleLogout() {
  try {
    await fetch("/logout", {
      method: "POST",
      credentials: "include",
    })
  } catch (error) {
    console.error("Logout failed:", error);
  }
  finally {
    location.reload();
  }
}

function AuthButton() {
  const authCookie = Cookies.get('auth_token');
  if (authCookie) {
    return (
      <button className="logout-button" variant="outline-primary" onClick={handleLogout}>
        LOGOUT
      </button>
    );
  } else {
    return (
      <button
        className="login-button"
        variant="outline-primary"
        onClick={() => {
          window.location.href = '/login';
        }}
      >
        LOGIN
      </button>
    );
  }
}

export default function NavBar() {
  const location = useLocation();

//   const [user, setAdminData] = useState(null);

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
            <Nav.Link href="/globalpokedex" className={location.pathname === '/globalpokedex' ? 'active' : ''}>Pokémon</Nav.Link>
            <Nav.Link href="/statcompare" className={location.pathname === '/statcompare' ? 'active' : ''}>Stat Comparison</Nav.Link>
            <Nav.Link href="/mypokedex" className={location.pathname === '/mypokedex' ? 'active' : ''}>My Pokédex</Nav.Link>
            <Nav.Link href="/userprofile" className={location.pathname === '/userprofile' ? 'active' : ''}>My Profile</Nav.Link>
          </Nav>
          <AuthButton/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}