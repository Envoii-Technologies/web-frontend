import PropTypes from 'prop-types';

import './Button.scss';

export const Button = ({ label, onClick, type, ...props }) => {
    return (
        <>
            <button
                className={`Button ${type}`}
                type="button"
                onClick={onClick}
                {...props}
            >
                <div className="Button__wrapper">
                    <span className="Button__label">{label}</span>
                </div>
            </button>
        </>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["default", "primary", "secondary", "accept", "cancel"]),
};

Button.defaultProps = {
    label: "Default Button",
    onClick: undefined,
    type: "default"
};
