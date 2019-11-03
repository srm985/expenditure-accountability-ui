import {
    withConsole
} from '@storybook/addon-console';
import {
    addDecorator,
    configure
} from '@storybook/react';
import {
    withKnobs
} from '@storybook/addon-knobs';

import '../src/styles/styles.scss';

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(withKnobs);

const requiredStories = require.context('../src/components/', true, /stories\.js$/);

const loadStories = () => {
    requiredStories.keys().forEach(requiredStories);
};

configure(loadStories, module);
