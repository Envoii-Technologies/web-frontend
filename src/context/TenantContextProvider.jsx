import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const defaultTenantContextValues = {
    tenant: {
        name: '',
        title: '',
    },
};

export const TenantContext = createContext(defaultTenantContextValues);

export const TenantContextProvider = ({ children, tenant }) => {
    const [currentTenant, setCurrentTenant] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTenantInfo = async () => {
            axios
                .get(import.meta.env.VITE_TENANT_SERVICE_URL + `/${tenant}`)
                .then((res) => {
                const { name, title } = res.data.tenant;

                    setCurrentTenant({ name, title });
                    setIsLoading(false);
                });
        };

        getTenantInfo();
    }, []);

    return (
        <TenantContext.Provider
            value={{
                tenant: currentTenant,
                isLoading,
            }}
        >
            {children}
        </TenantContext.Provider>
    );
};
