import {
    withConsole
} from '@storybook/addon-console';
import {
    withKnobs
} from '@storybook/addon-knobs';
import {
    addDecorator,
    configure
} from '@storybook/react';

import '../src/styles/styles.scss';

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(withKnobs);

const requiredStories = require.context('../src/components/', true, /stories\.js$/);

const loadStories = () => {
    requiredStories.keys().forEach(requiredStories);
};

configure(loadStories, module);
