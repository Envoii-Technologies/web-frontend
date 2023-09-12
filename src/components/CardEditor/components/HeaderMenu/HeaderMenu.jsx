import PropTypes from 'prop-types';

import './HeaderMenu.scss';
import { useCardEditor } from '../../../../context/CardEditorContextProvider';
import { Button } from '../../../Button/Button';

export const HeaderMenu = ({ children }) => {
    const { selectedStep, createStep, handleStepChange } = useCardEditor();

    return (
        <>
            <div className="HeaderMenu">
                <div className="HeaderMenu__createStep">
                    <button
                        onClick={() =>
                            createStep({
                                name: 'Neue Arbeitsanweisung',
                                type: 'instruction',
                            })
                        }
                    >
                        Arbeitsanweisung hinzufügen
                    </button>
                    <button
                        onClick={() =>
                            createStep({
                                name: 'Neue Präsentation',
                                type: 'slide',
                            })
                        }
                    >
                        Slide hinzufügen
                    </button>
                </div>
                <div className="HeaderMenu__stepName">
                    {selectedStep && (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={selectedStep.name}
                                onChange={(e) => handleStepChange(e)}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

HeaderMenu.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

HeaderMenu.defaultProps = {
    children: null,
};
