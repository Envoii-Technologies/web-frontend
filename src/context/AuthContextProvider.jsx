import Keycloak from 'keycloak-js';
import { createContext, useEffect, useState, useContext } from 'react';

const defaultAuthContextValues = {
    isAuthenticated: false,
    logout: () => {},
    hasRole: (role) => false,
};

export const AuthContext = createContext(defaultAuthContextValues);

export const AuthContextProvider = ({ children, tenant }) => {
    const [keycloak, setKeycloak] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const keycloak = new Keycloak({
            url: 'http://localhost:28080/auth/',
            realm: tenant,
            clientId: 'local-develop',
        });
        keycloak.init({ onLoad: 'login-required', promiseType: 'native' }).then((authenticated) => {
            setKeycloak(keycloak);

            window.accessToken = keycloak.token;

            setUserToken(keycloak.token);

            setIsAuthenticated(authenticated);
        });
    }, [tenant]);

    const fetchProfile = async () => {
        if (keycloak) {
            const profileData = await keycloak.loadUserProfile();

            setUserData(profileData);
            setUserToken(keycloak.token);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [keycloak]);

    const hasRole = (role) => {
        return keycloak.hasRealmRole(role);
    };

    const logout = () => {
        void keycloak.logout();
    };

    const getToken =  () => 
    {
        if(keycloak) return keycloak.idToken;
        
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                tenant,
                userData,
                userToken,
                getToken,
                logout,
                hasRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
