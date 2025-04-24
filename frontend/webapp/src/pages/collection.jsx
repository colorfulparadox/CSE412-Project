import NavBar from '../components/navbar'; 
import { Button, Col, Container, Navbar, Table } from 'react-bootstrap';

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
    
    return (
        <>
        <NavBar/>
        <Container>
            <p>todo: search & filter</p>
            <Button onClick={handleClick} name="add">Add a new Pokémon</Button>
            <Button onClick={handleClick} name="remove">Remove a Pokémon</Button>
            <Table striped bordered hover /*size='sm'*/>
                <thead>
                    <tr>
                        <th colSpan={1}>Pokédex #</th>
                        <th colSpan={2}>Pokémon</th>
                    </tr>
                </thead>
                <tr>
                    <td>1</td>
                    <td>Pikachu</td>
                </tr>
            </Table>
        </Container>
        </>
    );
}