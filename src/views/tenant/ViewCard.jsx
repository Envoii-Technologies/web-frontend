import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useDocumentTitle } from '../../hooks';

import { AuthContext } from '../../context/AuthContextProvider';
import {
    PageContent,
    Button,
    PageHeader,
    LoadingIndicator,
} from '../../components';
import { CardEditor } from '../../components/';
import { CardEditorContextProvider } from '../../context/CardEditorContextProvider';

export const ViewCard = () => {
    useDocumentTitle('Kartendetails');

    const [isLoading, setIsLoading] = useState(true);
    const [cardInfo, setCardInfo] = useState([]);

    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    const { id } = useParams();

    // const getCardInfo = async () => {
    //     axios
    //         .get(
    //             `http://localhost:4001/api/tenants/${authContext.tenant}/cards/${id}`
    //         )
    //         .then((res) => {
    //             setCardInfo(res.data.card);

    //             if(res.data.card) document.title = res.data.card.title;

    //             setIsLoading(false);
    //         })
    //         .catch((err) => console.log(err.message));
    // };

    // useEffect(() => {
    //     getCardInfo();
    // }, []);

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator full />;
    } else if (authContext.hasRole('app_editor')) {
        return (
            <>
                <CardEditorContextProvider>
                    <CardEditor cardId={id} tenant={authContext.tenant} />
                    {/* <PageHeader
                        hasBackground
                        title="Karten"
                        subtitle={cardInfo.title}
                        onBack={() => navigate(`/${authContext.tenant}/cards`)}
                        helpLink="/"
                    >
                        <Button type="primary" label="Speichern" />
                    </PageHeader>

                    <PageContent hasWrapper={false}>
                        {isLoading ? (
                            <>loading...</>
                        ) : (
                            <>ok</>
                            //     <CardEditor card={cardInfo} tenant={authContext.tenant} />
                        )}
                    </PageContent> */}
                    
                </CardEditorContextProvider>
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
                    helplink="/"
                />

                <PageContent>{isLoading ? <>loading...</> : <></>}</PageContent>
            </>
        );
    }
};
