import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDocumentTitle } from '../../hooks';

import DataGrid, { SelectColumn } from 'react-data-grid';
import { AuthContext } from '../../context/AuthContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { LoadingIndicator } from '../../components/shared';
import { PageContent, Button, PageHeader } from '../../components';

import 'react-data-grid/lib/styles.css';

export const Users = () =>
{
    useDocumentTitle("Benutzer");

    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([]);

    const navigate = useNavigate();

    const columns = [
        SelectColumn,
        { key: 'username', name: 'Username' },
        { key: 'email', name: 'E-Mail' },
        { key: 'firstname', name: 'Vorname' },
        { key: 'lastname', name: 'Nachname' },
        { key: 'jobtitle', name: 'Berufsbezeichnung' },
        { key: 'personalid', name: 'Personalnummer' },
        {
            key: 'action',
            name: 'Aktion',
            renderCell({ row, onRowChange, tabIndex }) {
                return (
                    <>
                        <button>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                            onClick={(e) => deleteUser(e, row.id)}
                            disabled={row.username === 'admin'}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </>
                );
            },
        },
    ];

    const authContext = useContext(AuthContext);

    const getUsersByTenant = async () => {
        axios
            .get(
                `http://localhost:4001/api/tenants/${authContext.tenant}/users`,
                {
                    headers: {
                        Authorization: `Bearer ${authContext.userToken}`,
                    },
                }
            )
            .then((res) => {
                setUserList(res.data.users);
                setIsLoading(false);
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        getUsersByTenant();
    }, []);

    const deleteUser = async (e, id) => {
        e.preventDefault();

        axios
            .delete(
                `http://localhost:4001/api/tenants/${authContext.tenant}/users`,
                {
                    headers: {
                        Authorization: `Bearer ${authContext.getToken()}`,
                    },
                    data: { id: id },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    setIsLoading(true);
                    getUsersByTenant();
                }
            })
            .catch((err) => console.log(err.message));
    };

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator />;
    } else if (!authContext.hasRole('app_admin')) {
        return <>NO ACCESS</>;
    } else {
        return (
            <>
                <PageHeader title="Benutzer" hasBackground={false} helpLink="/">
                    <Button
                        label="Neuer Benutzer"
                        type="primary"
                        onClick={() =>
                            navigate(`/${authContext.tenant}/settings/users/create`)
                        }
                    />
                </PageHeader>

                <PageContent>
                    {isLoading ? (
                        <>loading...</>
                    ) : (
                        <>
                            <DataGrid
                                columns={columns}
                                rows={userList.filter(
                                    (user) => user.username !== 'envoii'
                                )}
                            />
                        </>
                    )}
                </PageContent>
            </>
        );
    }
};
