import React from 'react';
import {
    storiesOf
} from '@storybook/react';
import {
    boolean,
    date,
    number,
    select,
    text
} from '@storybook/addon-knobs';

import TransactionEntryComponent, {
    TRANSACTION_TYPES
} from './index';

const stories = storiesOf(TransactionEntryComponent.displayName, module);


stories.add('default', () => {
    const defaultDate = new Date();
    const transactionDescription = 'Ex non enim sint reprehenderit nostrud';
    const transactionTitle = 'Whole Foods';
    const transactionTypes = {};

    TRANSACTION_TYPES.forEach((transactionType) => {
        transactionTypes[transactionType] = transactionType;
    });

    const rowData = {
        isEditable: boolean('isEditable', true),
        transactionDate: date('transactionDate', defaultDate),
        transactionDescription: text('transactionDescription', transactionDescription),
        transactionTitle: text('transactionTitle', transactionTitle),
        transactionType: select('transactionType', transactionTypes),
        transactionValue: number('transactionValue', 123.55)
    };

    return (
        <TransactionEntryComponent
            rowData={rowData}
        />
    );
});
