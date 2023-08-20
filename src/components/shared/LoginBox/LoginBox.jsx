import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LoginBox.scss';

export const LoginBox = () => {

    const [tenant, setTenant] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();

    const handleTenantCheckIn = async () => {
        if(tenant.length > 0)
        {
            axios.get(import.meta.env.VITE_TENANT_SERVICE_URL + `/${ tenant }`)
        .then(res => 
            {
                if(res.data.success)
                {
                    navigate('/' + tenant);
                }
                else
                {
                    setErrorMessage('Kein Gültiger Kunde.');
                }
            })
            .catch((err) => console.log(err.message));
        }else
        {
            setErrorMessage('Bitte gültigen Kunden eingeben.');
        }
    };

    const handleTenantFocus = () =>
    {
        setErrorMessage('');
        setTenant('');
    }

    const handleTenantChange = (e) =>
    {
        setTenant(e.target.value);
        setErrorMessage('');
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleTenantCheckIn();
        }
    };

    return (
        <div className={`LoginBox`}>
            <header className="LoginBox__header">
                <h2>Login</h2>
            </header>

            {errorMessage && (
                    <div className="LoginBox__form__error">
                        <p className="LoginBox__form__error__message">
                            <span className="LoginBox__form__error__message__icon"></span>
                            <span className="LoginBox__form__error__message__text">{errorMessage}</span>
                            
                        </p>
                    </div>
                )}

            <div className="LoginBox__form">
                <div className="LoginBox__form__text">Unternehmens-Domain eingeben</div>
                <div className="LoginBox__form__adress">
                    <input
                        className={`LoginBox__form__adress__input ${
                            errorMessage ? 'error' : ''
                        }`}
                        autoFocus
                        type="text"
                        onFocus={() => handleTenantFocus()}
                        onChange={(e) => handleTenantChange(e)}
                        value={tenant}
                        onKeyDown={handleKeyDown}
                    />
                    <span className="LoginBox__form__adress__url">
                        <p>.envoii.de</p>
                    </span>
                </div>

                <button
                    className="LoginBox__form__button"
                    onClick={() => handleTenantCheckIn()}
                >
                    Weiter
                </button>
            </div>

            <footer className="LoginBox__footer">
                <p className="LoginBox__footer__info">
                    Noch kein Account? <a href="https://outlook.office365.com/owa/calendar/GetinTouchwithJan@envoii.de/bookings/" target='_blank' rel="noreferrer">Jetzt Termin vereinbaren</a>
                </p>
            </footer>
        </div>
    );
};
