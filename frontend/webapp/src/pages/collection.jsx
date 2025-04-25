import NavBar from '../components/navbar'; 
import { Button, Col, Container, Form, Navbar, Table } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { pokeapi } from '../api/pokemonapi';

async function add(pokedexid) {
    console.log("add");
    const resp = await pokeapi("/pokedex/add/" + pokedexid)
}


async function remove(pokedexid) {
    console.log("remove");
    const resp = await pokeapi("/pokedex/remove/" + pokedexid)

}

export default function Collection() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");
  
    async function load_collection() {
        try {
            const data = await pokeapi("/pokedex");
            console.log("DATA:", data);
            setPokemonList(data);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function load_search(term) {
        try {
            const data = await pokeapi("/pokedex/" + term);
            console.log("DATA:", data);
            setPokemonList(data);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        event.preventDefault();
    
        switch (event.target.name) {
            case 'searchinput':
                setSearchInput(event.target.value);
                break;
        }
    
    }

    // do something on component mount
    useEffect(() => {
        load_collection()
      }, []);

    const handleClick = async (event) => {
        event.preventDefault();

        let send = searchInput.toLowerCase()
        switch (event.target.name) {
            case 'add':
                console.log(send);
                await add(send);
                load_collection();
                break;
            case 'remove':
                console.log(send);
                await remove(send);
                load_collection();
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (searchInput == '' || searchInput == ' ') {
            load_collection();
            return;
        }

        console.log("submitting");
        let send = searchInput.toLowerCase()
        load_search(send);
        
    }
    
    return (
        <>
        <NavBar/>
        <Container>
            <h1>Pokémon Collection (Pokédex)</h1>
            <p>View your Pokédex, search, add, or remove Pokémon.</p>
            <Form>
                <Form.Group>
                    <Form.Control type="text" name="searchinput" id="searchinput" value={searchInput} onChange={handleChange} placeholder='Enter a Pokémon name or Pokédex ID'></Form.Control>
                    <Button type="submit" 
                        className="mb-3"
                        onClick={handleSubmit}
                        >Search</Button>
                </Form.Group>
            </Form>
            <Button onClick={handleClick} name="add">Add new Pokémon</Button>
            <Button onClick={handleClick} name="remove">Remove Pokémon</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Pokédex #</th>
                        <th>Pokémon</th>
                        <th>Type 1</th>
                        <th>Type 2</th>
                        <th>Total</th>
                        <th>HP</th>
                        <th>Attack</th>
                        <th>Defense</th>
                        <th>Sp. Atk</th>
                        <th>Sp. Def</th>
                        <th>Speed</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemonList.map(p => (
                        <tr key={p.pokedex_num}>
                            <td>{p.pokedex_num}</td>
                            <td>{p.name}</td>
                            <td>{p.type1}</td>
                            <td>{p.type2}</td>
                            <td>{p.bst}</td>
                            <td>{p.hp}</td>
                            <td>{p.atk}</td>
                            <td>{p.def}</td>
                            <td>{p.spatk}</td>
                            <td>{p.spdef}</td>
                            <td>{p.speed}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Container>
        </>
    );
}