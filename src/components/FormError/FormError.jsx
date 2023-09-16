import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCircleExclamation,
   faTriangleExclamation,
   faCircleCheck
} from '@fortawesome/free-solid-svg-icons';

import './FormError.scss';

export const FormError = ({ type, message }) => 
{
    return(
        <>
            <div className={`FormError ${type}`}>
                <div className="FormError__wrapper">
                    <div className={`FormError__icon ${type}`}>
                        {
                            type === "success" && <FontAwesomeIcon icon={faCircleCheck} />
                        }
                        {
                            type === "warning" && <FontAwesomeIcon icon={faTriangleExclamation} />
                        }
                        {
                            type === "error" && <FontAwesomeIcon icon={faCircleExclamation} />
                        }
                    </div>
                    <div className="FormError__message">{message}</div>
                </div>
            </div>
        </>
    )
}

FormError.propTypes = {
    type: PropTypes.oneOf(["success", "warning", "error"]),
    message: PropTypes.string,
};
FormError.defaultProps = {
    type: "error",
    message: "[DEFAULT MESSAGE]"
};
