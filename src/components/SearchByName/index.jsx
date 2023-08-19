import React, { useState } from 'react';
import './SearchByName.css';

function SearchByName({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="search-container">
      <label htmlFor="entity-search" className="search-label">Recherche par nom:</label>
      <input 
        type="text" 
        id="entity-search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Entrez le nom de l'entité..."
        className="search-input"
      />
    </div>
  );
}

export default SearchByName;
