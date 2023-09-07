import { useContext, useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment/locale/de';
import axios from 'axios';

import DataGrid, { SelectColumn } from 'react-data-grid';

import { AuthContext } from '../../context/AuthContextProvider';
import { Link, useNavigate } from 'react-router-dom';

import { useDocumentTitle } from '../../hooks';

import {
    PageContent,
    Button,
    PageHeader,
    SearchBar,
    Table,
    LoadingIndicator,
    PopOver,
} from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCircleXmark,
    faFileSignature,
    faCircleQuestion,
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

import 'react-data-grid/lib/styles.css';

export const Cards = () => {
    useDocumentTitle('Karten');

    const [cardList, setCardList] = useState([]);
    const [oldCardList, setOldCardList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const markCardAsDeleted = async (e, id) => {
        e.preventDefault();
        axios
            .put(
                `http://localhost:4001/api/tenants/${authContext.tenant}/cards/${id}/status`
            )
            .then((res) => {
                getAllCards();
            })
            .catch((err) => console.log(err.message));
    };

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
                return <>{!row.deleted ? <>
                <Link
                        className="dataTable__row__cell__link"
                        to={`/${authContext.tenant}/cards/${row._id}`}
                    >
                        <>{row.title}</>
                        
                    </Link>
                </> : <>
                <s>{row.title}</s>
                </>}</>;
            },
        },
        { key: '__v', name: 'Version' },
        {
            key: 'updated_at',
            name: 'Bearbeitet',
            cellClass: 'dataTable__row__cell',
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
            cellClass: 'dataTable__row__cell',
            renderCell({ row, onRowChange, tabIndex }) {
                // return <>{row.released ? <span className=''></span> : <span className='dataTable__row__cell__info__cirle'></span>}</>;
                return (
                    <>
                        <div className="dataTable__row__cell__info__wrapper">
                            <span
                                className={`dataTable__row__cell__info__circle ${
                                    row.deleted
                                        ? 'deleted'
                                        : row.released
                                        ? 'released'
                                        : 'unreleased'
                                }`}
                            ></span>
                        </div>
                    </>
                );
            },
        },
        {
            key: 'action',
            name: 'Aktion',
            cellClass: 'dataTable__row__cell',
            renderCell({ row, onRowChange, tabIndex }) {
                return (
                    <div className="dataTable__row__cell__info__wrapper">
                        <PopOver
                            options={[
                                {
                                    label: 'Editieren',
                                    type: 'secondary',
                                    action: () =>
                                        navigate(
                                            `/${authContext.tenant}/cards/${row._id}`
                                        ),
                                },
                                {
                                    label: 'Löschen',
                                    type: 'secondary',
                                    action: (e) =>
                                        markCardAsDeleted(e, row._id),
                                },
                            ]}
                        >
                            <Button
                                fluid={false}
                                type="secondary"
                                size="small"
                                icon={faEllipsisVertical}
                            />
                        </PopOver>
                    </div>
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
        return <LoadingIndicator full />;
    } else if (!authContext.hasRole('app_editor')) {
        return <>NO ACCESS</>;
    } else {
        return (
            <>
                <PageHeader title="Karten" hasBackground={false} helpLink="/">
                    <SearchBar
                        onSearchSubmit={(term) => onSearchSubmit(term)}
                    />
                    <Button
                        isLoading={isLoading}
                        label="Neue Karte"
                        type="primary"
                        onClick={() =>
                            navigate(`/${authContext.tenant}/cards/create`)
                        }
                    />
                </PageHeader>

                <PageContent isFluid={true}>
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <>
                            <Table />
                            {cardList.length === 0 ? (
                                <p>Keine Karten vorhanden...</p>
                            ) : (
                                <>
                                    <DataGrid
                                        className="dataTable"
                                        rowClass={(row, index) =>
                                            // row.id.includes('7') || index === 0 ? "datarow" : undefined
                                            'dataTable__row'
                                        }
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
