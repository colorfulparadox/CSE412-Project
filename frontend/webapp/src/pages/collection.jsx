import NavBar from '../components/navbar'; 
import PokemonCard from '../components/pokemon_card'; 

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { pokeapi } from '../api/pokemonapi';



async function add(pokedexid) {
    console.log("add");
    const resp = await pokeapi(`/pokedex/add/${pokedexid}`)
}


async function remove(pokedexid) {
    console.log("remove");
    const resp = await pokeapi(`/pokedex/remove/${pokedexid}`)

}

export default function Collection() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    // const [cookies, setCookie] = useCookies(['auth_token'])
  
    async function load_collection() {
        try {
            const data = await pokeapi(`/pokedex`);
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
            if (term == "" || term == " ") {
                load_collection();
            }
            else {
                const data = await pokeapi(`/pokedex/${term}`);
                console.log("DATA:", data);
                setPokemonList(data);
            }

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
            <h1>Pokémon Collection (Trainer Pokédex)</h1>
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