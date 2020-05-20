import {
    boolean,
    text
} from '@storybook/addon-knobs';
import {
    storiesOf
} from '@storybook/react';
import React from 'react';

import SelectComponent from './index';

const stories = storiesOf(SelectComponent.displayName, module);

stories.add('default', () => {
    const DEMO_OPTIONS = [
        {
            label: 'Option 1',
            value: 'option1'
        },
        {
            label: 'Option 2',
            value: 'option2'
        },
        {
            label: 'Option 3',
            value: 'option3'
        },
        {
            label: 'Option 4',
            value: 'option4'
        }
    ];

    const defaultValue = text('defaultValue', '');
    const isRequired = boolean('isRequired', false);

    return (
        <SelectComponent
            defaultValue={defaultValue}
            isRequired={isRequired}
            label={'demo select'}
            name={'demo-select'}
            options={DEMO_OPTIONS}
        />
    );
});
