import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
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
      </div>
      <Card.Footer className="d-flex justify-content-between">
        <strong>{name}</strong>
        <span className="text-muted">#{id}</span>
      </Card.Footer>
    </Card>
  );
};

export default PokemonCard;
