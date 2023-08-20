import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContextProvider';

export const AdminLayout = () => {
    return (
        <div>
            <AuthContextProvider tenant={'envoii'}>
                <Outlet />
            </AuthContextProvider>
        </div>
    );
};
