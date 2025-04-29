import React, { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import '../styles/pokemon_card.css';

const PokemonCard = ({ pokemon }) => {
  const [hovered, setHovered] = useState(false);

  const {
    id,
    name,
    image,
    type1,
    type2,
    bst,
    hp, 
    atk, 
    def, 
    spatk, 
    spdef, 
    speed
  } = pokemon;

  return (
    <Card
      className="pokemon-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="image-container">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Footer className="d-flex justify-content-between">
        <strong>{name}</strong>
        <span className="text-muted">#{id}</span>
      </Card.Footer>
      <Table striped bordered hover>
        <thead>
            <th>Type 1</th>
            <th>Type 2</th>
            <th>Total</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Sp. Atk</th>
            <th>Sp. Def</th>
            <th>Speed</th>
        </thead>
        <tbody>
            <td>{type1}</td>
            <td>{type2}</td>
            <td>{bst}</td>
            <td>{hp}</td>
            <td>{atk}</td>
            <td>{def}</td>
            <td>{spatk}</td>
            <td>{spdef}</td>
            <td>{speed}</td>
        </tbody>
        </Table>
    </Card>
  );
};

export default PokemonCard;

/*

        {hovered && (
          <div className="overlay">
            <div className="text">
              <strong>Type 1:</strong> {type1}<br />
              <strong>Type 2:</strong> {type2 || 'None'}<br />
              <strong>BST:</strong> {bst}<br />
              <strong>HP:</strong> {hp}<br />
              <strong>Atk:</strong> {atk}<br />
              <strong>Def:</strong> {def}<br />
              <strong>SpAtk:</strong> {spatk}<br />
              <strong>SpDef:</strong> {spdef}<br />
              <strong>Speed:</strong> {speed}
            </div>
          </div>
        )}

*/