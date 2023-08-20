import React, { useState, useEffect } from 'react'; // Ajoutez useEffect à votre importation
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
  
  const [evidenceState, setEvidenceState] = useState({});
  const [isMenuOpen, setMenuOpen] = useState(false);
  const resetEvidences = () => {
    setEvidenceState({});
  };

  const toggleEvidence = evidence => {
    const current = evidenceState[evidence];
    if (!current) {
        setEvidenceState(prev => ({ ...prev, [evidence]: 'confirmed' }));
    } else if (current === 'confirmed') {
        setEvidenceState(prev => ({ ...prev, [evidence]: 'refuted' }));
    } else {
        const newState = { ...evidenceState };
        delete newState[evidence];
        setEvidenceState(newState);
    }
  };

  const getButtonClass = (evidence) => {
    switch (evidenceState[evidence]) {
        case 'confirmed': return 'active'; // ou la classe CSS pour le bleu
        case 'refuted': return 'refuted'; // ou la classe CSS pour le rouge
        default: return '';
    }
  };

  useEffect(() => {
    onFilterChange(evidenceState);
  }, [evidenceState, onFilterChange]);

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
          className={`evidence-button ${getButtonClass(evidence)}`}
        >
          {evidence}
        </button>
      ))}

      <button onClick={resetEvidences} className="reset-button">
        Réinitialiser
      </button>
    </div>
  );
}

export default EvidenceFilter;