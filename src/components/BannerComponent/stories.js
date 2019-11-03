import React from 'react';
import {
    storiesOf
} from '@storybook/react';

import BannerComponent from './index';

import Button from '../ButtonComponent';

const stories = storiesOf(BannerComponent.displayName, module);

class Demo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        };
    }

    toggleVisible = () => {
        this.setState((previousState) => {
            const {
                isVisible
            } = previousState;

            return ({
                isVisible: !isVisible
            });
        });
    }

    render() {
        const {
            state: {
                isVisible
            }
        } = this;

        return (
            <>
                <BannerComponent
                    handleAcknowledge={this.toggleVisible}
                    isVisible={isVisible}
                    subTitle={'Velit aliqua aliqua culpa sit magna irure et ex quis elit.'}
                    title={'Laborum magna officia pariatur amet.'}
                />
                <div
                    style={{
                        bottom: '20px',
                        left: '20px',
                        position: 'fixed'
                    }}
                >
                    <Button
                        handleClick={this.toggleVisible}
                        label={'toggle banner'}
                    />
                </div>
            </>
        );
    }
}

stories.add('default', () => (<Demo />));
