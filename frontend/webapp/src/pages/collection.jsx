import NavBar from '../components/navbar'; 
import { Button, Col, Container, Form, Navbar, Table } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';


function load_collection() {
    console.log("loading");
}

function add() {
    console.log("add");
}

function remove() {
    console.log("remove");
}

export default function Collection() {

    // do something on component mount
    useEffect(() => {
        load_collection()

    }, []);

    const handleClick = (event) => {
        event.preventDefault();

        switch (event.target.name) {
            case 'add':
                add();
                break;
            case 'remove':
                remove();
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("submitting")
    }
    
    return (
        <>
        <NavBar/>
        <Container>
            <h1>Pokémon Collection (Pokédex)</h1>
            <p>View your Pokédex, add or remove Pokémon, search and filter.</p>
            <Form>
                <Form.Group>
                    <Form.Control type="text" name="searchinput" id="searchinput" placeholder='Enter a Pokémon name or Pokédex ID'></Form.Control>
                    <Button type="submit" 
                        className="mb-3"
                        onClick={handleSubmit}
                        >Search</Button>
                </Form.Group>
            </Form>
            <Button onClick={handleClick} name="add">Add a new Pokémon</Button>
            <Button onClick={handleClick} name="remove">Remove a Pokémon</Button>
            <Table striped bordered hover /*size='sm'*/>
                <thead>
                    <tr>
                        <th colSpan={1}>Pokédex #</th>
                        <th colSpan={2}>Pokémon</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Pikachu</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
        </>
    );
}