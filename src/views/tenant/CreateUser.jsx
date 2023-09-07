import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

// import useAxios from 'axios-hooks';

import { useDocumentTitle } from '../../hooks';

import { AuthContext } from '../../context/AuthContextProvider';
import generateInitPassword from '../../helpers/generateInitPassword';
import {
    PageContent,
    Button,
    FormError,
    FormInput,
    PageHeader,
    LoadingIndicator,
} from '../../components';

export const CreateUser = () => {
    useDocumentTitle('Neuen Benutzer erstellen');

    const [checkBoxAmount, setCheckBoxAmount] = useState(1);
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        jobtitle: '',
        password: generateInitPassword(),
        personalId: '',
        roles: {
            admin: false,
            manager: false,
            editor: false,
            user: true,
        },
    });

    const [errorMessage, setErrorMessage] = useState({ type: '', mesage: '' });

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    // const [{ data, loading, error }, fetchData] = useAxios({
    //     url: `http://localhost:4001/api/tenants/${authContext.tenant}/users`,
    //     method: 'POST',
    //     data: userInfo,
    // });

    useEffect(() => {
        console.log(checkBoxAmount);
    }, [checkBoxAmount]);

    const handleChangeRole = (e) => {
        if (e.target.checked) {
            setCheckBoxAmount((amount) => amount + 1);
        } else {
            setCheckBoxAmount((amount) => amount - 1);
        }
        setUserInfo({
            ...userInfo,
            roles: {
                ...userInfo.roles,
                [e.target.name]: e.target.checked,
            },
        });
    };

    const handleChangeUserInfo = (e) => {
        const value = e.target.value;
        setErrorMessage({ type: '', message: '' });

        setUserInfo({
            ...userInfo,
            [e.target.name]: value,
        });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();

        if (!userInfo.username) {
            setErrorMessage({ type: '', message: '' });
            setErrorMessage({
                type: 'username',
                message: 'Username muss angegeben werden',
            });
        } else if (!userInfo.email) {
            setErrorMessage({ type: '', message: '' });
            setErrorMessage({
                type: 'email',
                message: 'E-Mail muss angegeben werden',
            });
        } else if (checkBoxAmount < 1) {
            setErrorMessage({ type: '', message: '' });
            // setErrorMessage('Ein Benutzer benötigt mindestens eine Rolle');
        } else {
            // const fetch = await fetchData()
            //     .then((doc) => console.log(doc))
            //     .catch((err) => {
            //         if (err.response.status === 409) {
            //             setErrorMessage({ type: '', message: '' });
            //             setErrorMessage({
            //                 type: 'exists',
            //                 message:
            //                     'Eine Benutzer mit diesem Namen oder E-Mail existiert bereits',
            //             });
            //         }
            //     });

            axios
                .post(
                    `http://localhost:4001/api/tenants/${authContext.tenant}/users`,
                    userInfo,
                )
            .then((res) => {
                if (res.data.success) {
                    navigate(`/${authContext.tenant}/settings/users`);
                } else if (!res.data.success) {
                    console.log(res.data.error);
                    setErrorMessage({ type: '', message: '' });
                    setErrorMessage({
                        type: 'any',
                        message: res.data.error.errorMessage,
                    });
                }
            })
            .catch((err) => {
                if (err.response.status === 409) {
                    setErrorMessage({ type: '', message: '' });
                    setErrorMessage({
                        type: 'exists',
                        message:
                            'Eine Benutzer mit diesem Namen oder E-Mail existiert bereits',
                    });
                }
            });
        }
    };

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator full />;
    } else if (!authContext.hasRole('app_admin')) {
        return <>NO ACCESS</>;
    } else {
        return (
            <>
                <PageHeader
                    title="Benutzer"
                    subtitle="Neuer Benutzer"
                    onBack={() =>
                        navigate(`/${authContext.tenant}/settings/users`)
                    }
                    hasBackground={false}
                    helpLink="/"
                >
                    <Button
                        type="primary"
                        label="Speichern"
                        onClick={(e) => handleCreateUser(e)}
                        helpLink="/"
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
                        status={
                            errorMessage.type === 'username' ||
                            errorMessage.type === 'exists'
                                ? 'error'
                                : ''
                        }
                        label="Benutzername"
                        placeholder="Geben Sie einen Benutzernamen ein"
                        name="username"
                        value={userInfo.username}
                        onChange={handleChangeUserInfo}
                    />

                    <FormInput
                        status={
                            errorMessage.type === 'email' ||
                            errorMessage.type === 'exists'
                                ? 'error'
                                : ''
                        }
                        label="E-Mail"
                        placeholder="Geben Sie eine E-Mail Adresse ein"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChangeUserInfo}
                    />

                    <FormInput
                        label="Vorname"
                        // placeholder="Geben Sie einen Benutzernamen ein"
                        name="firstname"
                        value={userInfo.firstname}
                        onChange={handleChangeUserInfo}
                    />

                    <FormInput
                        label="Nachname"
                        // placeholder="Geben Sie einen Benutzernamen ein"
                        name="lastname"
                        value={userInfo.lastname}
                        onChange={handleChangeUserInfo}
                    />

                    <FormInput
                        label="Berufsbezeichnung"
                        // placeholder="Geben Sie einen Benutzernamen ein"
                        name="jobtitle"
                        value={userInfo.jobtitle}
                        onChange={handleChangeUserInfo}
                    />

                    <FormInput
                        label="Personalnummer"
                        // placeholder="Geben Sie einen Benutzernamen ein"
                        name="personalId"
                        value={userInfo.personalId}
                        onChange={handleChangeUserInfo}
                    />

                    <FormInput
                        label="Passwort"
                        // placeholder="Geben Sie einen Benutzernamen ein"
                        name="password"
                        value={userInfo.password}
                        onChange={handleChangeUserInfo}
                    />

                    <label>
                        Rollen
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleChangeRole(e)}
                                name="admin"
                            />{' '}
                            Admin <br />
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleChangeRole(e)}
                                name="manager"
                            />{' '}
                            Manager <br />
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleChangeRole(e)}
                                name="editor"
                            />{' '}
                            Editor <br />
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleChangeRole(e)}
                                name="user"
                                defaultChecked={true}
                            />{' '}
                            Benutzer <br />
                        </label>
                    </label>
                </PageContent>
            </>
        );
    }
};
