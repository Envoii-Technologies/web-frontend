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
    isLoading,
    ...props
}) => {
    return (
        <>
            <button
                className={`Button ${fluid ? 'fluid' : ''} ${type} ${ isLoading ? 'loading' : '' }`}
                type="button"
                onClick={onClick}
                {...props}
            >
                <div className={`Button__wrapper ${size}`}>
                   {
                        !isLoading ? (
                            <>
                            {icon && (
                        <div className="Button__icon__wrapper">
                            <FontAwesomeIcon
                                className="Button__icon"
                                icon={icon}
                            />
                        </div>
                    )}
                    {label && <span className="Button__label">{label}</span>}
                            </>
                        ) : (
                            <>
                                <div className="Button__spinner"></div>
                            </>
                        )
                   }
                    
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
    icon: PropTypes.any,
    isLoading: PropTypes.bool,
};

Button.defaultProps = {
    label: '',
    onClick: undefined,
    type: 'default',
    size: 'medium',
    fluid: true,
    icon: undefined,
    isLoading: false,
};
