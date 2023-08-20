import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContextProvider';
import generateInitPassword from '../../helpers/generateInitPassword';
import { LoadingIndicator, PageContent, PageHeader } from '../../components/shared';

export const CreateUser = () => {
    const [checkBoxAmount, setCheckBoxAmount ] = useState(1);
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

    const [errorMessage, setErrorMessage] = useState('');

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(checkBoxAmount);
    }, [checkBoxAmount])

    const handleChangeRole = (e) =>
    {
        if(e.target.checked)
        {
            setCheckBoxAmount(amount => amount + 1);
        }
        else
        {
            setCheckBoxAmount(amount => amount - 1);
        }
        setUserInfo({
            ...userInfo,
            roles: {
                ...userInfo.roles,
                [e.target.name]: e.target.checked
            }
        });
    }

    const handleChangeUserInfo = (e) => {
        const value = e.target.value;

        setUserInfo({
            ...userInfo,
            [e.target.name]: value,
        });
    };

    const handleCreateUser = (e) => {
        e.preventDefault();

        if (!userInfo.username) {
            setErrorMessage('');
            setErrorMessage('Username muss angegeben werden');
        } else if (!userInfo.email) {
            setErrorMessage('');
            setErrorMessage('E-Mail muss angegeben werden');
        } else if (checkBoxAmount < 1)
        {
            setErrorMessage('');
            setErrorMessage('Ein Benutzer benötigt mindestens eine Rolle');
        } else {
            axios
                .post(`http://localhost:4001/api/tenants/${authContext.tenant}/users`, userInfo)
                .then((res) => {
                    if (res.data.success) {
                        navigate(`/${authContext.tenant}/settings/users`);
                    } else if (!res.data.success) {
                        console.log(res.data.error);
                        setErrorMessage('');
                        setErrorMessage(res.data.error.errorMessage);
                    }
                })
                .catch((err) => {
                    if(err.response.status === 409)
                    {
                        setErrorMessage('');
                        setErrorMessage("Eine Benutzer mit diesem Namen oder E-Mail existiert bereits");
                    }
                });
        }
    };

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator/>
    }
    else if(!authContext.hasRole("app_admin"))
    {
        return <>NO ACCESS</>
    }
    else {
        return (
            <>
                <PageHeader
                    title="Benutzer"
                    subtitle="Neuen Benutzer erstellen"
                    onAction={(e) => handleCreateUser(e)}
                    onActionTitle="Speichern"
                    onCancel={() => navigate(`/${authContext.tenant}/settings/users`)}
                    onCancelTitle="Zurück"
                />

                <PageContent>
                {/* <form onSubmit={(e) => handleCreateUser(e)}> */}
                <form>
                    <label>
                        username
                        <input
                            type="text"
                            name="username"
                            value={userInfo.username}
                            onChange={handleChangeUserInfo}
                        />
                    </label>
                    <br />
                    <label>
                        email
                        <input
                            type="text"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChangeUserInfo}
                        />
                    </label>
                    <br />
                    <label>
                        firstname
                        <input
                            type="text"
                            name="firstname"
                            value={userInfo.firstname}
                            onChange={handleChangeUserInfo}
                        />
                    </label>
                    <br />
                    <label>
                        lastname
                        <input
                            type="text"
                            name="lastname"
                            value={userInfo.lastname}
                            onChange={handleChangeUserInfo}
                        />
                    </label>
                    <br />
                    <label>
                        jobtitle
                        <input
                            type="text"
                            name="jobtitle"
                            value={userInfo.jobtitle}
                            onChange={handleChangeUserInfo}
                        />
                    </label>
                    <br />
                    <label>
                        password
                        <input
                            type="text"
                            name="password"
                            value={userInfo.password}
                            onChange={handleChangeUserInfo}
                        />
                    </label>
                    <br />
                    <label>
                        personalId
                        <input
                            type="text"
                            name="personalId"
                            value={userInfo.personalId}
                            onChange={handleChangeUserInfo}
                        />
                    </label>
                    <br />
                    <label>
                        roles
                        <br />
                        <label>
                            <input type="checkbox" onChange={(e) => handleChangeRole(e)} name="admin"/> Admin <br />
                        </label>
                        <label>
                            <input type="checkbox" onChange={(e) => handleChangeRole(e)} name="manager"/> Manager <br />
                        </label>
                        <label>
                            <input type="checkbox" onChange={(e) => handleChangeRole(e)} name="editor"/> Editor <br />
                        </label>
                        <label>
                            <input type="checkbox" onChange={(e) => handleChangeRole(e)} name="user" defaultChecked={true}/> Benutzer <br />
                        </label>
                    </label>
                    <br />
                    {/* <button onClick={(e) => handleCreateUser(e)}>Speichern</button> */}
                </form>

                {errorMessage && (
                    <div className="">
                        <p className="">{errorMessage}</p>
                    </div>
                )}

                <br />
                {/* <button onClick={() => navigate(`/${authContext.tenant}/settings/users`)}>Zurück</button> */}
                </PageContent>
            </>
        );
    }
};
