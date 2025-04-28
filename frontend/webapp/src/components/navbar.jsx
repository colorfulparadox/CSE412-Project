import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useEffect, useState } from 'react';

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
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Pokémon Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="/collection">Collection</Nav.Link>
            <Nav.Link href="/statcompare">Stat Comparison</Nav.Link>
            <Nav.Link href="/pokedex">Pokedex</Nav.Link>
            <Nav.Link href="/userprofile">Profile</Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Button className="" variant="outline-danger" type="submit" onClick={onSubmit}>Logout</Button>
        </Container>
      </Navbar>
    )
}