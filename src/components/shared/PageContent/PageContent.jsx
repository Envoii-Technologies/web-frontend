import './PageContent.scss';

export const PageContent = ({ children, hasWrapper = true }) => {
    return (
        <div className="PageContent">
            {hasWrapper ? (
                <div className="PageContent__wrapper">{children}</div>
            ) : (
                <>{ children }</>
            )}
        </div>
    );
};
