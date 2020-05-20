import {
    storiesOf
} from '@storybook/react';
import React from 'react';

import LoadingIndicatorComponent from './index';

const stories = storiesOf(LoadingIndicatorComponent.displayName, module);

stories.add('default', () => (
    <LoadingIndicatorComponent />
));
