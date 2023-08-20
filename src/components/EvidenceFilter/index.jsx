import React, { useState } from 'react';
import './EvidenceFilter.css';

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
  const [isMenuOpen, setMenuOpen] = useState(false);

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
    <div className={`evidence-filter-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="evidence-filter-title" onClick={() => setMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "Masquer les filtres" : "Afficher les filtres"}
        <i className={`fa-solid arrow-icon ${isMenuOpen ? 'fa-circle-up' : 'fa-circle-down'}`}></i>
      </div>

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
