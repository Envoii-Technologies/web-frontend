import PropTypes from 'prop-types';

import './FormButton.scss';

export const FormButton = ({ label, onClick, type, ...props }) => {
    return (
        <>
            <button
                className={`FormButton ${ type }`}
                type="button"
                onClick={onClick}
                {...props}
            >
                <div className="FormButton__wrapper">
                    <span className='FormButton__label'>{ label }</span>
                </div>
            </button>
        </>
    )
}

FormButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["default", "accept", "cancel"]),
};

FormButton.defaultProps = {
    label: "Default Button",
    onClick: undefined,
    type: "default"
};