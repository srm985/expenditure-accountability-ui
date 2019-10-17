import PropTypes from 'prop-types';
import React from 'react';

import Button from '../ButtonComponent';

import {
    BUTTON_STYLE_TYPE_INLINE
} from '../ButtonComponent/config';

import currency from '../../utils/currency';

const HIDE_LABEL = 'hide';
const SHOW_LABEL = 'show';

class MaskedMoneyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMasked: true,
            label: SHOW_LABEL
        };
    }

    toggleMasked = () => {
        this.setState((previousState) => {
            const {
                isMasked: wasMasked
            } = previousState;

            return ({
                isMasked: !wasMasked,
                label: wasMasked ? HIDE_LABEL : SHOW_LABEL
            });
        });
    }

    renderCurrentValue = () => {
        const {
            props: {
                value
            },
            state: {
                isMasked
            }
        } = this;

        return isMasked ? '$XXX.XX' : currency.format(value);
    }

    render() {
        const {
            state: {
                label
            }
        } = this;

        const {
            displayName
        } = MaskedMoneyComponent;

        return (
            <div className={displayName}>
                <span>
                    {this.renderCurrentValue()}
                </span>
                <Button
                    className={'ml--1'}
                    label={label}
                    handleClick={this.toggleMasked}
                    styleType={BUTTON_STYLE_TYPE_INLINE}
                />
            </div>
        );
    }
}

MaskedMoneyComponent.displayName = 'MaskedMoneyComponent';

MaskedMoneyComponent.propTypes = {
    value: PropTypes.number
};

MaskedMoneyComponent.defaultProps = {
    value: 0
};

export default MaskedMoneyComponent;
