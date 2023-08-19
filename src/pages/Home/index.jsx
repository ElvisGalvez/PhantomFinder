import React, { useState } from 'react';
import Header from '../../components/Header';
import CardsContainer from '../../components/CardsContainer';
import EvidenceFilter from '../../components/EvidenceFilter';
import entitiesData from '../../data/entities.json';

function Home() {
  const [filteredEntities, setFilteredEntities] = useState(entitiesData.entités);
  const [selectedEvidences, setSelectedEvidences] = useState([]);

  const handleFilterChange = (selectedEvidences) => {
    setSelectedEvidences(selectedEvidences);
    
    const newFilteredEntities = entitiesData.entités.filter(entity => {
      // Si l'entité est le Mimic et que "Orbe fantomatique" est sélectionné
      if (entity.nom === 'Mimic' && selectedEvidences.includes('Orbe fantomatique')) {
        // Vérifier que les autres preuves sélectionnées sont valides pour le Mimic
        return selectedEvidences.every(evidence => 
          (entity.preuves.includes(evidence) || evidence === 'Orbe fantomatique')
        );
      }
      
      // Logique standard pour toutes les autres entités
      return selectedEvidences.every(evidence => entity.preuves.includes(evidence));
    });
    
    setFilteredEntities(newFilteredEntities);
  };

  return (
    <div>
      <Header />
      <EvidenceFilter onFilterChange={handleFilterChange} />
      <CardsContainer entities={filteredEntities} selectedEvidences={selectedEvidences} /> 
    </div>
  );
}


export default Home;
