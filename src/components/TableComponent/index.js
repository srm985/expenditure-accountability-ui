import PropTypes from 'prop-types';
import React from 'react';

import TableRow from '../TableRowComponent';

import './styles.scss';

const TableComponent = (props) => {
    const {
        tableDataList,
        tableHeaderList
    } = props;

    const {
        displayName
    } = TableComponent;

    const tableHeaders = tableHeaderList.map((tableHeader) => (
        <th key={tableHeader}>
            {tableHeader}
        </th>
    ));

    const tableRows = tableDataList.map((tableRow) => {
        const {
            transactionID,
            ...remainingRowData
        } = tableRow;

        return (
            <TableRow
                key={transactionID}
                rowData={remainingRowData}
            />
        );
    });

    return (
        <table className={displayName}>
            <thead className={`${displayName}__header`}>
                <tr>{tableHeaders}</tr>
            </thead>
            <tbody className={`${displayName}__body`}>
                {tableRows}
            </tbody>
        </table>
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
