import { Outlet, useParams } from 'react-router-dom';

import { AuthContextProvider } from '../../context/AuthContextProvider';
import { NavBar } from './../../components/tenant';
import { TenantContextProvider } from '../../context/TenantContextProvider';

import './TenantLayout.scss';

export const TenantLayout = () => {
    const { tenant } = useParams();

    return (
        <>
            <div className="TenantLayout">
                <AuthContextProvider tenant={tenant}>
                    <TenantContextProvider tenant={tenant}>
                        <NavBar />
                        <div className="TenantLayout__content">
                            <Outlet />
                        </div>
                    </TenantContextProvider>
                </AuthContextProvider>
            </div>
        </>
    );
};
