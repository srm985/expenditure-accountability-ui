import React from 'react';
import moment from 'moment';

import Button from '../../components/ButtonComponent';
import Grid from '../../components/GridComponent';
import GridItem from '../../components/GridItemComponent';
import Header from '../../components/HeaderComponent';
import Input from '../../components/InputComponent';
import TableComponent from '../../components/TableComponent';

import {
    BUTTON_STYLE_TYPE_INLINE,
    BUTTON_TYPE_SUBMIT
} from '../../components/ButtonComponent/config';
import {
    INPUT_TYPE_DATE,
    INPUT_TYPE_TEL
} from '../../components/InputComponent/config';

import classNames from '../../utils/classNames';
import makeCall, {
    CALL_TYPE_GET,
    CALL_TYPE_PUT
} from '../../utils/restful';

import './styles.scss';

class DashboardView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calculatedTransactions: [],
            currentTab: 0,
            enteredTransactions: []
        };
    }

    componentDidMount() {
        this.retrieveEnteredTransactions();
    }

    formatEnteredTransactions = (enteredTransactions) => {
        const formattedTransactions = enteredTransactions.map((transaction) => {
            const {
                date,
                groceryExpense,
                personalExpense,
                sharedExpense,
                transactionID
            } = transaction;

            /* eslint-disable sort-keys */
            return ({
                transactionID,
                date: moment(date).format('DD MMM YYYY'),
                personalExpense: `$${personalExpense}`,
                sharedExpense: `$${sharedExpense}`,
                groceryExpense: `$${groceryExpense}`
            });
            /* eslint-enable sort-keys */
        });

        this.setState({
            enteredTransactions: formattedTransactions
        });
    }

    retrieveEnteredTransactions = () => {
        makeCall({
            method: CALL_TYPE_GET,
            URL: 'http://localhost:3100/api/retrieve-transactions'
        }).then((response) => {
            console.log({
                response
            });

            this.formatEnteredTransactions(response);
        }).catch(() => {
            // No action required.
        });
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

    handleChangeTab = (selectedTabNumber) => {
        this.setState({
            currentTab: selectedTabNumber
        });
    }

    renderAddEntry = () => {
        const {
            state: {
                date,
                groceryExpense,
                personalExpense,
                sharedExpense
            }
        } = this;

        const handleSubmitEntry = (event) => {
            event.preventDefault();

            makeCall({
                method: CALL_TYPE_PUT,
                payload: {
                    date,
                    groceryExpense,
                    personalExpense,
                    sharedExpense
                },
                URL: 'http://localhost:3100/api/add-transaction'
            }).then(() => {
                this.retrieveEnteredTransactions();
            }).catch(() => {
                // No action needed.
            });
        };

        return (
            <form onSubmit={handleSubmitEntry}>
                <Input
                    handleChange={this.handleChange}
                    name={'date'}
                    placeholder={'date'}
                    type={INPUT_TYPE_DATE}
                />
                <Input
                    handleChange={this.handleChange}
                    name={'personalExpense'}
                    placeholder={'personal expense'}
                    type={INPUT_TYPE_TEL}
                />
                <Input
                    handleChange={this.handleChange}
                    name={'sharedExpense'}
                    placeholder={'shared expense'}
                    type={INPUT_TYPE_TEL}
                />
                <Input
                    handleChange={this.handleChange}
                    name={'groceryExpense'}
                    placeholder={'grocery expense'}
                    type={INPUT_TYPE_TEL}
                />
                <Button
                    label={'submit'}
                    styleType={BUTTON_STYLE_TYPE_INLINE}
                    type={BUTTON_TYPE_SUBMIT}
                />
            </form>
        );
    }

    renderDashboardViews = () => {
        const {
            state: {
                calculatedTransactions,
                currentTab,
                enteredTransactions
            }
        } = this;

        const tableDataList = currentTab === 0 ? enteredTransactions : calculatedTransactions;

        const tableHeaderList = currentTab === 0
            ? [
                'Date',
                'Personal Expense',
                'Shared Expense',
                'Grocery Expense'
            ]
            : [
                'Date',
                'Personal Expense',
                'Shared Expense',
                'Grocery Expense'
            ];

        return (
            <>
                <TableComponent
                    tableDataList={tableDataList}
                    tableHeaderList={tableHeaderList}
                />
                {this.renderAddEntry()}
            </>
        );
    }

    renderTabs = () => {
        const {
            state: {
                currentTab
            }
        } = this;

        const {
            displayName
        } = DashboardView;

        const renderTabButtons = () => [
            'Expenses',
            'Calculated Expenses'
        ].map((tabName, tabNumber) => {
            const tabClassNames = classNames(
                `${displayName}__tab`, {
                    [`${displayName}__tab--active`]: tabNumber === currentTab
                }
            );

            return (
                <button
                    className={tabClassNames}
                    key={tabName}
                    onClick={() => { this.handleChangeTab(tabNumber); }}
                    type={'button'}
                >
                    {tabName}
                </button>
            );
        });

        return (
            <div className={`${displayName}__tabs-wrapper`}>
                {renderTabButtons()}
            </div>
        );
    }

    render() {
        const {
            displayName
        } = DashboardView;

        return (
            <section className={displayName}>
                <Header />
                <Grid>
                    <GridItem
                        columns={{
                            large: [
                                1,
                                12
                            ]
                        }}
                    >
                        {this.renderDashboardViews()}
                    </GridItem>
                </Grid>
                {this.renderTabs()}
            </section>
        );
    }
}

DashboardView.displayName = 'DashboardView';

export default DashboardView;
