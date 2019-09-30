import PropTypes from 'prop-types';
import React from 'react';

import Button from '../ButtonComponent';

import {
    BUTTON_STYLE_TYPE_INLINE,
    BUTTON_TYPE_BUTTON
} from '../ButtonComponent/config';

import './styles.scss';

class PopoverComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopped: false
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.checkClosePopover);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.checkClosePopover);
    }

    checkClosePopover = (event) => {
        const {
            state: {
                isPopped
            }
        } = this;

        const {
            displayName
        } = PopoverComponent;

        const {
            target: {
                className
            }
        } = event;

        const isPopoverComponent = className.includes(displayName);

        if (isPopped && !isPopoverComponent) {
            this.togglePopover();
        }
    }

    togglePopover = () => {
        this.setState((previousState) => {
            const {
                isPopped
            } = previousState;

            return ({
                isPopped: !isPopped
            });
        });
    }

    handleOptionSelect = (action) => {
        this.togglePopover();

        action();
    }

    renderOptions = () => {
        const {
            props: {
                optionsList
            }
        } = this;

        const {
            displayName
        } = PopoverComponent;

        return optionsList.map((option, index) => {
            const {
                action,
                label
            } = option;

            return (
                <div
                    className={`${displayName}__popover-option`}
                    key={index}
                >
                    <Button
                        handleClick={() => this.handleOptionSelect(action)}
                        label={label}
                        styleType={BUTTON_STYLE_TYPE_INLINE}
                        type={BUTTON_TYPE_BUTTON}
                    />
                </div>
            );
        });
    }

    render() {
        const {
            state: {
                isPopped
            }
        } = this;

        const {
            displayName
        } = PopoverComponent;

        return (
            <div className={displayName}>
                <button
                    className={`${displayName}__toggle-button`}
                    onClick={this.togglePopover}
                    type={'button'}
                >
                    <span className={`${displayName}__icon`} />
                    <span className={`${displayName}__icon`} />
                    <span className={`${displayName}__icon`} />
                </button>
                {
                    isPopped
                    && (
                        <div className={`${displayName}__popover`}>
                            <div className={`${displayName}__popover-backdrop`} />
                            <div className={`${displayName}__popover-tab`} />
                            <div className={`${displayName}__popover-body`}>
                                {this.renderOptions()}
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

PopoverComponent.displayName = 'PopoverComponent';

PopoverComponent.propTypes = {
    optionsList: PropTypes.arrayOf(PropTypes.shape({
        action: PropTypes.func,
        label: PropTypes.string
    }))
};

PopoverComponent.defaultProps = {
    optionsList: []
};

export default PopoverComponent;
