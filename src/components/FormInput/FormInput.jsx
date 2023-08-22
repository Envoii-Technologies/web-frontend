import PropTypes from 'prop-types';

import './FormInput.scss';

export const FormInput = ({
    autoFocus,
    type,
    status,
    placeholder,
    metaLabel,
    metaPosition,
    ...props
}) => {
    return (
        <>
            <div className={`FormInput ${status ? status : ''}`}>
                <div className="FormInput__wrapper">
                    {metaLabel && metaPosition === 'left' && (
                        <div className="FormInput__metaLabel">
                            <span>{metaLabel}</span>
                        </div>
                    )}
                    <input
                        autoFocus={autoFocus}
                        className="FormInput__metaInput"
                        type={type}
                        placeholder={placeholder}
                        {...props}
                    />
                    {metaLabel && metaPosition === 'right' && (
                        <div className="FormInput__metaLabel">
                            <span>{metaLabel}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

FormInput.propTypes = {
    autoFocus: PropTypes.bool,
    type: PropTypes.oneOf(['text', 'password']),
    status: PropTypes.oneOf([undefined, 'success', 'error']),
    placeholder: PropTypes.string,
    metaLabel: PropTypes.string,
    metaPosition: PropTypes.oneOf(['left', 'right']),
};

FormInput.defaultProps = {
    autoFocus: false,
    type: 'text',
    status: undefined,
    placeholder: '',
    metaLabel: '',
    metaPosition: 'left',
};
