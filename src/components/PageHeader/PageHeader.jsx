import PropTypes from 'prop-types';

import './PageHeader.scss';

export const PageHeader = ({
    title,
    subtitle,
    onBack,
    children,
    hasBackground,
}) => {
    return (
        <>
            <div
                className={`PageHeader ${!hasBackground ? 'transparent' : ''}`}
            >
                <div className="PageHeader__wrapper">
                    <div className="PageHeader__title">
                        {subtitle ? (
                            <>
                                <h4
                                    className="PageHeader__title__main link"
                                    onClick={onBack}
                                >
                                    {title}
                                </h4>
                                <h1 className="PageHeader__title__sub">
                                    {subtitle}
                                </h1>
                            </>
                        ) : (
                            <>
                                <h1 className="PageHeader__title__sub">
                                    {title}
                                </h1>
                            </>
                        )}
                    </div>
                    <div className="PageHeader__menu">
                        <div className="PageHeader__menu__content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onBack: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
    hasBackground: PropTypes.bool,
};

PageHeader.defaultProps = {
    title: 'Default Title',
    subtitle: undefined,
    onBack: undefined,
    children: undefined,
    hasBackground: true,
};
