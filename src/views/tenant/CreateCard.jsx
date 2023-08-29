import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { useDocumentTitle } from '../../hooks';

import { AuthContext } from '../../context/AuthContextProvider';
import { LoadingIndicator } from '../../components/shared';
import {
    PageContent,
    Button,
    PageHeader,
    FormError,
    FormInput,
    FormTextarea,
} from '../../components';

export const CreateCard = () => {
    useDocumentTitle("Neue Karte erstellen");

    const [documentInfo, setDocumentInfo] = useState({
        title: '',
        description: '',
    });
    const [errorMessage, setErrorMessage] = useState({ type: '', message: '' });

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCreateCard = (e) => {
        e.preventDefault();

        if (!documentInfo.title) {
            setErrorMessage({ type: '', message: '' });
            setErrorMessage({
                type: 'title',
                message: 'Titel muss angegeben werden',
            });
        } else {
            console.log(documentInfo);
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
                        setErrorMessage({ type: '', message: '' });
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

        setErrorMessage({ type: '', message: '' });

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
                    hasBackground={false}
                    title="Karten"
                    subtitle="Neue Karte"
                    onBack={() => navigate(`/${authContext.tenant}/cards`)}
                    helpLink="/"
                >
                    <Button
                        type="primary"
                        label="Weiter"
                        onClick={(e) => handleCreateCard(e)}
                    />
                </PageHeader>

                <PageContent>
                    {errorMessage?.message && (
                        <FormError
                            type="error"
                            message={errorMessage.message}
                        />
                    )}

                    <FormInput
                        status={errorMessage.type === 'title' ? 'error' : ''}
                        placeholder="Titel*"
                        autoFocus={true}
                        name="title"
                        value={documentInfo.title}
                        onChange={(e) => handleChangeDocumentInfo(e)}
                    />

                    <FormTextarea
                        placeholder="Notizen"
                        name="description"
                        defaultValue={documentInfo.description}
                        onChange={(e) => handleChangeDocumentInfo(e)}
                    />
                </PageContent>
            </>
        );
    }
};
