import PropTypes from 'prop-types';

import './FormInput.scss';

export const FormInput = ({
    autoFocus,
    label,
    type,
    status,
    placeholder,
    metaLabel,
    metaPosition,
    name,
    ...props
}) => {
    return (
        <>
            <label className='FormInput__label' htmlFor={name}>{label}</label>
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
                        name={name}
                        placeholder={placeholder ? placeholder : label}
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
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    status: PropTypes.oneOf(["", 'success', 'error']),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    metaLabel: PropTypes.string,
    metaPosition: PropTypes.oneOf(['left', 'right']),
};

FormInput.defaultProps = {
    autoFocus: false,
    label: undefined,
    type: 'text',
    status: "",
    name: '',
    placeholder: '',
    metaLabel: '',
    metaPosition: 'left',
};
