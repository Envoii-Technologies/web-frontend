import { lazy, Suspense, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CurrencyContext } from 'sharedApp/CurrencyContextProvider';
import { DarkModeContext } from 'sharedApp/DarkModeContextProvider';

const RemoteComponent = lazy(() => import('dashboardApp/DashboardComponent'));

export const Login = () => {
    const [tenant, setTenant] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const currency = useContext(CurrencyContext);

    const tenants = ['envoii', 'amazon', 'test'];

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
                style={{
                    background: darkMode ? 'black' : 'white',
                    color: darkMode ? 'white' : 'black',
                }}
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
                <p>{currency}</p>
                <br />
                {errorMessage && <div>{errorMessage}</div>}
                <button onClick={toggleDarkMode}>Toggle DarkMode</button>
                <Suspense fallback={<div>Loading Remote Component...</div>}>
                    <RemoteComponent />
                </Suspense>
            </div>
        </>
    );
};
