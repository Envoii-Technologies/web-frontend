import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FormError, FormInput, FormButton } from '../';

import { useDocumentTitle } from './../../hooks';

import './LoginWindow.scss';

export const LoginWindow = () => {
    const [tenant, setTenant] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useDocumentTitle('Mitarbeiter Login');

    const navigate = useNavigate();

    const handleTenantCheckIn = () => {
        if (tenant.length > 0) {
            axios
                .get(import.meta.env.VITE_TENANT_SERVICE_URL + `/${tenant}`)
                .then((res) => {

                    const { success, tenant } = res.data;

                    if (success) {
                        navigate('/' + tenant);
                    } else {
                        setErrorMessage('Kein Gültiger Kunde.');
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                    setErrorMessage('Kunde existiert nicht.');
                });
        } else {
            setErrorMessage('Bitte gültigen Kunden eingeben.');
        }
    };
    
    const resetErrorMessage = () =>
    {
        setErrorMessage('');
    }

    const handleTenantFocus = () => {
        resetErrorMessage();
        setTenant('');
    };

    const handleTenantChange = (e) => {
        resetErrorMessage();
        setTenant(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleTenantCheckIn();
        }
    };

    return (
        <>
            <div className="LoginWindow">
                <header className="LoginWindow__header">
                    Mitarbeiter Login
                </header>

                {errorMessage && (
                    <FormError type="error" message={errorMessage} />
                )}

                <FormInput
                    autoFocus
                    type="text"
                    placeholder="Ihr Unternehmensname"
                    metaLabel=".envoii.de"
                    metaPosition="right"
                    onFocus={() => handleTenantFocus()}
                    onChange={(e) => handleTenantChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />

                <FormButton
                    label="Weiter"
                    onClick={() => handleTenantCheckIn()}
                />

                <footer className="LoginWindow__footer">
                    <p className="LoginWindow__footer__info">
                        Noch kein Account?{' '}
                        <a
                            href={import.meta.env.VITE_BOOKING_URL}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Jetzt Termin vereinbaren
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
};