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
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

CenterWrapper.defaultProps = {
    children: null
};
