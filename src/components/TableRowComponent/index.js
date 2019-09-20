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
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

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

    handleToggleEdit = () => {
        this.setState((previousState) => {
            const {
                isEditing
            } = previousState;

            return ({
                isEditing: !isEditing
            });
        });
    }

    render() {
        const {
            props: {
                rowData
            },
            state: {
                isEditing
            }
        } = this;

        const {
            displayName
        } = TableRowComponent;

        const clonedRowData = JSON.parse(JSON.stringify(rowData));

        const buttonLabel = isEditing ? 'save' : 'edit';

        const cells = Object.keys(clonedRowData).map((cellName) => {
            const {
                [cellName]: cellValue
            } = clonedRowData;

            return (
                <td
                    className={`${displayName}__cell`}
                    key={cellValue}
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
                </td>
            );
        });

        return (
            <tr className={displayName}>
                {cells}
                <Button
                    className={`${displayName}__edit`}
                    handleClick={this.handleToggleEdit}
                    label={buttonLabel}
                    styleType={BUTTON_STYLE_TYPE_INLINE}
                    type={BUTTON_TYPE_BUTTON}
                />
            </tr>
        );
    }
}

TableRowComponent.displayName = 'TableRowComponent';

TableRowComponent.propTypes = {
    rowData: PropTypes.shape({})
};

TableRowComponent.defaultProps = {
    rowData: {}
};

export default TableRowComponent;
