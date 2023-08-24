import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';


import './SearchBar.scss';

export const SearchBar = ({ onSearchSubmit }) => {
    const [term, setTerm] = useState('');

    useEffect(() => {
        if (term !== '') {
            onSearchSubmit(term);
        }
    }, [term, onSearchSubmit]);

    return (
        <div className="SearchBar">
            <span className="SearchBar__icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
                className="SearchBar__input"
                type="text"
                placeholder="Suchen..."
                onChange={(e) => setTerm(e.target.value)}
                value={term}
            />
        </div>
    );
};

SearchBar.propTypes = {
    onSearchSubmit: PropTypes.func,
};

SearchBar.defaultProps = {
    onSearchSubmit: undefined,
};
