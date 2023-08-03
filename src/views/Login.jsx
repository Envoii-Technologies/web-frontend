import { lazy, Suspense, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const tenants = ['wkw', 'sicacorp' ];

export const Login = () => {
    const [tenant, setTenant] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleTenantCheck = () => {
        if (tenants.includes(tenant)) {
            navigate(`/${tenant}`);
        } else {
            setErrorMessage(
                'Das gesuchte Unternehmen ist kein registrierter Kunde'
            );
        }
    };

    return (
        <>
            <div
            >
                <input
                    type="text"
                    placeholder="Ihr Unternehmen"
                    onChange={(e) => setTenant(e.target.value)}
                />
                .envoii.de
                <br />
                <button
                    onClick={() => handleTenantCheck()}
                    disabled={tenant.length < 1}
                >
                    Weiter
                </button>
                <br />
                {errorMessage && <div>{errorMessage}</div>}
               
            </div>
        </>
    );
};
