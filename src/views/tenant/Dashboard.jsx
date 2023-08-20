import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { LoadingIndicator, PageContent, PageHeader } from '../../components/shared';

export const Dashboard = () => {
    const authContext = useContext(AuthContext);

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator/>
    } else {
        return (
            <>
                <PageHeader title="Dashboard"/>

                <PageContent>
                    Dashboard inhalt...
                </PageContent>
            </>
        );
    }
};
