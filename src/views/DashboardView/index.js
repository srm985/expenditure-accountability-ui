import React from 'react';

import Grid from '../../components/GridComponent';
import GridItem from '../../components/GridItemComponent';
import Header from '../../components/HeaderComponent';
import TableComponent from '../../components/TableComponent';

import classNames from '../../utils/classNames';
import makeCall, {
    CALL_TYPE_GET
} from '../../utils/restful';

import './styles.scss';

const MOCKED_TABLE_DATA = [
    {
        date: '2019-05-07',
        groceryExpense: 100,
        personalExpense: 123,
        sharedExpense: 5678,
        transactionID: Math.random().toString()
    },
    {
        date: '2019-05-07',
        groceryExpense: 100,
        personalExpense: 123,
        sharedExpense: 5678,
        transactionID: Math.random().toString()
    },
    {
        date: '2019-05-07',
        groceryExpense: 100,
        personalExpense: 123,
        sharedExpense: 5678,
        transactionID: Math.random().toString()
    },
    {
        date: '2019-05-07',
        groceryExpense: 100,
        personalExpense: 123,
        sharedExpense: 5678,
        transactionID: Math.random().toString()
    },
    {
        date: '2019-05-07',
        groceryExpense: 100,
        personalExpense: 123,
        sharedExpense: 5678,
        transactionID: Math.random().toString()
    }
];

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

    }

    retrieveEnteredTransactions = () => {
        makeCall({
            method: CALL_TYPE_GET,
            URL: 'http://localhost:3100/api/retrieve-transactions'
        }).then((response) => {
            console.log({
                response
            });
            this.setState({
                enteredTransactions: response
            });
        }).catch(() => {
            // No action required.
        });
    }

    handleChangeTab = (selectedTabNumber) => {
        this.setState({
            currentTab: selectedTabNumber
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

        const tableDataList = currentTab === 0 ? MOCKED_TABLE_DATA : calculatedTransactions;

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
            <TableComponent
                tableDataList={tableDataList}
                tableHeaderList={tableHeaderList}
            />
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
