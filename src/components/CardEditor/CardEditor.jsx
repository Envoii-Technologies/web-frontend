import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardEditor } from '../../context/CardEditorContextProvider';

import {
    LoadingIndicator,
    PageHeader,
    Button,
    PageContent,
    FormInput,
    ModalWindow,
    FormError,
} from '../';

import './CardEditor.scss';
import { EditorContent, HeaderMenu, StepManager } from './components/';

export const CardEditor = ({ cardId, tenant }) => {
    const [currentPage, setCurrentPage] = useState('steps');

    const navigate = useNavigate();

    const [showDeleteWindow, setShowDeleteWindow] = useState(false);

    const {
        isSaving,
        isSavable,
        isLoading,
        initCard,
        handleCardChange,
        card,
        saveCard,
        markCardForDeletion,
        errorMessage,
        createStep,
        selectStep,
        selectedStep,
        handleStepChange,
        deleteStep,
    } = useCardEditor();

    useEffect(() => {
        initCard(cardId, tenant);
    }, []);

    if (isLoading) {
        return (
            <>
                <LoadingIndicator full />
            </>
        );
    } else {
        return (
            <>
                <ModalWindow
                    show={showDeleteWindow}
                    onCancel={() => setShowDeleteWindow(false)}
                    onAccept={() => markCardForDeletion(cardId)}
                    cancelText="Abbrechen (Esc)"
                    acceptText="Löschen (Enter)"
                    title="Achtung"
                    body="Wollen Sie diese Karte zum löschen markieren?"
                />
                <PageHeader
                    hasBackground
                    title="Karten"
                    subtitle={card.title}
                    onBack={() => navigate(`/${tenant}/cards`)}
                    helpLink="/"
                >
                    <Button
                        label="Schritte"
                        type={currentPage === 'steps' ? 'primary' : 'secondary'}
                        onClick={() => setCurrentPage('steps')}
                    />
                    <Button
                        label="Einstellungen"
                        type={currentPage === 'info' ? 'primary' : 'secondary'}
                        onClick={() => setCurrentPage('info')}
                    />
                    <Button
                        isLoading={isSaving}
                        disabled={!isSavable}
                        type="primary"
                        label="Speichern"
                        onClick={saveCard}
                        helpLink="/"
                    />
                </PageHeader>

                {currentPage === 'steps' && (
                    <>
                        <div className="CardEditor">
                            <HeaderMenu />
                            <div className="CardEditor__layout">
                                <StepManager/>
                                <EditorContent/>
                            </div>
                        </div>
                    </>
                )}

                {currentPage === 'info' && (
                    <>
                        <PageContent>
                        {errorMessage?.message && (
                        <FormError
                            type="error"
                            message={errorMessage.message}
                        />
                    )}

                            <FormInput
                                status={errorMessage.type === 'title' ? 'error' : ''}
                                label="Titel"
                                name="title"
                                value={card.title}
                                onChange={(e) => handleCardChange(e)}
                            />
                            <FormInput
                                label="Beschreibung"
                                name="description"
                                value={card.description}
                                onChange={(e) => handleCardChange(e)}
                            />
                            <FormInput
                                disabled
                                label="Shortlink (Slug)"
                                name="description"
                                value={`${tenant}/cards/${card.slug}`}
                                onChange={(e) => handleCardChange(e)}
                            />
                            <br />
                            Veröffentlicht:&nbsp;
                            <input
                                type="checkbox"
                                name="released"
                                checked={card.released}
                                onChange={(e) => handleCardChange(e)}
                            />
                            <br />
                            <br />
                            <Button
                                type="error"
                                label="Karte zum Löschen markieren"
                                style={{ width: '100%' }}
                                size="large"
                                onClick={() => setShowDeleteWindow(true)}
                            />
                        </PageContent>
                    </>
                )}
            </>
        );
    }
};

//                     {selectedStep && (
//                         <>
//                             <p>Name</p>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={selectedStep.name}
//                                 onChange={(e) => handleStepChange(e)}
//                             />
//                             <br />
//                             <p>Beschreibung</p>
//                             <input
//                                 type="text"
//                                 name="description"
//                                 value={selectedStep.description}
//                                 onChange={(e) => handleStepChange(e)}
//                             />
//                             <br />
// <button
//                         onClick={() =>
//                             createStep({ name: 'Neue Präsentation', type: 'slide' })
//                         }
//                     >
//                         Schritt "Präsentation" hinzufügen
//                     </button>
//                         </>
//                     )}

//                     <br />
//                     <hr />
//                     <br />

//                     <p>Steps:</p>

//                     <ul>
//                         {card.steps.map((step, i) => (
//                             <li key={i}>
//                                 {step.name} - {step.type}
//                                 &nbsp;
//                                 <button onClick={() => selectStep(step.id)}>
//                                     select
//                                 </button>
//                                 <button onClick={() => deleteStep(step.id)}>
//                                     delete
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>

//                     <br />
//                     <hr />
//                     <br />

//                     <button
//                         onClick={() =>
//                             createStep({ name: 'Neue Arbeitsanweisung', type: 'instruction' })
//                         }
//                     >
//                         Schritt "Arbeitsanweisung" hinzufügen
//                     </button>
//                     <br />
//                     <button
//                         onClick={() =>
//                             createStep({ name: 'Neue Präsentation', type: 'slide' })
//                         }
//                     >
//                         Schritt "Präsentation" hinzufügen
//                     </button>
//                     <br />
//                     {/* <button
//                         onClick={() =>
//                             createStep({ name: 'Neues Modul', type: 'module' })
//                         }
//                     >
//                         Schritt "Modul" hinzufügen
//                     </button> */}
//                     </CardEditorLayout>
//                     </div>

//     const {
//         selectedCard,
//         selectedStep,
//         setSelectedStep,
//         stepList,
//         setStepList,
//         createStep,
//         updateStep,

//         saveCard,
//         loadCard,
//         initCard,
//     } = useCardEditor();

//     useEffect(() => {
//         initCard(card, tenant);
//         loadCard();
//     }, []);

//     return (
//         <>
//             <div className="CardEditor">
//                 <CardEditorLayout>
//                     <button onClick={() => updateStep(selectedStep, { name: "updated" })}>
//                         Update Step
//                     </button>
//                     <button
//                         onClick={() =>
//                             createStep({ name: 'test', type: 'instruction' })
//                         }
//                     >
//                         create step
//                     </button>

//                     {stepList.map((step, i) => (
//                         <p
//                             key={step.id}
//                             onClick={() => setSelectedStep(step.id)}
//                         >
//                             {step.id} - {step.name} - {step.type}
//                         </p>
//                     ))}

//                     <p>{selectedStep}</p>

//                     <button onClick={saveCard}>Save</button>
//                 </CardEditorLayout>
//             </div>
//         </>
//     );
// };
// // import { useContext, useEffect, useState } from 'react';

// // import { CardEditorLayout } from './components/CardEditorLayout/CardEditorLayout';

// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import {
// //     faObjectUngroup,
// //     faListOl,
// //     faBox,
// //     faBarsStaggered,
// // } from '@fortawesome/free-solid-svg-icons';
// // import generateInitPassword from '../../helpers/generateInitPassword';

// // import { CardEditorContext } from '../../context/CardEditorContextProvider';

// // import './CardEditor.scss';
// // import { CardEditorStepManager } from './components/CardEditorStepManager/CardEditorStepManager';

// // export const CardEditor = ({ card }) => {
// //     const [showNewStepTypeList, setShowNewStepTypeList] = useState(false);
// //     const [activeStep, setActiveStep] = useState(null);
// //     const [activeStepName, setActiveStepName] = useState(null);

// //     const {isLoading, setSelectedStep, selectedStep, setActiveCard} = useContext(CardEditorContext);

// //     const [stepList, setStepList] = useState([
// //         {
// //             id: generateInitPassword(12),
// //             name: 'Neuer Schritt',
// //             type: 'slide',
// //         },
// //     ]);

// //     useEffect(() => {
// //         setActiveCard(card);
// //     }, []);

// //     const addNewStep = (type) => {
// //         setStepList((steps) => [
// //             ...steps,
// //             { id: generateInitPassword(12), name: 'Neuer Schritt', type },
// //         ]);
// //         setShowNewStepTypeList(false);
// //     };

// //     useEffect(() => {
// //         setActiveStep(stepList[0]);
// //         setActiveStepName(stepList[0].name);
// //     }, []);

// //     useEffect(() => {}, [activeStepName]);

// //     async function save() {
// //         console.log('saving...');
// //     }

// //     setInterval(save, 60000);

// //     const handleShowNewStepTypeList = (e) => {
// //         e.preventDefault();

// //         setShowNewStepTypeList(true);
// //     };

// //     const handleChangeActiveStep = (e, id) => {
// //         e.preventDefault();

// //         console.log(id);

// //         const selectedStep = id
// //             ? stepList.filter((step) => step.id === id)[0]
// //             : stepList[0];

// //         setActiveStep(selectedStep);
// //         setSelectedStep(selectedStep);
// //         setActiveStepName(selectedStep.name);
// //     };

// //     const handleChangeActiveStepName = (e) => {
// //         const newArray = stepList.map((item, i) => {
// //             if (item.id === activeStep.id) {
// //                 return { ...item, name: e.target.value };
// //             } else {
// //                 return item;
// //             }
// //         });

// //         setActiveStepName(e.target.value);
// //         setStepList(newArray);
// //     };

// //     return (
// //             <div className="CardEditor">
// //                 <CardEditorLayout>
// //                     <CardEditorStepManager>

// //                     </CardEditorStepManager>
// //                     {/* <div className="CardEditor__layout__menu">
// //                         <header className="CardEditor__layout__menu__title">
// //                             <button
// //                                 onClick={(e) => handleShowNewStepTypeList(e)}
// //                             >
// //                                 <FontAwesomeIcon icon={faObjectUngroup} />
// //                                 Neuen Schritt hinzufügen
// //                             </button>
// //                         </header>
// //                         {showNewStepTypeList && (
// //                             <ul className="CardEditor__layout__stepType">
// //                                 <li className="CardEditor__layout__stepType__item">
// //                                     <button
// //                                         onClick={() =>
// //                                             addNewStep('instruction')
// //                                         }
// //                                     >
// //                                         <FontAwesomeIcon icon={faListOl} />
// //                                         Arbeitsanweisung
// //                                     </button>
// //                                 </li>
// //                                 <li className="CardEditor__layout__stepType__item">
// //                                     <button onClick={() => addNewStep('slide')}>
// //                                         <FontAwesomeIcon
// //                                             icon={faBarsStaggered}
// //                                         />
// //                                         Präsentation
// //                                     </button>
// //                                 </li>
// //                             </ul>
// //                         )}
// //                         <ul className="CardEditor__layout__menu__steplist">
// //                             {stepList.map((step, i) => (
// //                                 <button
// //                                     key={i}
// //                                     onClick={(e) =>
// //                                         handleChangeActiveStep(e, step.id)
// //                                     }
// //                                     className={`CardEditor__layout__menu__steplist__item ${
// //                                         activeStep && activeStep.id === step.id
// //                                             ? 'active'
// //                                             : ''
// //                                     }`}
// //                                 >
// //                                     {i + 1} -&nbsp;
// //                                     <span className="CardEditor__layout__menu__steplist__item__name">
// //                                         {step.name}
// //                                     </span>
// //                                 </button>
// //                             ))}
// //                         </ul>
// //                     </div> */}
// //                     <div className="CardEditor__layout__content">
// //                         {!activeStep ? (
// //                             <p>loading...</p>
// //                         ) : (
// //                             <>
// //                                 <header className="CardEditor__layout__content__title">
// //                                     <input
// //                                         autoFocus
// //                                         type="text"
// //                                         name="stepname"
// //                                         value={activeStepName || ''}
// //                                         onChange={(e) =>
// //                                             handleChangeActiveStepName(e)
// //                                         }
// //                                     />
// //                                 </header>
// //                                 <div className="CardEditor__layout__content__wrapper">
// //                                     {activeStep &&
// //                                         activeStep.type === 'instruction' && (
// //                                             <>
// //                                                 <div className="CardEditor__layout__content__wrapper--instruction">
// //                                                     A
// //                                                 </div>
// //                                             </>
// //                                         )}
// //                                     {activeStep &&
// //                                         activeStep.type === 'slide' && (
// //                                             <>
// //                                                 <div className="CardEditor__layout__content__wrapper--slide">
// //                                                     B
// //                                                 </div>
// //                                             </>
// //                                         )}
// //                                     {activeStep &&
// //                                         activeStep.type === 'module' && (
// //                                             <>
// //                                                 <div className="CardEditor__layout__content__wrapper--module">
// //                                                     NOT IMPLEMENTED
// //                                                 </div>
// //                                             </>
// //                                         )}
// //                                 </div>
// //                             </>
// //                         )}
// //                     </div>
// //                     </CardEditorLayout>
// //             </div>
// //     );
// // };
