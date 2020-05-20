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

import TransactionEntryComponent from './index';

import {
    TRANSACTION_TYPES
} from '../../constants';

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
        transactionID: '48651563415',
        transactionSharedCost: number('transactionSharedCost', 123.55),
        transactionTitle: text('transactionTitle', transactionTitle),
        transactionTotalCost: number('transactionTotalCost', 410.52),
        transactionType: select('transactionType', transactionTypes, TRANSACTION_TYPES[0])
    };

    return (
        <ul
            style={{
                listStyle: 'none',
                margin: '0',
                padding: '0'
            }}
        >
            <TransactionEntryComponent
                deleteTransaction={(transactionID) => console.log(`deleted ${transactionID}`)}
                rowData={rowData}
                updateTransaction={(transactionData) => console.log({
                    transactionData
                })}
            />
        </ul>
    );
});
