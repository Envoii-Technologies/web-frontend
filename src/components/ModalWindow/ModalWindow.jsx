import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { Button } from './../';

import './ModalWindow.scss';

export const ModalWindow = ({
    show,
    title,
    body,
    onAccept,
    onCancel,
    acceptText,
    cancelText,
}) => {
    // const handleKeyDown = (e) => {
    //     if (e.keyCode === 27) {
    //         onCancel();
    //     }
    //     if(e.keyCode === 13)
    //     {
    //         onAccept();
    //     }
    // };

    useEffect(() => {
        const handleKeyEvent = (e) => {
            if (e.keyCode === 27) {
                onCancel();
            }
            if (e.keyCode === 13) {
                onAccept();
            }
        };

        window.document.addEventListener('keydown', handleKeyEvent);

        return () => {
            window.document.removeEventListener('keydown', handleKeyEvent);
        };
    }, []);

    if (!show) {
        return null;
    }

    return (
        <>
            <div className="modalWrapper">
                <div className="ModalWindow">
                    <div className="ModalWindow__header">
                        <h4 className="ModalWindow__header__title">
                            {title ? title : 'Default Message'}
                        </h4>
                        <button
                            className="ModalWindow__header__close"
                            onClick={onCancel}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    </div>
                    {body && <div className="ModalWindow__body">{body}</div>}

                    <div className="ModalWindow__footer">
                        <Button
                            type="secondary"
                            label={cancelText}
                            onClick={onCancel}
                        />
                        {onAccept && (
                            <Button
                                type="accept"
                                label={acceptText}
                                onClick={onAccept}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

ModalWindow.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    acceptText: PropTypes.string,
    cancelText: PropTypes.string,
};

ModalWindow.defaultProps = {
    show: false,
    title: 'Default Title',
    body: undefined,
    onAccept: undefined,
    onCancel: undefined,
    acceptText: 'Akzeptieren',
    cancelText: 'Abbrechen',
};
