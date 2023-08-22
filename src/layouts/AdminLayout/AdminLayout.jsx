import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContextProvider';

export const AdminLayout = () => {
    return (
        <>
            <div className="AdminLayout">
                <AuthContextProvider tenant={'envoii'}>
                    <Outlet />
                </AuthContextProvider>
            </div>
        </>
    );
};
