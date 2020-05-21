import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import React from 'react';
import {
    withRouter
} from 'react-router-dom';

import Button from '../../components/ButtonComponent';
import Card from '../../components/CardComponent';
import FloatingFooter from '../../components/FloatingFooterComponent';
import Grid from '../../components/GridComponent';
import GridItem from '../../components/GridItemComponent';
import Header from '../../components/HeaderComponent';
import Input from '../../components/InputComponent';
import Select from '../../components/SelectComponent';

import {
    BUTTON_STYLE_TYPE_SECONDARY
} from '../../components/ButtonComponent/config';
import {
    INPUT_TYPE_DATE,
    INPUT_TYPE_TEL
} from '../../components/InputComponent/config';

import classNames from '../../utils/classNames';
import currency from '../../utils/currency';
import makeCall, {
    CALL_TYPE_PUT
} from '../../utils/restful';

import {
    TRANSACTION_TYPES,
    TRANSACTION_TYPE_LABELS,
    TRANSACTION_TYPE_PERSONAL
} from '../../constants';

import './styles.scss';

class BulkEntryView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactionList: []
        };
    }

    componentDidMount() {
        const initialRowCount = 50;

        const transactionList = [];

        for (let rowIndex = 0; rowIndex < initialRowCount; rowIndex++) {
            transactionList.push({
                transactionDate: '',
                transactionDescription: '',
                transactionKey: Math.random().toString(),
                transactionTitle: '',
                transactionTotalCost: '',
                transactionType: TRANSACTION_TYPE_PERSONAL
            });
        }

        this.setState({
            transactionList
        });
    }

    handleSubmitTransactions = async () => {
        const {
            props: {
                history
            },
            state: {
                transactionList
            }
        } = this;

        const formattedTransactionList = transactionList.map((transaction) => {
            const {
                transactionDate,
                transactionDescription,
                transactionTitle,
                transactionTotalCost,
                transactionType
            } = transaction;

            const formattedTransaction = {
                transactionDate,
                transactionDescription: transactionDescription.trim(),
                transactionTitle: transactionTitle.trim(),
                transactionTotalCost: currency.unFormat(transactionTotalCost),
                transactionType
            };

            return transactionTitle.trim() ? formattedTransaction : undefined;
        }).filter((transaction) => transaction);

        try {
            await makeCall({
                method: CALL_TYPE_PUT,
                payload: {
                    transactionList: formattedTransactionList
                },
                URL: '/api/add-bulk-transaction'
            });

            history.push('/dashboard');
        } catch (error) {
            // No action needed.
        }
    }

    handleChange = (event, index) => {
        const {
            target: {
                name,
                value
            }
        } = event;

        let formattedValue = value;

        if (name === 'transactionTotalCost') {
            formattedValue = currency.realTimeFormat(value);
        }

        this.setState((previousState) => {
            const {
                transactionList
            } = previousState;

            const clonedTransactionList = cloneDeep(transactionList);

            const {
                [index]: editingTransaction
            } = clonedTransactionList;

            clonedTransactionList[index] = {
                ...editingTransaction,
                [name]: formattedValue
            };

            return ({
                transactionList: clonedTransactionList
            });
        });
    }

    renderTableRows = () => {
        const {
            state: {
                transactionList
            }
        } = this;

        const {
            displayName
        } = BulkEntryView;

        const transactionTypeOptions = TRANSACTION_TYPES.map((transactionTypeOption) => {
            const {
                [transactionTypeOption]: label
            } = TRANSACTION_TYPE_LABELS;

            return ({
                label,
                value: transactionTypeOption
            });
        });

        return transactionList.map((rowData, index) => {
            const {
                transactionDate,
                transactionKey,
                transactionTitle,
                transactionTotalCost,
                transactionType
            } = rowData;

            const isRowPopulated = transactionDate && transactionTitle && transactionTotalCost && transactionType;

            const rowClassNames = classNames(
                `${displayName}__row`,
                {
                    [`${displayName}__row--populated`]: isRowPopulated
                }
            );

            return (
                <li
                    className={rowClassNames}
                    key={transactionKey}
                >
                    <Input
                        className={'mb--2'}
                        handleChange={(event) => this.handleChange(event, index)}
                        id={`transactionTitle-${transactionKey}`}
                        isRequired
                        label={'Title'}
                        name={'transactionTitle'}
                        placeholder={'transaction title'}
                        value={transactionTitle}
                    />
                    <Input
                        className={'mb--2'}
                        handleChange={(event) => this.handleChange(event, index)}
                        id={`transactionDate-${transactionKey}`}
                        isRequired
                        label={'Date'}
                        name={'transactionDate'}
                        placeholder={'transaction date'}
                        type={INPUT_TYPE_DATE}
                        value={transactionDate}
                    />
                    <Select
                        className={'mb--2'}
                        handleChange={(event) => this.handleChange(event, index)}
                        id={`transactionType-${transactionKey}`}
                        isRequired
                        label={'Type'}
                        name={'transactionType'}
                        options={transactionTypeOptions}
                        value={transactionType}
                    />
                    <Input
                        className={'mb--2'}
                        handleChange={(event) => this.handleChange(event, index)}
                        id={`transactionTotalCost-${transactionKey}`}
                        isRequired
                        label={'Total Cost'}
                        name={'transactionTotalCost'}
                        placeholder={'transaction total cost'}
                        type={INPUT_TYPE_TEL}
                        value={transactionTotalCost}
                    />
                </li>
            );
        });
    }

    renderTable = () => {
        const {
            displayName
        } = BulkEntryView;

        return (
            <ul className={`${displayName}__table`}>
                {this.renderTableRows()}
            </ul>
        );
    }

    render() {
        const {
            displayName
        } = BulkEntryView;

        return (
            <>
                <Header />
                <main className={displayName}>
                    <Grid>
                        <GridItem
                            columns={{
                                large: [
                                    3,
                                    11
                                ]
                            }}
                        >
                            <Card>
                                {this.renderTable()}
                            </Card>
                        </GridItem>
                    </Grid>
                </main>
                <FloatingFooter>
                    <Button
                        href={'/dashboard'}
                        label={'Cancel'}
                        styleType={BUTTON_STYLE_TYPE_SECONDARY}
                    />
                    <Button
                        handleClick={this.handleSubmitTransactions}
                        label={'Submit'}
                    />
                </FloatingFooter>
            </>
        );
    }
}

BulkEntryView.displayName = 'BulkEntryView';

BulkEntryView.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

BulkEntryView.defaultProps = {
    history: {}
};

export default withRouter(BulkEntryView);
