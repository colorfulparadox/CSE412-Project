import NavBar from '../components/navbar'; 
import PokemonCard from '../components/pokemon_card'; 
import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { pokeapi } from '../api/pokemonapi';
import '../styles/landingpage.css'; 

export default function GlobalPokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");
  
    async function load_pokedex() {
        try {
            const data = await pokeapi("/pokemon");
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
            const data = await pokeapi("/pokemon/" + term);
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
        load_pokedex()
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // load entire pokedex if empty search;
        if (searchInput == '' || searchInput == ' ') {
            load_pokedex()
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
            <h1 className="page-title mt-4">All Pokémon (Global Pokédex)</h1>
            <p className="description">View the global Pokédex and search for Pokémon.</p>
            <Form>
                <Form.Group>
                    <Form.Control type="text" name="searchinput" id="searchinput" value={searchInput} onChange={handleChange} placeholder='Enter a Pokémon name or Pokédex ID' className="mb-4"></Form.Control>
                    <Button type="submit" 
                        className="btn-search mb-3"
                        onClick={handleSubmit}
                        >SEARCH</Button>
                </Form.Group>
            </Form>
            <Row>
                {pokemonList.map((p) => (
                    <Col key={p.pokedex_num} md={4} className="mb-d">
                        <PokemonCard
                            pokemon={{
                                id: p.pokedex_num,
                                name: p.name,
                                image: `https://img.pokemondb.net/artwork/${p.name.toLowerCase()}.jpg`,
                                type1: p.type1,
                                type2: p.type2,
                                bst: p.bst,
                                hp: p.hp,
                                atk: p.atk,
                                def: p.def,
                                spatk: p.spatk,
                                spdef: p.spdef,
                                speed: p.speed,
                            }}
                        />
                    </Col>
                ))}
            </Row>
            
        </Container>
        </>
    );
}
/*
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
            */