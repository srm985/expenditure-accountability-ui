import PropTypes from 'prop-types';
import React from 'react';

import Button from '../ButtonComponent';

import {
    BUTTON_STYLE_TYPE_PRIMARY,
    BUTTON_STYLE_TYPE_SECONDARY,
    BUTTON_TYPE_BUTTON,
    BUTTON_TYPE_SUBMIT
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
        isWarningCTAPrimary,
        isWarningCTASecondary,
        labelCTAPrimary,
        labelCTASecondary
    } = props;

    const handleSubmit = (event) => {
        event.preventDefault();

        handleClickCTAPrimary();
    };

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
                <form onSubmit={handleSubmit}>
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
                            isWarning={isWarningCTAPrimary}
                            label={labelCTAPrimary}
                            styleType={BUTTON_STYLE_TYPE_PRIMARY}
                            type={BUTTON_TYPE_SUBMIT}
                        />
                        {
                            labelCTASecondary
                            && (
                                <Button
                                    className={'ml--2'}
                                    handleClick={handleClickCTASecondary}
                                    isWarning={isWarningCTASecondary}
                                    label={labelCTASecondary}
                                    styleType={BUTTON_STYLE_TYPE_SECONDARY}
                                    type={BUTTON_TYPE_BUTTON}
                                />
                            )
                        }
                    </div>
                </form>
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
    isWarningCTAPrimary: PropTypes.bool,
    isWarningCTASecondary: PropTypes.bool,
    labelCTAPrimary: PropTypes.string,
    labelCTASecondary: PropTypes.string
};

ModalComponent.defaultProps = {
    children: '',
    handleClickCTAPrimary: () => { },
    handleClickCTASecondary: () => { },
    handleClose: () => { },
    isShown: true,
    isWarningCTAPrimary: false,
    isWarningCTASecondary: false,
    labelCTAPrimary: '',
    labelCTASecondary: ''
};

export default ModalComponent;
