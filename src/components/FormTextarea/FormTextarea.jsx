import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './FormTextarea.scss';

export const FormTextarea = ({
    autoFocus,
    status,
    placeholder,
    metaLabel,
    metaPosition,
    isResizable,
    ...props
}) => {
    return (
        <>
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
                        name=""
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
    status: PropTypes.oneOf(["", 'success', 'error']),
    placeholder: PropTypes.string,
    metaLabel: PropTypes.string,
    metaPosition: PropTypes.oneOf(['left', 'right']),
    isResizable: PropTypes.bool
};

FormTextarea.defaultProps = {
    autoFocus: false,
    status: "",
    placeholder: '',
    metaLabel: '',
    metaPosition: 'left',
    isResizable: false
};
