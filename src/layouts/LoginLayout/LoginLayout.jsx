import { Outlet } from 'react-router-dom';

import './LoginLayout.scss';

export const LoginLayout = () => {
    return (
        <>
            <div className="LoginLayout">
                <Outlet />
            </div>
        </>
    );
};
