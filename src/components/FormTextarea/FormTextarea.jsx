import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './FormTextarea.scss';

export const FormTextarea = ({
    autoFocus,
    label,
    status,
    placeholder,
    metaLabel,
    metaPosition,
    isResizable,
    ...props
}) => {
    return (
        <>
            <label className='FormTextarea__label' htmlFor={name}>{label}</label>
            <div className={`FormTextarea ${status ? status : ''}`}>
                <div className="FormTextarea__wrapper">
                    {metaLabel && metaPosition === 'left' && (
                        <div className="FormTextarea__metaLabel">
                            <span>{metaLabel}</span>
                        </div>
                    )}
                    <textarea
                        autoFocus={autoFocus}
                        className={`FormTextarea__metaInput ${ isResizable ? 'resizable' : 'unresizable'}`}
                        name={name}
                        id=""
                        rows="4"
                        placeholder={placeholder}
                        {...props}
                    ></textarea>
                    {metaLabel && metaPosition === 'right' && (
                        <div className="FormTextarea__metaLabel right">
                            <span>{metaLabel}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

FormTextarea.propTypes = {
    autoFocus: PropTypes.bool,
    label: PropTypes.string,
    status: PropTypes.oneOf(["", 'success', 'error']),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    metaLabel: PropTypes.string,
    metaPosition: PropTypes.oneOf(['left', 'right']),
    isResizable: PropTypes.bool
};

FormTextarea.defaultProps = {
    autoFocus: false,
    label: undefined,
    status: "",
    placeholder: '',
    metaLabel: '',
    name: '',
    metaPosition: 'left',
    isResizable: false
};
