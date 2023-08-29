import PropTypes from 'prop-types';

import './PageContent.scss';

export const PageContent = ({ children, hasWrapper, isFluid }) => {
    return (
        <div className="PageContent">
            {hasWrapper ? (
                <div className={`PageContent__wrapper ${isFluid ? 'fluid' : ''}`}>{children}</div>
            ) : (
                <>{ children }</>
            )}
        </div>
    );
};

PageContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
    hasWrapper: PropTypes.bool,
    isFluid: PropTypes.bool,
};

PageContent.defaultProps = {
    children: undefined,
    hasWrapper: true,
    isFluid: false,
};
