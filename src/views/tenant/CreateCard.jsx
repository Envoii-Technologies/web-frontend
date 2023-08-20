import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContextProvider';
import {
    LoadingIndicator,
    PageContent,
    PageHeader,
} from '../../components/shared';

export const CreateCard = () => {
    const [documentInfo, setDocumentInfo] = useState({
        title: '',
        description: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCreateCard = (e) => {
        e.preventDefault();

        if (!documentInfo.title) {
            setErrorMessage('');
            setErrorMessage('Titel muss angegeben werden');
        } else {
            axios
                .post(
                    `http://localhost:4001/api/tenants/${authContext.tenant}/cards`,
                    {
                        title: documentInfo.title,
                        creator: authContext.userData?.id,
                        description: documentInfo.description,
                    }
                )
                .then((res) => {
                    if (res.data.success) {
                        navigate(
                            `/${authContext.tenant}/cards/${res.data.data._id}`
                        );
                    } else if (!res.data.success) {
                        console.log(res.data);
                        setErrorMessage('');
                        // setErrorMessage(res.data.error.errorMessage);
                    }
                })
                .catch((err) => {
                    console.log('EER', err);
                });
        }
    };

    const handleChangeDocumentInfo = (e) => {
        const value = e.target.value;

        setDocumentInfo({
            ...documentInfo,
            [e.target.name]: value,
        });
    };

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator />;
    } else if (!authContext.hasRole('app_editor')) {
        return <>NO ACCESS</>;
    } else {
        return (
            <>
                <PageHeader
                    title="Karten"
                    subtitle="Neue Karte"
                    onAction={(e) => handleCreateCard(e)}
                    onActionTitle="Speichern"
                    onCancel={() => navigate(`/${authContext.tenant}/cards`)}
                    onCancelTitle="Zurück"
                />

                <PageContent>
                    <form>
                        <label>
                            Titel
                            <br />
                            <input
                                type="text"
                                name="title"
                                value={documentInfo.title}
                                onChange={(e) => handleChangeDocumentInfo(e)}
                            />
                        </label>

                        <br />
                        <br />

                        <label>
                            Notizen
                            <br />
                            <textarea
                                name="description" 
                                rows={4} cols={40}
                                defaultValue={documentInfo.description}
                                onChange={(e) => handleChangeDocumentInfo(e)}
                                />
                        </label>

                        <br />
                        <br />

                        {errorMessage && (
                            <div className="">
                                <p className="">{errorMessage}</p>
                            </div>
                        )}
                    </form>
                </PageContent>
            </>
        );
    }
};
