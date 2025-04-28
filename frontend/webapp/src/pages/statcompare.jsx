import NavBar from '../components/navbar'; 
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { pokeapi } from '../api/pokemonapi';


export default function StatCompare() {
    const [poke1, setPoke1] = useState("");
    const [poke2, setPoke2] = useState("");
    const [pokeData1, setPokeData1] = useState([]);
    const [pokeData2, setPokeData2] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTable, setShowTable] = useState(false);

    async function load_pokemon() {
        setLoading(true);
        setError(null);
    
        try {
            const data1 = await pokeapi("/pokemon/" + poke1.toLowerCase());
            const data2 = await pokeapi("/pokemon/" + poke2.toLowerCase());
            setPokeData1(data1[0]);
            setPokeData2(data2[0]);
            console.log("DATA1:", data1[0]);
            console.log("DATA2:", data2[0]);

            setShowTable(true);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowTable(false);
        console.log("submitting");
        console.log(poke1, poke2);

        // prevent running if one is empty

        load_pokemon(poke1, poke2);

        setShowTable(true);
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
            {showTable && (
                <Table striped bordered hover /*size='sm'*/>
                    <thead>
                        <tr>
                            <th>Stats</th>
                            <th>Pokémon 1</th>
                            <th>Pokémon 2</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr key="pokedex_num">
                            <td>Pokédex #</td>
                            <td>{pokeData1?.pokedex_num}</td>
                            <td>{pokeData2?.pokedex_num}</td>
                        </tr>
                    <tr key="img">
                            <td>Image</td>
                            <td>
                                {pokeData1?.name && (
                                <img 
                                    src={`https://img.pokemondb.net/artwork/${pokeData1.name.toLowerCase()}.jpg`} 
                                    alt={pokeData1.name} 
                                    onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                                />
                                )}
                            </td>
                            <td>
                                {pokeData2?.name && (
                                <img 
                                    src={`https://img.pokemondb.net/artwork/${pokeData2.name.toLowerCase()}.jpg`} 
                                    alt={pokeData2.name} 
                                    onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                                />
                                )}
                            </td>
                        </tr>
                        <tr key="name">
                            <td>Pokémon</td>
                            <td>{pokeData1?.name}</td>
                            <td>{pokeData2?.name}</td>
                        </tr>
                        <tr key="type1">
                            <td>Type 1</td>
                            <td>{pokeData1?.type1}</td>
                            <td>{pokeData2?.type1}</td>
                        </tr>
                        <tr key="type2">
                            <td>Type 2</td>
                            <td>{pokeData1?.type2}</td>
                            <td>{pokeData2?.type2}</td>
                        </tr>
                        <tr key="bst">
                            <td>Total</td>
                            <td>{pokeData1?.bst}</td>
                            <td>{pokeData2?.bst}</td>
                        </tr>
                        <tr key="hp">
                            <td>HP</td>
                            <td>{pokeData1?.hp}</td>
                            <td>{pokeData2?.hp}</td>
                        </tr>
                        <tr key="atk">
                            <td>Attack</td>
                            <td>{pokeData1?.atk}</td>
                            <td>{pokeData2?.atk}</td>
                        </tr>
                        <tr key="def">
                            <td>Defense</td>
                            <td>{pokeData1?.def}</td>
                            <td>{pokeData2?.def}</td>
                        </tr>
                        <tr key="spatk">
                            <td>Sp. Atk</td>
                            <td>{pokeData1?.spatk}</td>
                            <td>{pokeData2?.spatk}</td>
                        </tr>
                        <tr key="spdef">
                            <td>Sp. Def</td>
                            <td>{pokeData1?.spdef}</td>
                            <td>{pokeData2?.spdef}</td>
                        </tr>
                        <tr key="speed">
                            <td>Speed</td>
                            <td>{pokeData1?.speed}</td>
                            <td>{pokeData2?.speed}</td>
                        </tr>
                    </tbody>
                </Table>
            )}
        </Container>
        </>
    );
}