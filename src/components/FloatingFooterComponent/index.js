import PropTypes from 'prop-types';
import React from 'react';

import './styles.scss';

const FloatingFooterComponent = (props) => {
    const {
        children
    } = props;

    const {
        displayName
    } = FloatingFooterComponent;

    return (
        <footer className={displayName}>{children}</footer>
    );
};

FloatingFooterComponent.displayName = 'FloatingFooterComponent';

FloatingFooterComponent.propTypes = {
    children: PropTypes.node
};

FloatingFooterComponent.defaultProps = {
    children: ''
};

export default FloatingFooterComponent;
