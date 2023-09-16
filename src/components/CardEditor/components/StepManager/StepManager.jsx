import PropTypes from 'prop-types';
import { useState } from 'react';

import {
    faFileCircleXmark,
    faFileSignature,
    faCircleQuestion,
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

import { useCardEditor } from '../../../../context/CardEditorContextProvider';
import { ModalWindow, Button, PopOver } from '../../../';
import './StepManager.scss';

export const StepManager = () => {
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
                <ul className="StepManager__items">
                    {card.steps.map((step, i) => (
                        <li key={i} className="StepManager__items__item"  onClick={() => selectStep(step.id)}>
                            <span className="StepManager__items__item__name">
                                {step.name}
                            </span>
                            <PopOver
                            options={[
                                {
                                    label: 'Löschen',
                                    type: 'secondary',
                                    action: () =>
                                    handleShowDeleteWindow(step.id)
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
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

StepManager.propTypes = {
};

StepManager.defaultProps = {
};
