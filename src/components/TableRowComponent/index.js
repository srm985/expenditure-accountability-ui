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
                    handleClick={this.handleToggleEdit}
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
    rowData: PropTypes.shape({})
};

TableRowComponent.defaultProps = {
    rowData: {}
};

export default TableRowComponent;
