import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import generateInitPassword from '../helpers/generateInitPassword';
import axios from 'axios';
import { useOnPageClose } from '../hooks';

const defaultCardEditorContextValues = {};

export const CardEditorContext = createContext(defaultCardEditorContextValues);

export const CardEditorContextProvider = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState({ type: '', message: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tenant, setTenant] = useState(null);
    const [cardId, setCardId] = useState(null);
    const [card, setCard] = useState(null);
    const [selectedStep, setSelectedStep] = useState(null);
    const [isSavable, setIsSavable] = useState(false);
    const [newestStepId, setNewestStepId] = useState(null);

    useOnPageClose(isSavable);

    const navigate = useNavigate();

    useEffect(() => {
        if (newestStepId !== null) {
            selectStep(newestStepId);
        }
    }, [newestStepId]);

    const handleCardChange = (e) => {
        setErrorMessage({ type: '', message: '' });
        setIsSavable(true);

        if (e.target.type === 'text') {
            setCard({ ...card, [e.target.name]: e.target.value });
        }

        if (e.target.type === 'checkbox') {
            setCard({ ...card, [e.target.name]: e.target.checked });
        }
    };

    const initCard = async (cardId, tenant) => {
        setTenant(tenant);
        setCardId(cardId);

        await loadCard(cardId, tenant);
    };

    const loadCard = async (cardId, tenant) => {
        await axios
            .get(`http://localhost:4001/api/tenants/${tenant}/cards/${cardId}`)
            .then((res) => {
                setCard(res.data.card);
                setSelectedStep(res.data.card.steps[0]);
                setIsLoading(false);
            })
            .catch((err) => console.log(err.message));
    };

    const saveCard = () => {
        setIsSaving(true);
        axios
            .put(
                `http://localhost:4001/api/tenants/${tenant}/cards/${cardId}`,
                card
            )
            .then((res) => {
                setErrorMessage({
                    type: '',
                    message: ''
                });
                setIsSaving(false);
                setIsSavable(false);
                setCard(null);
                setCard(res.data.data);
            })
            .catch((err) => {
                if (err.response.data.info.code === 11000) {
                    setErrorMessage({
                        type: 'title',
                        message:
                            'Eine Karte mit diesem Namen existiert bereits',
                    });
                    setIsSaving(false);
                    setIsSavable(false);
                }
            });
    };

    const markCardForDeletion = (cardId) => {
        axios
            .put(
                `http://localhost:4001/api/tenants/${tenant}/cards/${cardId}/status`
            )
            .then((res) => {
                navigate(`/${tenant}/cards/`);
            })
            .catch((err) => console.log(err.message));
    };

    const removeCard = (cardId) => {
        axios
            .delete(
                `http://localhost:4001/api/tenants/${tenant}/cards/${cardId}`
            )
            .then((res) => {
                navigate(`/${tenant}/cards/`);
            })
            .catch((err) => console.log(err.message));
    };

    const handleStepChange = (e) => {
        setIsSavable(true);
        const allSteps = card.steps.map((step, i) => {
            if (step.id === selectedStep.id) {
                step[e.target.name] = e.target.value;
            }

            return step;
        });

        setCard({ ...card, steps: [...allSteps] });
    };

    const createStep = (stepData) => {
        setIsSavable(true);

        const newStepId = generateInitPassword(24);

        const newStep = {
            id: newStepId,
            name: stepData.name,
            description: stepData.description,
            type: stepData.type,
        };

        setCard({ ...card, steps: [...card.steps, { ...newStep }] });
        setNewestStepId(newStepId);
    };

    const selectStep = (stepId) => {
        const step = card.steps.filter((step) => step.id === stepId)[0];

        setSelectedStep(step);
    };

    const deleteStep = (stepId) => {
        setIsSavable(true);

        const filteredSteps = card.steps.filter((step) => step.id !== stepId);

        console.log(filteredSteps);

        setCard({ ...card, steps: filteredSteps });
        setSelectedStep(null);
        console.log(card);
    };

    return (
        <CardEditorContext.Provider
            value={{
                isSaving,
                isSavable,
                isLoading,
                card,
                handleCardChange,
                initCard,
                loadCard,
                saveCard,
                markCardForDeletion,
                removeCard,
                selectedStep,
                handleStepChange,
                createStep,
                selectStep,
                deleteStep,
                errorMessage,
            }}
        >
            {children}
        </CardEditorContext.Provider>
    );
};

export const useCardEditor = () => {
    return useContext(CardEditorContext);
};
