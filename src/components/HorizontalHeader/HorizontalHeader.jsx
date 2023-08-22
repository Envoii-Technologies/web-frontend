import PropTypes from "prop-types";

import logoLight from './assets/logo-black.png';
import logoDark from './assets/logo-white.png';

import './HorizontalHeader.scss';

export const HorizontalHeader = ({ darkmode = false }) => {
    return (
        <>
            <div className={`HorizontalHeader ${darkmode ? 'dark' : ''}`}>
                <div className={"HorizontalHeader__brand"}>
                    <img src={darkmode ? logoDark : logoLight} alt="" className="HorizontalHeader__brand__logo" />
                </div>
                <div className='HorizontalHeader__menu'>
                    {/* Menu cound go here... */}
                </div>
            </div>
        </>
    );
};

HorizontalHeader.propTypes = {
    darkmode: PropTypes.bool
}

HorizontalHeader.defaultProps = {
    darkmode: false
}
