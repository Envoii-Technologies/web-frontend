import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Button.scss';

export const Button = ({
    label,
    onClick,
    type,
    size,
    fluid,
    icon,
    ...props
}) => {
    return (
        <>
            <button
                className={`Button ${fluid ? 'fluid' : ''} ${type}`}
                type="button"
                onClick={onClick}
                {...props}
            >
                <div className={`Button__wrapper ${size}`}>
                    {icon && (
                        <div className="Button__icon__wrapper">
                            <FontAwesomeIcon
                                className="Button__icon"
                                icon={icon}
                            />
                        </div>
                    )}
                    {label && <span className="Button__label">{label}</span>}
                </div>
            </button>
        </>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf([
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
    ]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fluid: PropTypes.bool,
};

Button.defaultProps = {
    label: '',
    onClick: undefined,
    type: 'default',
    size: 'medium',
    fluid: true,
    icon: undefined,
};
