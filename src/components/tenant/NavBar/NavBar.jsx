import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRightFromBracket,
    faSliders,
    faArrowLeft,
    faFileLines,
    faChartLine,
} from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from './../../../context/AuthContextProvider';
import { TenantContext } from '../../../context/TenantContextProvider';

import helpers from '../../../helpers/';

import logo from './../../../../public/logo-black.png';

import './NavBar.scss';
import { ModalWindow } from '../../';

export const NavBar = () => {
    const [showLogoutWindow, setShowLogOutWindow] = useState(false);
    const [currentChildMenu, setCurrentChildMenu] = useState('');

    const authContext = useContext(AuthContext);

    const menuItems = [
        {
            role: 'admin',
            items: [
                {
                    title: 'Einstellungen',
                    icon: faSliders,
                    path: '',
                    children: [
                        {
                            title: 'Benutzer',
                            path: `/${authContext.tenant}/settings/users`,
                        },
                        {
                            title: 'Teams',
                            path: `/${authContext.tenant}/settings/teams`,
                        },
                    ],
                },
            ],
        },
        {
            role: 'editor',
            items: [
                {
                    title: 'Karten',
                    icon: faFileLines,
                    path: `/${authContext.tenant}/cards`,
                },
            ],
        },
    ];

    const handleLogOut = () => {
        setShowLogOutWindow(true);
    };

    const handleChangeChildMenu = (item) => {
        setCurrentChildMenu(item.title);
    };

    const resetChildMenu = () => {
        setCurrentChildMenu('');
    };

    if (authContext.isAuthenticated) {
        return (
            <>
                <ModalWindow
                    show={showLogoutWindow}
                    onCancel={() => setShowLogOutWindow(false)}
                    onAccept={() => authContext.logout()}
                    cancelText="Abbrechen (Esc)"
                    acceptText="Ausloggen (Enter)"
                    title="Achtung"
                    body="Wollen Sie sich wirklich ausloggen?"
                />
                <div className="NavBar">
                    <div className="NavBar__left">
                        {currentChildMenu.length === 0 ? (
                            <div className="NavBar__left__root">
                                <div className="NavBar__left-top">
                                    {/* <button>A</button> */}
                                </div>
                                <div className="NavBar__left-bottom">
                                    <button onClick={() => handleLogOut()}>
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                        />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="NavBar__left__child">
                                <div className="NavBar__left-top">
                                    <button onClick={resetChildMenu}>
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </button>
                                </div>
                                <div className="NavBar__left-bottom">
                                    <button onClick={() => handleLogOut()}>
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="NavBar__right">
                        <div className="NavBar__right__brand">
                            <img
                                className="NavBar__right__brand__icon"
                                src={logo}
                            />
                        </div>
                        <h3 className="NavBar__right__meta">
                            {!currentChildMenu
                                ? helpers.getHighestRole(authContext).role
                                : currentChildMenu}
                        </h3>
                        <nav>
                            <ul className="NavBar__right__menu">
                                {currentChildMenu.length === 0 ? (
                                    <>
                                        <li className="NavBar__right__menu__item">
                                            <NavLink
                                                exact="true"
                                                className="NavBar__right__menu__item__wrapper parent"
                                                to={`/${authContext.tenant}/`}
                                            >
                                                <span className="NavBar__right__menu__item__wrapper__icon">
                                                    <FontAwesomeIcon
                                                        icon={faChartLine}
                                                    />
                                                </span>
                                                <span className="NavBar__right__menu__item__wrapper__text">
                                                    Dashboard
                                                </span>
                                            </NavLink>
                                        </li>
                                        {menuItems
                                            .filter((menu) =>
                                                helpers
                                                    .getHighestRole(authContext)
                                                    .allRoles.some((i) =>
                                                        menu.role.includes(i)
                                                    )
                                            )
                                            .map((menu, j) => (
                                                <React.Fragment key={j}>
                                                    {menu.items.map(
                                                        (item, j) => (
                                                            <li
                                                                key={j}
                                                                className="NavBar__right__menu__item"
                                                            >
                                                                {item.path ===
                                                                '' ? (
                                                                    <button
                                                                        className="NavBar__right__menu__item__wrapper parent"
                                                                        onClick={() =>
                                                                            handleChangeChildMenu(
                                                                                item
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className="NavBar__right__menu__item__wrapper__icon">
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    item.icon
                                                                                }
                                                                            />
                                                                        </span>
                                                                        <span className="NavBar__right__menu__item__wrapper__text">
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </span>
                                                                    </button>
                                                                ) : (
                                                                    <NavLink
                                                                        exact="true"
                                                                        className="NavBar__right__menu__item__wrapper parent"
                                                                        to={
                                                                            item.path
                                                                        }
                                                                    >
                                                                        <span className="NavBar__right__menu__item__wrapper__icon">
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    item.icon
                                                                                }
                                                                            />
                                                                        </span>
                                                                        <span className="NavBar__right__menu__item__wrapper__text">
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </span>
                                                                    </NavLink>
                                                                )}
                                                            </li>
                                                        )
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </>
                                ) : (
                                    <>
                                        {menuItems
                                            .filter((menu) =>
                                                helpers
                                                    .getHighestRole(authContext)
                                                    .allRoles.some((i) =>
                                                        menu.role.includes(i)
                                                    )
                                            )[0]
                                            .items.filter(
                                                (item) =>
                                                    item.title ===
                                                    currentChildMenu
                                            )[0]
                                            .children.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className="NavBar__right__menu__item"
                                                >
                                                    <NavLink
                                                        to={item.path}
                                                        className="NavBar__right__menu__item__wrapper child"
                                                    >
                                                        <span className="NavBar__right__menu__item__wrapper__text">
                                                            {item.title}
                                                        </span>
                                                    </NavLink>
                                                </li>
                                            ))}
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        );
    }
};
