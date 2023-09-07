import PropTypes from "prop-types";
import { useState } from "react";

import { Button } from "../Button/Button";

import './PopOver.scss';

export const PopOver = ({ children, position, options }) => {
    const [ isOpen, setIsOpen] = useState(false);

    const handleAction = (action, e) => {
        setIsOpen(false);
        
        action(e);
    }

    return(
        <>
            <span className="PopOver">
                <span className="PopOver__content" onClick={() => setIsOpen(!isOpen)}>
                    { children }
                </span>
                <span className={`PopOver__wrapper ${isOpen ? 'open' : 'closed'} ${position}`}>
                {
                    options && options.map((option, i) => (
                        <Button key={i} type={option.type || "primary"} label={option.label} onClick={(e) => handleAction(option.action, e)}/>
                    ))
                }
                </span>
            </span>
        </>
    )
}

PopOver.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
    position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    options: PropTypes.array
};

PopOver.defaultProps = {
    children: null,
    position: "bottom",
    options: [
        {
            label: "Edit",
            type: "secondary",
            action: () => console.log("test")
        },
        {
            label: "Delete",
            type: "error",
            action: () => console.log("test2")
        }
    ]
};
