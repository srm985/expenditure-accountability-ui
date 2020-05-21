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
        isAlignedRight,
        isFullWidth,
        isInlineBlock,
        isWarning,
        label,
        styleType,
        type
    } = props;

    const {
        displayName
    } = ButtonComponent;

    const buttonLabel = (
        <span>{label}</span>
    );

    const buttonClassNames = classNames(
        displayName,
        className,
        {
            [`${displayName}--aligned-right`]: isAlignedRight,
            [`${displayName}--full-width`]: isFullWidth && (styleType === BUTTON_STYLE_TYPE_PRIMARY || styleType === BUTTON_STYLE_TYPE_SECONDARY),
            [`${displayName}--inline-block`]: styleType === BUTTON_STYLE_TYPE_INLINE && isInlineBlock,
            [`${displayName}--inline-warning`]: styleType === BUTTON_STYLE_TYPE_INLINE && isWarning,
            [`${displayName}--inline`]: styleType === BUTTON_STYLE_TYPE_INLINE,
            [`${displayName}--primary-warning`]: styleType === BUTTON_STYLE_TYPE_PRIMARY && isWarning,
            [`${displayName}--primary`]: styleType === BUTTON_STYLE_TYPE_PRIMARY,
            [`${displayName}--secondary-warning`]: styleType === BUTTON_STYLE_TYPE_SECONDARY && isWarning,
            [`${displayName}--secondary`]: styleType === BUTTON_STYLE_TYPE_SECONDARY
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
    isAlignedRight: PropTypes.bool,
    isFullWidth: PropTypes.bool,
    isInlineBlock: PropTypes.bool,
    isWarning: PropTypes.bool,
    label: PropTypes.string,
    styleType: PropTypes.oneOf(BUTTON_STYLE_TYPES),
    type: PropTypes.oneOf(BUTTON_TYPES)
};

ButtonComponent.defaultProps = {
    className: '',
    handleClick: () => { },
    href: '',
    isAlignedRight: false,
    isFullWidth: false,
    isInlineBlock: false,
    isWarning: false,
    label: '',
    styleType: BUTTON_STYLE_TYPE_PRIMARY,
    type: BUTTON_TYPE_BUTTON
};

ButtonComponent.displayName = 'ButtonComponent';

export default ButtonComponent;
