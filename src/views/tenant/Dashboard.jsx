import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { PageContent, PageHeader,LoadingIndicator } from '../../components/';

import { useDocumentTitle } from '../../hooks';

export const Dashboard = () =>
{
    useDocumentTitle("Dashboard");
    const authContext = useContext(AuthContext);

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator full/>;
    } else {
        return (
            <>
                <PageHeader title="Dashboard" hasBackground={false} helpLink="/"/>

                <PageContent>
                    Dashboard inhalt...
                </PageContent>
            </>
        );
    }
};
