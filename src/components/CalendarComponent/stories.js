import React from 'react';
import {
    storiesOf
} from '@storybook/react';

import CalendarComponent from './index';

const stories = storiesOf(CalendarComponent.displayName, module);

const MOCKED_DATA = [
    {
        didExceedWeeklyLimit: true,
        endDate: '19 Oct 2019',
        startDate: '12 Oct 2019'
    },
    {
        didExceedWeeklyLimit: false,
        endDate: '27 Oct 2019',
        startDate: '20 Oct 2019'
    },
    {
        didExceedWeeklyLimit: false,
        endDate: '3 Nov 2019',
        startDate: '28 Oct 2019'
    },
    {
        didExceedWeeklyLimit: true,
        endDate: '11 Nov 2019',
        startDate: '4 Nov 2019'
    },
    {
        didExceedWeeklyLimit: true,
        endDate: '19 Nov 2019',
        startDate: '12 Nov 2019'
    },
    {
        didExceedWeeklyLimit: false,
        endDate: '27 Nov 2019',
        startDate: '20 Nov 2019'
    }
];

stories.add('default', () => (
    <div
        style={{
            maxWidth: '600px',
            width: '100%'
        }}
    >
        <CalendarComponent weekList={MOCKED_DATA} />
    </div>
));
