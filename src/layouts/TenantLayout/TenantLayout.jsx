import { Outlet, useParams } from 'react-router-dom';

import { AuthContextProvider, TenantContextProvider } from '../../context';

export const TenantLayout = () => {
    const { tenant } = useParams();

    return (
        <>
            <div className="TenantLayout">
                <AuthContextProvider tenant={tenant}>
                    <TenantContextProvider tenant={tenant}>
                        <Outlet />
                    </TenantContextProvider>
                </AuthContextProvider>
            </div>
        </>
    );
};
