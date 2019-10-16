import PropTypes from 'prop-types';
import React from 'react';

import TransactionEntry from '../TransactionEntryComponent';

import './styles.scss';

const TableComponent = (props) => {
    const {
        tableDataList,
        tableHeaderList,
        ...passedProps
    } = props;

    const {
        displayName
    } = TableComponent;

    const tableRows = tableDataList.map((tableRow) => {
        const {
            transactionID
        } = tableRow;

        return (
            <TransactionEntry
                {...passedProps}
                key={transactionID}
                rowData={tableRow}
            />
        );
    });

    return (
        <ul className={displayName}>
            {tableRows}
        </ul>
    );
};

TableComponent.displayName = 'TableComponent';

TableComponent.propTypes = {
    tableDataList: PropTypes.arrayOf(PropTypes.shape([])),
    tableHeaderList: PropTypes.arrayOf(PropTypes.string)
};

TableComponent.defaultProps = {
    tableDataList: [],
    tableHeaderList: []
};

export default TableComponent;
