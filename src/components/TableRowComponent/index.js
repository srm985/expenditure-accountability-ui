import PropTypes from 'prop-types';
import React from 'react';

import Button from '../ButtonComponent';
import Input from '../InputComponent';

import {
    BUTTON_STYLE_TYPE_INLINE,
    BUTTON_TYPE_BUTTON
} from '../ButtonComponent/config';

import './styles.scss';

class TableRowComponent extends React.Component {
    handleChange = (event) => {
        const {
            target: {
                name,
                value
            }
        } = event;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {
            props: {
                currentlyEditingTransactionID,
                handleClickEdit,
                rowData: {
                    transactionID,
                    ...otherRowData
                }
            }
        } = this;

        const {
            displayName
        } = TableRowComponent;

        const isEditing = transactionID === currentlyEditingTransactionID;

        const clonedRowData = JSON.parse(JSON.stringify(otherRowData));

        const buttonLabel = isEditing ? 'save' : 'edit';

        const cells = Object.keys(clonedRowData).map((cellName) => {
            const {
                [cellName]: cellValue
            } = clonedRowData;

            return (
                <span
                    className={`${displayName}__cell`}
                    key={cellName}
                >
                    {
                        isEditing
                            ? (
                                <Input
                                    defaultValue={cellValue}
                                    handleChange={this.handleChange}
                                    name={cellName}
                                />
                            )
                            : (
                                <span>
                                    {cellValue}
                                </span>
                            )
                    }
                </span>
            );
        });

        return (
            <li className={displayName}>
                {cells}
                <Button
                    className={`${displayName}__edit-button`}
                    handleClick={() => { handleClickEdit(transactionID); }}
                    label={buttonLabel}
                    styleType={BUTTON_STYLE_TYPE_INLINE}
                    type={BUTTON_TYPE_BUTTON}
                />
            </li>
        );
    }
}

TableRowComponent.displayName = 'TableRowComponent';

TableRowComponent.propTypes = {
    currentlyEditingTransactionID: PropTypes.string,
    handleClickEdit: PropTypes.func,
    rowData: PropTypes.shape({
        transactionID: PropTypes.string
    })
};

TableRowComponent.defaultProps = {
    currentlyEditingTransactionID: '',
    handleClickEdit: () => { },
    rowData: {}
};

export default TableRowComponent;
