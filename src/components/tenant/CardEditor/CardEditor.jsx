import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faObjectUngroup,
    faListOl,
    faBox,
    faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';
import generateInitPassword from '../../../helpers/generateInitPassword';

import './CardEditor.scss';
import { CardEditorContext } from '../../../context/CardEditorContext';

export const CardEditor = ({ card }) => {
    const [showNewStepTypeList, setShowNewStepTypeList] = useState(false);
    const [activeStep, setActiveStep] = useState(null);
    const [activeStepName, setActiveStepName] = useState(null);

    const {isLoading, setSelectedStep, selectedStep, setActiveCard} = useContext(CardEditorContext);

    const [stepList, setStepList] = useState([
        {
            id: generateInitPassword(12),
            name: 'Neuer Schritt',
            type: 'slide',
        },
    ]);

    useEffect(() => {
        setActiveCard(card);
    }, []);

    const addNewStep = (type) => {
        setStepList((steps) => [
            ...steps,
            { id: generateInitPassword(12), name: 'Neuer Schritt', type },
        ]);
        setShowNewStepTypeList(false);
    };

    useEffect(() => {
        setActiveStep(stepList[0]);
        setActiveStepName(stepList[0].name);
    }, []);

    useEffect(() => {}, [activeStepName]);

    async function save() {
        console.log('saving...');
    }

    setInterval(save, 60000);

    const handleShowNewStepTypeList = (e) => {
        e.preventDefault();

        setShowNewStepTypeList(true);
    };

    const handleChangeActiveStep = (e, id) => {
        e.preventDefault();

        console.log(id);

        const selectedStep = id
            ? stepList.filter((step) => step.id === id)[0]
            : stepList[0];

        setActiveStep(selectedStep);
        setSelectedStep(selectedStep);
        setActiveStepName(selectedStep.name);
    };

    const handleChangeActiveStepName = (e) => {
        const newArray = stepList.map((item, i) => {
            if (item.id === activeStep.id) {
                return { ...item, name: e.target.value };
            } else {
                return item;
            }
        });

        setActiveStepName(e.target.value);
        setStepList(newArray);
    };

    return (
            <div className="CardEditor">
                <div className="CardEditor__layout">
                    <div className="CardEditor__layout__menu">
                        <header className="CardEditor__layout__menu__title">
                            <button
                                onClick={(e) => handleShowNewStepTypeList(e)}
                            >
                                <FontAwesomeIcon icon={faObjectUngroup} />
                                Neuen Schritt hinzufügen
                            </button>
                        </header>
                        {showNewStepTypeList && (
                            <ul className="CardEditor__layout__stepType">
                                <li className="CardEditor__layout__stepType__item">
                                    <button
                                        onClick={() =>
                                            addNewStep('instruction')
                                        }
                                    >
                                        <FontAwesomeIcon icon={faListOl} />
                                        Arbeitsanweisung
                                    </button>
                                </li>
                                <li className="CardEditor__layout__stepType__item">
                                    <button onClick={() => addNewStep('slide')}>
                                        <FontAwesomeIcon
                                            icon={faBarsStaggered}
                                        />
                                        Präsentation
                                    </button>
                                </li>
                                {/* <li className="CardEditor__layout__stepType__item">
                                <button onClick={() => addNewStep('module')}>
                                    <FontAwesomeIcon icon={faBox} />
                                    Modul
                                </button>
                            </li> */}
                            </ul>
                        )}
                        <ul className="CardEditor__layout__menu__steplist">
                            {stepList.map((step, i) => (
                                <button
                                    key={i}
                                    onClick={(e) =>
                                        handleChangeActiveStep(e, step.id)
                                    }
                                    className={`CardEditor__layout__menu__steplist__item ${
                                        activeStep && activeStep.id === step.id
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    {i + 1} -&nbsp;
                                    <span className="CardEditor__layout__menu__steplist__item__name">
                                        {step.name}
                                    </span>
                                </button>
                            ))}
                        </ul>
                    </div>
                    <div className="CardEditor__layout__content">
                        {!activeStep ? (
                            <p>loading...</p>
                        ) : (
                            <>
                                <header className="CardEditor__layout__content__title">
                                    <input
                                        autoFocus
                                        type="text"
                                        name="stepname"
                                        value={activeStepName || ''}
                                        onChange={(e) =>
                                            handleChangeActiveStepName(e)
                                        }
                                    />
                                </header>
                                <div className="CardEditor__layout__content__wrapper">
                                    {activeStep &&
                                        activeStep.type === 'instruction' && (
                                            <>
                                                <div className="CardEditor__layout__content__wrapper--instruction">
                                                    A
                                                </div>
                                            </>
                                        )}
                                    {activeStep &&
                                        activeStep.type === 'slide' && (
                                            <>
                                                <div className="CardEditor__layout__content__wrapper--slide">
                                                    B
                                                </div>
                                            </>
                                        )}
                                    {activeStep &&
                                        activeStep.type === 'module' && (
                                            <>
                                                <div className="CardEditor__layout__content__wrapper--module">
                                                    NOT IMPLEMENTED
                                                </div>
                                            </>
                                        )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
    );
};
