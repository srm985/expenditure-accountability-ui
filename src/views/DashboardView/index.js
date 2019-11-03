import React from 'react';
import moment from 'moment';

import Banner from '../../components/BannerComponent';
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
import currency from '../../utils/currency';
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
            hasExceededMonthlyLimit: false,
            isAddingTransaction: false,
            isPromptLinkSplitwiseModalShown: false,
            monthlyExpenditureLimit: 0
        };
    }

    componentDidMount() {
        this.retrieveEnteredTransactions();

        makeCall({
            method: CALL_TYPE_GET,
            URL: '/api/linked-splitwise'
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

        makeCall({
            method: CALL_TYPE_GET,
            URL: '/api/account-status'
        }).then((response) => {
            const {
                hasExceededMonthlyLimit,
                monthlyExpenditureLimit
            } = response;

            if (hasExceededMonthlyLimit) {
                this.toggleBannerShown();
            }

            this.setState({
                monthlyExpenditureLimit
            });
        }).catch(() => {
            // No action required.
        });
    }

    formatCalculatedTransactions = (calculatedTransactions) => {
        const formattedTransactions = calculatedTransactions.map((transaction) => {
            const {
                calculatedWeeklyExpenditure,
                date,
                didExceedWeeklyLimit,
                groceryExpense,
                personalExpense,
                sharedExpense
            } = transaction;

            return ({
                calculatedWeeklyExpenditure,
                didExceedWeeklyLimit,
                endDate: moment(date).format('DD.MM.YY'),
                groceryExpense: currency.format(groceryExpense),
                personalExpense: currency.format(personalExpense),
                sharedExpense: currency.format(sharedExpense),
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
            URL: '/api/retrieve-transactions'
        }).then((transactionList = []) => {
            const clonedTransactionList = JSON.parse(JSON.stringify(transactionList));

            this.setState({
                enteredTransactions: clonedTransactionList
            });
        }).catch(() => {
            // No action required.
        });
    }

    retrieveCalculatedTransactions = () => {
        makeCall({
            method: CALL_TYPE_GET,
            URL: '/api/calculated-transactions'
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
            URL: '/api/add-transaction'
        }).then(() => {
            this.toggleAddingTransaction();
            this.retrieveEnteredTransactions();
        }).catch(() => {
            // No action needed.
        });
    }

    updateExistingTransaction = (transactionData) => {
        makeCall({
            method: CALL_TYPE_PUT,
            payload: {
                ...transactionData
            },
            URL: '/api/edit-transaction'
        }).then(() => {
            this.retrieveEnteredTransactions();
        }).catch(() => {
            // No action needed.
        });
    }

    deleteExistingTransaction = (transactionID) => {
        makeCall({
            method: CALL_TYPE_DELETE,
            payload: {
                transactionID
            },
            URL: '/api/delete-transaction'
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

    toggleBannerShown = () => {
        this.setState((previousState) => {
            const {
                hasExceededMonthlyLimit
            } = previousState;

            return ({
                hasExceededMonthlyLimit: !hasExceededMonthlyLimit
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
                hasExceededMonthlyLimit,
                isAddingTransaction,
                isPromptLinkSplitwiseModalShown,
                monthlyExpenditureLimit
            }
        } = this;

        const {
            displayName
        } = DashboardView;

        return (
            <>
                <Header />
                <Banner
                    ctaLabel={'Understood'}
                    handleAcknowledge={this.toggleBannerShown}
                    isVisible={hasExceededMonthlyLimit}
                    subTitle={`You have exceeded your monthly expenditure limit of ${currency.format(monthlyExpenditureLimit)} and should discontinue any further spending.`}
                    title={'Monthly balance exceeded!'}
                />
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
