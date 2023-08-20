import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const defaultCardEditorContextValues = {
    card: {
        name: '',
        title: '',
    },
};

export const CardEditorContext = createContext(defaultCardEditorContextValues);

export const CardEditorContextProvider = ({ children }) => {
    const [activeCard, setActiveCard] = useState(null);
    const [selectedStep, setSelectedStep ] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(activeCard)
        {
            console.log(activeCard);
        }
    }, [activeCard])



    return (
        <CardEditorContext.Provider
            value={{
                selectedStep,
                setSelectedStep,
                isLoading,
                setActiveCard,
            }}
        >
            {children}
        </CardEditorContext.Provider>
    );
};
