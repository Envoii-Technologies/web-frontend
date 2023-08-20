import React, { useEffect, useState } from 'react';

import './SearchBar.scss';

export const SearchBar = ({ onSearchSubmit }) => {
    const [term, setTerm] = useState('');

    useEffect(() => {
        if (term !== '') {
            onSearchSubmit(term);
        }
    }, [term, onSearchSubmit]);

    return (
        <div className="Searchbar">
            <input
                className="searchbar-input"
                type="text"
                placeholder="Suchen..."
                onChange={(e) => setTerm(e.target.value)}
                value={term}
            />
        </div>
    );
};
