import { useContext, useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment/locale/de';
import axios from 'axios';

import DataGrid, { SelectColumn } from 'react-data-grid';

import { AuthContext } from '../../context/AuthContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import {
    LoadingIndicator,
    PageContent,
} from '../../components/shared';

import { Button, PageHeader, SearchBar } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCircleXmark,
    faFileSignature,
} from '@fortawesome/free-solid-svg-icons';

import 'react-data-grid/lib/styles.css';

export const Cards = () => {
    const [cardList, setCardList] = useState([]);
    const [oldCardList, setOldCardList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const deleteSelectedCard = async (e, id) => {
        e.preventDefault();
        axios
            .delete(
                `http://localhost:4001/api/tenants/${authContext.tenant}/cards/${id}`
            )
            .then((res) => {
                getAllCards();
            })
            .catch((err) => console.log(err.message));
    };

    const columns = [
        SelectColumn,
        // { key: 'id', name: 'ID' },
        {
            key: 'title',
            name: 'Titel',
            renderCell({ row, onRowChange, tabIndex }) {
                return (
                    <Link to={`/${authContext.tenant}/cards/${row._id}`}>
                        {row.title}
                    </Link>
                );
            },
        },
        { key: '_v', name: 'Version' },
        {
            key: 'updated_at',
            name: 'Bearbeitet',
            renderCell({ row, onRowChange, tabIndex }) {
                return (
                    <>
                        <Moment fromNow locale="de" date={row.updated_at} />
                    </>
                );
            },
        },
        { key: 'creator', name: 'Bearbeitet von' },
        {
            key: 'released',
            name: 'Info',
            renderCell({ row, onRowChange, tabIndex }) {
                return <>{row.released ? 'Online' : 'Entwurf'}</>;
            },
        },
        {
            key: 'action',
            name: 'Aktion',
            renderCell({ row, onRowChange, tabIndex }) {
                return (
                    <>
                        <button>
                            <FontAwesomeIcon icon={faFileSignature} />
                        </button>
                        <button
                            onClick={(e) => deleteSelectedCard(e, row._id)}
                            disabled={row.username === 'admin'}
                        >
                            <FontAwesomeIcon icon={faFileCircleXmark} />
                        </button>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        setCardList(oldCardList);
        setCardList((list) =>
            list.filter((card) => card.title.includes(searchTerm))
        );
    }, [searchTerm]);

    const onSearchSubmit = (term) => {
        if (term.length <= 1) {
            setCardList(oldCardList);
        }
        setSearchTerm(term);
    };

    const getAllCards = async () => {
        axios
            .get(
                `http://localhost:4001/api/tenants/${authContext.tenant}/cards`
            )
            .then((res) => {
                if (res.data.success) {
                    setCardList(res.data.documents);
                    setOldCardList(res.data.documents);
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        getAllCards();
    }, []);

    if (!authContext.isAuthenticated) {
        return <LoadingIndicator />;
    } else if (!authContext.hasRole('app_editor')) {
        return <>NO ACCESS</>;
    } else {
        return (
            <>
                <PageHeader title="Karten">
                    <SearchBar
                        onSearchSubmit={(term) => onSearchSubmit(term)}
                    />
                    <Button
                        label="Neue Karte"
                        type="primary"
                        onClick={() =>
                            navigate(`/${authContext.tenant}/cards/create`)
                        }
                    />
                </PageHeader>

                <PageContent>
                    {isLoading ? (
                        <>...loading</>
                    ) : (
                        <>
                            {cardList.length === 0 ? (
                                <p>Keine Karten vorhanden...</p>
                            ) : (
                                <>
                                    <DataGrid
                                        columns={columns}
                                        rows={cardList.filter(
                                            (user) => user.username !== 'envoii'
                                        )}
                                    />
                                </>
                            )}
                        </>
                    )}
                </PageContent>
            </>
        );
    }
};
