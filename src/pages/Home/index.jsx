import React, { useState } from 'react';
import Header from '../../components/Header';
import CardsContainer from '../../components/CardsContainer';
import EvidenceFilter from '../../components/EvidenceFilter';
import entitiesData from '../../data/entities.json';

function Home() {
  const [filteredEntities, setFilteredEntities] = useState(entitiesData.entités);
  const [selectedEvidences, setSelectedEvidences] = useState([]);

  const handleFilterChange = (evidenceState) => {
    const confirmed = Object.keys(evidenceState).filter(k => evidenceState[k] === 'confirmed');
    const refuted = Object.keys(evidenceState).filter(k => evidenceState[k] === 'refuted');
    
    const isMimic = (entity) => {
      return entity.nom === 'Mimic'; 
    };

    const newFilteredEntities = entitiesData.entités.filter(entity => {
      // Pour le Mimic : 
      if (isMimic(entity)) {
        const mimicOrbeDetected = confirmed.includes("Orbe fantomatique");
        const hasAllMimicEvidence = ["Spirit Box", "Ultraviolet", "Températures glaciales"].every(e => confirmed.includes(e));
        const hasRefutedMimicEvidence = refuted.some(e => ["Spirit Box", "Ultraviolet", "Températures glaciales", "Orbe fantomatique"].includes(e));

        return (mimicOrbeDetected && hasAllMimicEvidence) && !hasRefutedMimicEvidence;
      }

      // Pour les autres fantômes :
      const hasAllConfirmed = confirmed.every(e => entity.preuves.includes(e));
      const hasAnyRefuted = refuted.some(e => entity.preuves.includes(e));

      return hasAllConfirmed && !hasAnyRefuted;
    });
    
    setFilteredEntities(newFilteredEntities);
    setSelectedEvidences(confirmed);
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
