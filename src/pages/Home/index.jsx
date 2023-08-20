import React, { useState, useCallback } from 'react';
import Header from '../../components/Header';
import CardsContainer from '../../components/CardsContainer';
import EvidenceFilter from '../../components/EvidenceFilter';
import entitiesData from '../../data/entities.json';

function Home() {
  const [filteredEntities, setFilteredEntities] = useState(entitiesData.entités);
  const [selectedEvidences, setSelectedEvidences] = useState([]);

  const handleFilterChange = useCallback((evidenceState) => {
    const confirmed = Object.keys(evidenceState).filter(k => evidenceState[k] === 'confirmed');
    const refuted = Object.keys(evidenceState).filter(k => evidenceState[k] === 'refuted');

    const isMimic = (entity) => {
        return entity.nom === 'Mimic';
    };

    // Si aucune preuve n'est confirmée ou réfutée, retourne tous les fantômes
    if (confirmed.length === 0 && refuted.length === 0) {
        setFilteredEntities(entitiesData.entités);
        setSelectedEvidences([]);
        return;  // Sortie anticipée
    }

    const newFilteredEntities = entitiesData.entités.filter(entity => {
      // Pour le Mimic : 
      if (isMimic(entity)) {
        const mimicEvidences = ["Spirit Box", "Ultraviolet", "Températures glaciales", "Orbe fantomatique"];
        const hasAnyMimicEvidence = mimicEvidences.some(e => confirmed.includes(e));
        const hasConfirmedNonMimicEvidence = confirmed.some(e => !mimicEvidences.includes(e));
        const hasRefutedMimicEvidence = refuted.some(e => mimicEvidences.includes(e));

        return hasAnyMimicEvidence && !hasConfirmedNonMimicEvidence && !hasRefutedMimicEvidence;
      } 

      // Pour les autres fantômes :
      const hasAllConfirmed = confirmed.every(e => entity.preuves.includes(e));
      const hasAnyRefuted = refuted.some(e => entity.preuves.includes(e));

      return hasAllConfirmed && !hasAnyRefuted;
    });

    setFilteredEntities(newFilteredEntities);
    setSelectedEvidences(confirmed);
}, []);



  return (
    <div>
      <Header />
      <EvidenceFilter onFilterChange={handleFilterChange} />
      <CardsContainer entities={filteredEntities} selectedEvidences={selectedEvidences} />
    </div>
  );
}

export default Home;
