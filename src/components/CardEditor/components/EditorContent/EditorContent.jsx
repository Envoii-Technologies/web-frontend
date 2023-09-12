import PropTypes from 'prop-types';

import { useCardEditor } from '../../../../context/CardEditorContextProvider';

import './EditorContent.scss';

export const EditorContent = () => {
    const { selectedStep, createStep, handleStepChange } = useCardEditor();

    return (
        <>
            <div className="EditorContent">
                <div className="EditorContent__wrapper">
                    {!selectedStep ? (
                        <>
                            <div className="EditorContent__noContent">
                                Kein Schritt selektiert
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="EditorContent__content">
                                {selectedStep.type}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

EditorContent.propTypes = {};

EditorContent.defaultProps = {};
