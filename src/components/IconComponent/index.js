import PropTypes from 'prop-types';
import React from 'react';

import './styles.scss';

const IconComponent = (props) => {
    const {
        handleClick,
        icon,
        isButton
    } = props;

    const {
        displayName
    } = IconComponent;

    const buttonAttributes = {
        onClick: handleClick,
        role: 'button',
        tabIndex: 0
    };

    return (
        <div
            className={displayName}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: icon
            }}
            onClick={handleClick}
            role={'button'}
            tabIndex={0}
            {...(isButton ? buttonAttributes : {})}
        />
    );
};

IconComponent.displayName = 'IconComponent';

IconComponent.propTypes = {
    handleClick: PropTypes.func,
    icon: PropTypes.string.isRequired,
    isButton: PropTypes.bool
};

IconComponent.defaultProps = {
    handleClick: () => { },
    isButton: false
};

export default IconComponent;
