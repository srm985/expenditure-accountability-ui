import PropTypes from 'prop-types';
import React from 'react';

import {
    BUTTON_STYLE_TYPES,
    BUTTON_STYLE_TYPE_INLINE,
    BUTTON_STYLE_TYPE_PRIMARY,
    BUTTON_STYLE_TYPE_SECONDARY,
    BUTTON_TYPES,
    BUTTON_TYPE_BUTTON
} from './config';

import classNames from '../../utils/classNames';

import './styles.scss';

const ButtonComponent = (props) => {
    const {
        className,
        handleClick,
        href,
        isFullWidth,
        isWarning,
        label,
        styleType,
        type
    } = props;

    const buttonLabel = (
        <span>{label}</span>
    );

    const buttonClassNames = classNames(
        ButtonComponent.displayName,
        className,
        {
            [`${ButtonComponent.displayName}--full-width`]: isFullWidth && (styleType === BUTTON_STYLE_TYPE_PRIMARY || styleType === BUTTON_STYLE_TYPE_SECONDARY),
            [`${ButtonComponent.displayName}--inline`]: styleType === BUTTON_STYLE_TYPE_INLINE,
            [`${ButtonComponent.displayName}--primary`]: styleType === BUTTON_STYLE_TYPE_PRIMARY,
            [`${ButtonComponent.displayName}--secondary`]: styleType === BUTTON_STYLE_TYPE_SECONDARY,
            [`${ButtonComponent.displayName}--inline-warning`]: styleType === BUTTON_STYLE_TYPE_INLINE && isWarning,
            [`${ButtonComponent.displayName}--primary-warning`]: styleType === BUTTON_STYLE_TYPE_PRIMARY && isWarning,
            [`${ButtonComponent.displayName}--secondary-warning`]: styleType === BUTTON_STYLE_TYPE_SECONDARY && isWarning
        }
    );

    const renderTypeLink = () => (
        <a
            className={buttonClassNames}
            href={href}
            onClick={handleClick}
        >
            {buttonLabel}
        </a>
    );

    const renderTypeButton = () => (
        // eslint-disable-next-line react/button-has-type
        <button
            className={buttonClassNames}
            onClick={handleClick}
            // eslint-disable-next-line react/button-has-type
            type={type}
        >
            {buttonLabel}
        </button>
    );

    return (
        <>
            {
                href
                    ? (
                        renderTypeLink()
                    )
                    : (
                        renderTypeButton()
                    )
            }
        </>
    );
};

ButtonComponent.propTypes = {
    className: PropTypes.string,
    handleClick: PropTypes.func,
    href: PropTypes.string,
    isFullWidth: PropTypes.bool,
    isWarning: PropTypes.bool,
    label: PropTypes.string,
    styleType: PropTypes.oneOf(BUTTON_STYLE_TYPES),
    type: PropTypes.oneOf(BUTTON_TYPES)
};

ButtonComponent.defaultProps = {
    className: '',
    handleClick: () => { },
    href: '',
    isFullWidth: false,
    isWarning: false,
    label: '',
    styleType: BUTTON_STYLE_TYPE_PRIMARY,
    type: BUTTON_TYPE_BUTTON
};

ButtonComponent.displayName = 'ButtonComponent';

export default ButtonComponent;
