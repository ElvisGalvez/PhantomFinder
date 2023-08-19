import React, { useState } from 'react';
import './EvidenceFilter.css'

function EvidenceFilter({ onFilterChange }) {
  const evidences = [
    "Écriture fantomatique",
    "EMF niveau 5",
    "Orbe fantomatique",
    "Projecteur D.O.T.S",
    "Spirit Box",
    "Températures glaciales",
    "Ultraviolet"
  ];
  
  const [activeEvidences, setActiveEvidences] = useState([]);

  const toggleEvidence = evidence => {
    if (activeEvidences.includes(evidence)) {
      setActiveEvidences(prev => {
        const updatedEvidences = prev.filter(e => e !== evidence);
        onFilterChange(updatedEvidences); 
        return updatedEvidences;
      });
    } else {
      setActiveEvidences(prev => {
        const updatedEvidences = [...prev, evidence];
        onFilterChange(updatedEvidences); 
        return updatedEvidences;
      });
    }
  }

  return (
    <div className="evidence-filter-container">
      <div className="evidence-filter-title">Par filtre</div>
      {evidences.map(evidence => (
          <button 
              key={evidence} 
              onClick={() => toggleEvidence(evidence)}
              className={`evidence-button ${activeEvidences.includes(evidence) ? 'active' : ''}`}
          >
              {evidence}
          </button>
      ))}
    </div>
  );
}

export default EvidenceFilter;
