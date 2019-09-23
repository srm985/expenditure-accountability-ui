import PropTypes from 'prop-types';
import React from 'react';

import TableRow from '../TableRowComponent';

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

    const tableHeaders = tableHeaderList.map((tableHeader) => (
        <span
            className={`${displayName}__header-column`}
            key={tableHeader}
        >
            {tableHeader}
        </span>
    ));

    const tableRows = tableDataList.map((tableRow) => {
        const {
            transactionID
        } = tableRow;

        return (
            <TableRow
                {...passedProps}
                key={transactionID}
                rowData={tableRow}
            />
        );
    });

    return (
        <ul className={displayName}>
            <li className={`${displayName}__header`}>
                {tableHeaders}
            </li>
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
