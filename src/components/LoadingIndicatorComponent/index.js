import React from 'react';

import './styles.scss';

const LoadingIndicatorComponent = () => {
    const {
        displayName
    } = LoadingIndicatorComponent;

    return (
        <div className={displayName}>
            <div className={`${displayName}__spinner`}>
                <div className={`${displayName}__spinner--animation`} />
                <div className={`${displayName}__spinner--animation`} />
            </div>
        </div>
    );
};

LoadingIndicatorComponent.displayName = 'LoadingIndicatorComponent';

export default LoadingIndicatorComponent;
