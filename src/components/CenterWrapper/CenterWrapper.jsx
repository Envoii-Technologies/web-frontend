import PropTypes from "prop-types";

import './CenterWrapper.scss';

export const CenterWrapper = ({ children }) => {
    return(
        <>
            <div className="CenterWrapper">
                { children }
            </div>
        </>
    )
}

CenterWrapper.propTypes = {
    children: PropTypes.element
};

CenterWrapper.defaultProps = {
    children: null
};
