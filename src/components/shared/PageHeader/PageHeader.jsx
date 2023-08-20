import './PageHeader.scss';

export const PageHeader = ({ title, subtitle, onAction, onCancel, onActionTitle, onCancelTitle }) => {
    return (
        <div className="PageHeader">
            <div className="PageHeader__title">
            {subtitle ? (
                <>
                    <h4 className='PageHeader__title__main' onClick={onCancel}>{title}</h4>
                    <h1>{subtitle}</h1>
                </>
            ) : (
                <h1>{title}</h1>
            )}
            </div>
            <div className="PageHeader__menu">
                {   onCancel &&
                    <button onClick={onCancel}>{onCancelTitle}</button>
                }
                {   onAction &&
                    <button onClick={onAction}>{onActionTitle}</button>
                }
            </div>
        </div>
    );
};
