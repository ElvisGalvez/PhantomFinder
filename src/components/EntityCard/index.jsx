import React from 'react';
import './EntityCard.css';

function EntityCard({ entity, selectedEvidences }) {
    return (
      <div className="entity-card">
        <h2 className="entity-name">{entity.nom}</h2>
        <div className="entity-evidences">
          {entity.preuves.map((preuve, index) => (
            <React.Fragment key={index}>
              <span 
                className={`
                  ${selectedEvidences.includes(preuve) ? 'highlighted-evidence' : ''} 
                  ${(entity.nom === 'Mimic' && preuve === 'Orbe fantomatique') ? 'false-evidence' : ''}
                `}
              >
                {preuve}
              </span>
              {(index !== entity.preuves.length - 1 || entity.nom === 'Mimic') && ' - '}
            </React.Fragment>
          ))}
          {entity.nom === 'Mimic' && <span className="mimic-evidence">Orbe fantomatique</span>}
        </div>
        <ul className="entity-powers">
          {entity.pouvoirs.map((power, index) => (
            <li key={index}>{power}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  

export default EntityCard;
