import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContextProvider';
import {
    LoadingIndicator,
    PageContent,
} from '../../components/shared';
import { Button, PageHeader } from '../../components';
import { CardEditor } from '../../components/tenant/CardEditor/CardEditor';
import { CardEditorContextProvider } from '../../context/CardEditorContext';

export const ViewCard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cardInfo, setCardInfo] = useState([]);

    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    const { id } = useParams();

    const getCardInfo = async () => {
        axios
            .get(
                `http://localhost:4001/api/tenants/${authContext.tenant}/cards/${id}`
            )
            .then((res) => {
                setCardInfo(res.data.card);
                setIsLoading(false);
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        getCardInfo();
    }, []);

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator />;
    } else if (authContext.hasRole('app_editor')) {
        return (
            <>
                <PageHeader hasBackground title="Karten" subtitle={cardInfo.title} onBack={() => navigate(`/${authContext.tenant}/cards`)}>
                        <Button label="Zurück" onClick={() => navigate(`/${authContext.tenant}/cards`)}/>
                        <Button type="primary" label="Speichern"/>
                </PageHeader>

                <PageContent hasWrapper={false}>
                    {isLoading ? (
                        <>loading...</>
                    ) : (
                        <CardEditorContextProvider>
                            <CardEditor card={cardInfo} />
                        </CardEditorContextProvider>
                    )}
                </PageContent>
            </>
        );
    } else if (authContext.hasRole('app_user')) {
        return (
            <>
                <PageHeader
                    title="Karten"
                    subtitle={cardInfo.title}
                    onCancel={() => navigate(`/${authContext.tenant}/cards`)}
                    onCancelTitle="Zurück"
                />

                <PageContent>{isLoading ? <>loading...</> : <></>}</PageContent>
            </>
        );
    }
};
