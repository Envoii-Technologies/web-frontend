import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './ModalWindow.scss';

export const ModalWindow = ({ 
    show, 
    onCancel, 
    onAccept,
    cancelText,
    acceptText,
    title, 
    body,
}) => {
    const [ isShowing, setIsShowing] = useState(show);

    if(!show)
    {
        return null;
    }

    return (
        <>
            <div className="modalWrapper">
                <div className="ModalWindow">
                    <div className="ModalWindow__header">
                        <h4 className="ModalWindow__header__title">
                            {title ? title : "Default Message"}
                        </h4>
                        <button className="ModalWindow__header__close" onClick={onCancel}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    </div>
                    {
                        body && <div className="ModalWindow__body">{ body }</div>
                    }
                    
                    <div className="ModalWindow__footer">
                        {
                            onAccept && <button className='success' onClick={onAccept}>{ acceptText ? acceptText : 'Accept'}</button>
                        }
                        <button className='error' onClick={onCancel}>{ cancelText ? cancelText : 'Cancel'}</button>
                    </div>
                </div>
            </div>
        </>
    );
};
