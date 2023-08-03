import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Keycloak from 'keycloak-js';

export default function Resources() {
    const [keycloak, setKeycloak] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    const { tenant } = useParams();

    useEffect(() => {
        const keycloak = new Keycloak({
            url: 'http://localhost:28080/auth/',
            realm: tenant,
            clientId: 'local-develop',
        });
        keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
            setKeycloak(keycloak);

            setAuthenticated(authenticated);
        });
    }, []); 

    useEffect(() => {
        const fetchProfile = async () => {
            if (keycloak) {
                const profileData = await keycloak.loadUserProfile();

                console.log(profileData);

                setUserData(profileData);
            }
        };

        fetchProfile();
    }, [keycloak]);

    if (keycloak) {
        if (authenticated)
            return (
                <div className="my-12 grid place-items-center">
                    <p>
                        {' '}
                        You are logged in @ <b>{keycloak.realm}</b>
                    </p>

                    <br />

                    {userData && (
                        <>
                            <h2>User Info</h2>

                            <p>Username: {userData.username}</p>
                            <p>E-Mail: {userData.email}</p>
                        </>
                    )}

                    <br />

                    <>
                        <h2>User Roles</h2>

                        <ul>
                            {keycloak.hasRealmRole('app_intern') && (
                                <li>app_intern</li>
                            )}
                            {keycloak.hasRealmRole('app_admin') && (
                                <li>app_admin</li>
                            )}
                            {keycloak.hasRealmRole('app_manager') && (
                                <li>app_manager</li>
                            )}
                            {keycloak.hasRealmRole('app_editor') && (
                                <li>app_editor</li>
                            )}
                            {keycloak.hasRealmRole('app_user') && (
                                <li>app_user</li>
                            )}
                        </ul>
                    </>

                    <br />

                    <button onClick={() => keycloak.logout()}>Logout</button>
                </div>
            );
        else return <div className="my-12">Unable to initiate auth!</div>;
    }

    return (
        <>
            <div className="my-12">Keycloak initializing in a moment...</div>
        </>
    );
}
