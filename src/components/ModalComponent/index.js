import PropTypes from 'prop-types';
import React from 'react';

import Button from '../ButtonComponent';

import {
    BUTTON_STYLE_TYPE_PRIMARY,
    BUTTON_TYPE_BUTTON,
    BUTTON_STYLE_TYPE_SECONDARY
} from '../ButtonComponent/config';

import classNames from '../../utils/classNames';

import './styles.scss';

const ModalComponent = (props) => {
    const {
        children,
        handleClickCTAPrimary,
        handleClickCTASecondary,
        handleClose,
        isShown,
        labelCTAPrimary,
        labelCTASecondary
    } = props;

    const {
        displayName
    } = ModalComponent;

    const componentClassNames = classNames(
        displayName,
        {
            [`${displayName}--visible`]: isShown
        }
    );

    return (
        <div className={componentClassNames}>
            <div className={`${displayName}__backdrop`} />
            <div className={`${displayName}__modal`}>
                <div
                    className={`${displayName}__close-button`}
                    onClick={handleClose}
                    role={'button'}
                    tabIndex={'0'}
                >
                    <div />
                </div>
                <div className={`${displayName}__body`}>
                    {children}
                </div>
                <div className={`${displayName}__footer`}>
                    <Button
                        handleClick={handleClickCTAPrimary}
                        label={labelCTAPrimary}
                        styleType={BUTTON_STYLE_TYPE_PRIMARY}
                        type={BUTTON_TYPE_BUTTON}
                    />
                    <Button
                        handleClick={handleClickCTASecondary}
                        label={labelCTASecondary}
                        styleType={BUTTON_STYLE_TYPE_SECONDARY}
                        type={BUTTON_TYPE_BUTTON}
                    />
                </div>
            </div>
        </div>
    );
};

ModalComponent.displayName = 'ModalComponent';

ModalComponent.propTypes = {
    children: PropTypes.node,
    handleClickCTAPrimary: PropTypes.func,
    handleClickCTASecondary: PropTypes.func,
    handleClose: PropTypes.func,
    isShown: PropTypes.bool,
    labelCTAPrimary: PropTypes.string,
    labelCTASecondary: PropTypes.string
};

ModalComponent.defaultProps = {
    children: '',
    handleClickCTAPrimary: () => { },
    handleClickCTASecondary: () => { },
    handleClose: () => { },
    isShown: true,
    labelCTAPrimary: '',
    labelCTASecondary: ''
};

export default ModalComponent;