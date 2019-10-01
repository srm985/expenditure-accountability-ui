import React from 'react';
import {
    storiesOf
} from '@storybook/react';

import LoadingIndicatorComponent from './index';

const stories = storiesOf(LoadingIndicatorComponent.displayName, module);

stories.add('default', () => (
    <LoadingIndicatorComponent />
));
