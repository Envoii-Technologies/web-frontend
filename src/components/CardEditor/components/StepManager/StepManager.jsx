import PropTypes from 'prop-types';
import { useState } from 'react';

import './StepManager.scss';
import { useCardEditor } from '../../../../context/CardEditorContextProvider';

import { ModalWindow } from '../../../ModalWindow/ModalWindow';

export const StepManager = ({ children }) => {
    const { card, selectStep, selectedStep, deleteStep } = useCardEditor();
    const [showDeleteWindow, setShowDeleteWindow] = useState(false);

    const handleShowDeleteWindow = (stepId) =>
    {
        selectStep(stepId);
        setShowDeleteWindow(true);
    }

    const handleDeleteStep = () =>
    {
        deleteStep(selectedStep.id);
        setShowDeleteWindow(false);
    }

    return (
        <>
            <ModalWindow
                show={showDeleteWindow}
                onCancel={() => setShowDeleteWindow(false)}
                onAccept={() => handleDeleteStep() }
                cancelText="Abbrechen (Esc)"
                acceptText="Löschen (Enter)"
                title="Achtung"
                body="Wollen Sie diesen Schritt wirklich löschen?"
            />
            <div className="StepManager">
                <ul>
                    {card.steps.map((step, i) => (
                        <li key={i}>
                            <button onClick={() => selectStep(step.id)}>
                                {step.name}
                            </button>
                            <button onClick={() => { handleShowDeleteWindow(step.id) }}>
                                delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

StepManager.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

StepManager.defaultProps = {
    children: null,
};
