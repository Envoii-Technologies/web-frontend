import { useState } from 'react';

import { useDocumentTitle } from '../hooks';
import axios from 'axios';
import { useAuth, useTenant } from '../hooks';

export const Dashboard = () => {
    const [cards, setCards] = useState([]);

    const authContext = useAuth();
    const { tenant } = useTenant();

    useDocumentTitle('Mitarbeiter Dashboard');

    const getCards = async () => {
        try {
            const fetchedCards = await axios.get(
                `/api/tenant/${tenant.name}/cards`,
                {
                    headers: {
                        Authorization: `Bearer ${authContext.userToken}`,
                    },
                }
            );

            setCards(fetchedCards.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const createCard = async () => {
        try {
           await axios
            .post(
                `/api/tenant/${tenant.name}/cards`,
                {
                    title: 'TestCard',
                },
                {
                    headers: {
                        Authorization: `Bearer ${authContext.userToken}`,
                    },
                }
            );

            await getCards();
        } catch (err) {
            console.log(err)
        }
    };

    const deleteCard = async (cardId) => {
        try {
            await axios
            .delete(
                `/api/tenant/${tenant.name}/cards/${cardId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authContext.userToken}`,
                    },
                }
            );

            await getCards();
        } catch (err) {
            console.log(err)
        }
    }

    if (!authContext.isAuthenticated) {
        return <p>Loading..</p>;
    } else {
        return (
            <>
                <div className="Dashboard">
                    <p>{tenant.title}</p>
                    <p>{authContext?.userData?.email}</p>
                    <button onClick={() => getCards()}>Get all Cards</button>
                    <button onClick={() => createCard()}>
                        Create new Card
                    </button>
                    <button onClick={() => authContext.logout()}>Ausloggen</button>

                    <h2>Karten</h2>
                    <ul>
                        {cards.map((card, i) => (
                            <li key={i}>
                                <button onClick={() => deleteCard(card._id)}>Löschen</button>
                                <h3>{ card.title } - <i>{ card._id }</i></h3>
                                <p>slug: /{tenant.name}/cards/{ card.slug }</p>
                                <p>erstellt von { card.creator.username } für { card.owner.title }</p>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
};
