import PropTypes from 'prop-types';
import React from 'react';

import Button from '../ButtonComponent';

import {
    BUTTON_STYLE_TYPE_INLINE
} from '../ButtonComponent/config';

import classNames from '../../utils/classNames';

import './styles.scss';

const BannerComponent = (props) => {
    const {
        ctaLabel,
        handleAcknowledge,
        isVisible,
        subTitle,
        title
    } = props;

    const {
        displayName
    } = BannerComponent;

    const componentClassNames = classNames(
        displayName,
        {
            [`${displayName}--visible`]: isVisible
        }
    );

    return (
        <div className={componentClassNames}>
            <div className={`${displayName}__title-block`}>
                <h3>{title}</h3>
                {
                    subTitle
                    && (
                        <p className={'mt--1'}>{subTitle}</p>
                    )
                }
            </div>
            {
                ctaLabel
                && (
                    <Button
                        handleClick={handleAcknowledge}
                        label={ctaLabel}
                        styleType={BUTTON_STYLE_TYPE_INLINE}
                    />
                )
            }
        </div>
    );
};

BannerComponent.displayName = 'BannerComponent';

BannerComponent.propTypes = {
    ctaLabel: PropTypes.string.isRequired,
    handleAcknowledge: PropTypes.func,
    isVisible: PropTypes.bool,
    subTitle: PropTypes.string,
    title: PropTypes.string.isRequired
};

BannerComponent.defaultProps = {
    handleAcknowledge: () => { },
    isVisible: false,
    subTitle: ''
};

export default BannerComponent;
