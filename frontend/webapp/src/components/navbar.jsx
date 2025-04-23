import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useEffect, useState } from 'react';

function Logout(event, navigate){
  event.preventDefault();
  navigate('/');
}

export default function NavBar() {

//   const [user, setAdminData] = useState(null);

    const onSubmit = (event) => {
        Logout(event, navigate)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Pokémon Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="/">Collection Management</Nav.Link>
            <Nav.Link href="/">State Comparison</Nav.Link>
            <Nav.Link href="/">Search & Filter</Nav.Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Button className="" variant="outline-danger" type="submit" onClick={onSubmit}>Logout</Button>
        </Container>
      </Navbar>
    )
}