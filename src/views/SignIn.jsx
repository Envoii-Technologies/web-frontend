import { CenterWrapper, HorizontalHeader, LoginWindow } from '../components';
import { useDocumentTitle } from '../hooks';

export const SignIn = () => {
    useDocumentTitle('Mitarbeiter Login');

    return (
        <>
            <div className="SignIn">
                <HorizontalHeader />

                <CenterWrapper>
                    <LoginWindow />
                </CenterWrapper>
            </div>
        </>
    );
};
