import React from 'react';
import moment from 'moment';

import Calendar from '../../components/CalendarComponent';
import Card from '../../components/CardComponent';
import FAB from '../../components/FABComponent';
import Grid from '../../components/GridComponent';
import GridItem from '../../components/GridItemComponent';
import Header from '../../components/HeaderComponent';
import Table from '../../components/TableComponent';

import AddTransaction from '../../modules/AddTransactionModule';
import LinkSplitwise from '../../modules/LinkSplitwiseModule';

import classNames from '../../utils/classNames';
import formatCurrency from '../../utils/formatCurrency';
import makeCall, {
    CALL_TYPE_DELETE,
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
            enteredTransactions: [],
            isAddingTransaction: false,
            isPromptLinkSplitwiseModalShown: false
        };
    }

    componentDidMount() {
        this.retrieveEnteredTransactions();

        makeCall({
            method: CALL_TYPE_GET,
            URL: 'http://localhost:3100/api/linked-splitwise'
        }).then((response) => {
            const {
                isLinked
            } = response;

            if (!isLinked) {
                this.toggleSplitwisePromptModalVisible();
            }
        }).catch(() => {
            // No action required.
        });
    }

    formatEnteredTransactions = (enteredTransactions) => {
        const formattedTransactions = enteredTransactions.map((transaction) => {
            const {
                date,
                groceryExpense,
                isEditable,
                personalExpense,
                sharedExpense,
                transactionID
            } = transaction;

            /* eslint-disable sort-keys */
            return ({
                transactionID,
                isEditable,
                date: moment(date).format('DD.MM.YY'),
                personalExpense: formatCurrency(personalExpense),
                sharedExpense: formatCurrency(sharedExpense),
                groceryExpense: formatCurrency(groceryExpense)
            });
            /* eslint-enable sort-keys */
        });

        this.setState({
            enteredTransactions: formattedTransactions
        });
    }

    formatCalculatedTransactions = (calculatedTransactions) => {
        const formattedTransactions = calculatedTransactions.map((transaction) => {
            const {
                date,
                didExceedWeeklyLimit,
                groceryExpense,
                personalExpense,
                sharedExpense
            } = transaction;

            return ({
                didExceedWeeklyLimit,
                endDate: moment(date).format('DD.MM.YY'),
                groceryExpense: formatCurrency(groceryExpense),
                personalExpense: formatCurrency(personalExpense),
                sharedExpense: formatCurrency(sharedExpense),
                startDate: moment(date).subtract(6, 'days').format('DD.MM.YY')
            });
        });

        this.setState({
            calculatedTransactions: formattedTransactions
        });
    }

    retrieveEnteredTransactions = () => {
        makeCall({
            method: CALL_TYPE_GET,
            URL: 'http://localhost:3100/api/retrieve-transactions'
        }).then((response) => {
            this.formatEnteredTransactions(response);
        }).catch(() => {
            // No action required.
        });
    }

    retrieveCalculatedTransactions = () => {
        makeCall({
            method: CALL_TYPE_GET,
            URL: 'http://localhost:3100/api/calculated-transactions'
        }).then((response) => {
            this.formatCalculatedTransactions(response);
        }).catch(() => {
            // No action required.
        });
    }

    addTransaction = (transactionData) => {
        makeCall({
            method: CALL_TYPE_PUT,
            payload: {
                ...transactionData
            },
            URL: 'http://localhost:3100/api/add-transaction'
        }).then(() => {
            this.toggleAddingTransaction();
            this.retrieveEnteredTransactions();
        }).catch(() => {
            // No action needed.
        });
    }

    updateExistingTransaction = (transactionData) => {
        console.log({
            transactionData
        });
    }

    deleteExistingTransaction = (transactionID) => {
        makeCall({
            method: CALL_TYPE_DELETE,
            payload: {
                transactionID
            },
            URL: 'http://localhost:3100/api/delete-transaction'
        }).then(() => {
            this.retrieveEnteredTransactions();
        }).catch(() => {
            // No action needed.
        });
    }

    handleChangeTab = (selectedTabNumber) => {
        if (selectedTabNumber === 0) {
            this.retrieveEnteredTransactions();
        } else {
            this.retrieveCalculatedTransactions();
        }

        this.setState({
            currentTab: selectedTabNumber
        });
    }

    toggleAddingTransaction = () => {
        this.setState((previousState) => {
            const {
                isAddingTransaction
            } = previousState;

            return ({
                isAddingTransaction: !isAddingTransaction
            });
        });
    }

    toggleSplitwisePromptModalVisible = () => {
        this.setState((previousState) => {
            const {
                isPromptLinkSplitwiseModalShown
            } = previousState;

            return ({
                isPromptLinkSplitwiseModalShown: !isPromptLinkSplitwiseModalShown
            });
        });
    }

    renderDashboardViews = () => {
        const {
            state: {
                calculatedTransactions,
                currentTab,
                enteredTransactions
            }
        } = this;


        const tableHeaderList = [
            'Date',
            'Personal Expense',
            'Shared Expense',
            'Grocery Expense'
        ];

        return (
            currentTab === 0
                ? (
                    <Table
                        deleteTransaction={this.deleteExistingTransaction}
                        tableDataList={enteredTransactions}
                        tableHeaderList={tableHeaderList}
                        updateTransaction={this.updateExistingTransaction}
                    />
                )
                : (
                    <Calendar weekList={calculatedTransactions} />
                )
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
                `${displayName}__tab`,
                {
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
            state: {
                isAddingTransaction,
                isPromptLinkSplitwiseModalShown
            }
        } = this;

        const {
            displayName
        } = DashboardView;

        return (
            <>
                <Header />
                <main className={displayName}>
                    <Grid>
                        <GridItem
                            columns={{
                                large: [
                                    1,
                                    13
                                ]
                            }}
                        >
                            <Card>
                                {this.renderDashboardViews()}
                            </Card>
                        </GridItem>
                    </Grid>

                </main>
                {this.renderTabs()}
                <AddTransaction
                    isAddingTransaction={isAddingTransaction}
                    handleCancel={this.toggleAddingTransaction}
                    handleSubmit={this.addTransaction}
                />
                <FAB handleClick={this.toggleAddingTransaction} />
                {
                    isPromptLinkSplitwiseModalShown
                    && (
                        <LinkSplitwise
                            toggleModal={this.toggleSplitwisePromptModalVisible}
                        />
                    )
                }
            </>
        );
    }
}

DashboardView.displayName = 'DashboardView';

export default DashboardView;
