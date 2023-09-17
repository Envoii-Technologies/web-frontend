import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FormError, FormInput, Button } from '../';

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
                .get(`/api/tenant/${tenant}`)
                .then((res) => {
                    const { tenant } = res.data;

                    if (tenant !== null) {
                        navigate('/' + tenant.name);
                    } else {
                        setErrorMessage('Kein Gültiges Unternehmen.');
                    }
                })
                .catch((err) => {
                    setErrorMessage('Unternehmen existiert nicht.');
                });
        } else {
            setErrorMessage('Bitte gültiges Unternehmen eingeben.');
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
                    placeholder="Ihre Unternehmens-Domain"
                    metaLabel=".envoii.de"
                    metaPosition="right"
                    onFocus={() => handleTenantFocus()}
                    onChange={(e) => handleTenantChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />

                <br />

                <Button
                    label="Weiter"
                    type="primary"
                    size="large"
                    onClick={() => handleTenantCheckIn()}
                />

                <br />

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

LoginWindow.propTypes = {}
LoginWindow.defaultProps = {}
