import NavBar from '../components/navbar'; 
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';


export default function StatCompare() {
    const [poke1, setPoke1] = useState("");
    const [poke2, setPoke2] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("submitting")
        console.log(poke1, poke2)
    }

    const handleChange = (event) => {
        event.preventDefault();
    
        switch (event.target.name) {
            case 'poke1':
                setPoke1(event.target.value);
                // userData[event.target.name] = event.target.value;
                break;
            case 'poke2':
                setPoke2(event.target.value);
                // userData[event.target.name] = event.target.value;
                break;
        }
    
    }
    
    return (
        <>
        <NavBar/>
        <Container>
            <h1>Stat Comparison</h1>
            <p>Choose two Pokémon and compare their stats</p>
            <Form>
                <Form.Group>
                    <Form.Control type="text" name="poke1" value={poke1} id="poke1" placeholder='Enter the first Pokémon name or Pokédex ID'
                    onChange={handleChange}></Form.Control>
                    <Form.Control type="text" name="poke2" value={poke2} id="poke2" placeholder='Enter the second Pokémon name or Pokédex ID'
                    onChange={handleChange}></Form.Control>
                    <Button type="submit" 
                        className="mb-3"
                        onClick={handleSubmit}
                        >Compare</Button>
                </Form.Group>
            </Form>
        </Container>
        </>
    );
}