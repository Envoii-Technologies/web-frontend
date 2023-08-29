import {
    CenterWrapper,
    HorizontalHeader,
    LoginWindow,
} from '../../components/';

import { useDocumentTitle } from '../../hooks';

export const Login = () =>
{
    useDocumentTitle("Login");
    
    return (
        <>
            <HorizontalHeader />
            <CenterWrapper>
                <LoginWindow />
            </CenterWrapper>
        </>
    );
};
