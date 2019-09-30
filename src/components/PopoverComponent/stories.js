import React from 'react';
import {
    storiesOf
} from '@storybook/react';

import PopoverComponent from './index';

const stories = storiesOf(PopoverComponent.displayName, module);

const POPOVER_OPTIONS = [
    {
        action: () => alert('action 1'),
        label: 'Edit'
    },
    {
        action: () => console.log('alert 2'),
        label: 'Delete'
    }
];

stories.add('default', () => (
    <div
        style={{
            padding: '100px'
        }}
    >
        <PopoverComponent
            optionsList={POPOVER_OPTIONS}
        />
    </div>
));
