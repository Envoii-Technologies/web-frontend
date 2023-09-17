import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const defaultTenantContextValues = {
    tenant: {
        name: '',
        title: '',
    },
};

export const TenantContext = createContext(defaultTenantContextValues);

export const TenantContextProvider = ({ children, tenant }) => {
    const [currentTenant, setCurrentTenant] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTenantInfo = async () => {
            axios
                .get(`/api/tenant/${tenant}`)
                .then((res) => {
                    const { name, title } = res.data.tenant;

                    setCurrentTenant({ name, title });
                    setIsLoading(false);
                }).catch((err) => {
                    setErrorMessage(err);
                });
        };

        getTenantInfo();
    }, []);

    return (
        <TenantContext.Provider
            value={{
                tenant: currentTenant,
                isLoading,
                errorMessage,
            }}
        >
            {children}
        </TenantContext.Provider>
    );
};
