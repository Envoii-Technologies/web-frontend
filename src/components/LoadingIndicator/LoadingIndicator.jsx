import PropTypes from 'prop-types';

import './LoadingIndicator.scss';

export const LoadingIndicator = ({ fluid, full }) => {
    return (
        <div className={`LoadingIndicator ${ fluid ? 'fluid' : ''} ${full ? 'full' : '' }`}>
            <div className="LoadingIndicator__spinner"></div>
        </div>
    );
};


LoadingIndicator.propTypes = {
    fluid: PropTypes.bool,
    full: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
    fluid: false,
    full: false,
};
