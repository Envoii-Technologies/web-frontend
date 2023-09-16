import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDocumentTitle } from '../../hooks';

import { AuthContext } from '../../context/AuthContextProvider';
import { PageContent, PageHeader, LoadingIndicator} from '../../components/';

export const CreateTeam = () =>
{
    useDocumentTitle("Neues Team erstellen");

    const [isLoading, setIsLoading] = useState(true);
    const [teamInfo, setTeamInfo] = useState({
        name: '',
    });
    const [groupList, setGroupList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const handleDeleteGroup = async (id) => {
        axios
            .delete(
                `http://localhost:4001/api/tenants/${authContext.tenant}/groups`,
                {
                    data: { id: id },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    setIsLoading(true);
                    getAllGroups();
                }
            })
            .catch((err) => console.log(err.message));
    };

    const getAllGroups = async () => {
        axios
            .get(
                `http://localhost:4001/api/tenants/${authContext.tenant}/groups`
            )
            .then((res) => {
                setGroupList(res.data.groups);
                setIsLoading(false);
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        getAllGroups();
    }, []);

    const handleCreateNewTeam = (e) => {
        e.preventDefault();

        if (!teamInfo.name) {
            setErrorMessage('');
            setErrorMessage('Team Name muss angegeben werden');
        } else {
            axios
                .post(
                    `http://localhost:4001/api/tenants/${authContext.tenant}/groups`,
                    teamInfo
                )
                .then((res) => {
                    if (res.data.success) {
                        // navigate(-1);
                        getAllGroups();
                    } else if (!res.data.success) {
                        console.log(res.data.error);
                        setErrorMessage('');
                        setErrorMessage(res.data.error.errorMessage);
                    }
                })
                .catch((err) => {
                    console.log('EER', err);
                });
        }
    };

    const handleChangeTeamInfo = (e) => {
        const value = e.target.value;

        setTeamInfo({
            ...teamInfo,
            [e.target.name]: value,
        });
    };

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator full/>;
    } else if (!authContext.hasRole('app_admin')) {
        return <>NO ACCESS</>;
    } else {
        return (
            <>
                <PageHeader title="Teams" helplink="/"/>

                <PageContent>
                {isLoading ? (
                        <LoadingIndicator/>
                    ) : (
                        <>
                            <ul>
                                {groupList.map((group, i) => (
                                    <li key={i}>
                                        - {group.name}{' '}
                                        <button
                                            onClick={(e) =>
                                                handleDeleteGroup(group.id)
                                            }
                                        >
                                            &nbsp;x&nbsp;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <h2>Neues Team erstellen</h2>

                    <form onSubmit={(e) => handleCreateNewTeam(e)}>
                        <label>
                            Name
                            <input
                                type="text"
                                name="name"
                                value={teamInfo.name}
                                onChange={handleChangeTeamInfo}
                            />
                        </label>
                        <br />
                        <input type="submit" value="Speichern" />

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
