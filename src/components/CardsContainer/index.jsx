import React from 'react';
import EntityCard from '../EntityCard';
import './CardsContainer.css';

function CardsContainer({ entities, selectedEvidences }) {
  return (
    <div className="cards-container">
      {entities.map((entity, index) => (
        <EntityCard key={index} entity={entity} selectedEvidences={selectedEvidences} />
      ))}
    </div>
  );
}

export default CardsContainer;
