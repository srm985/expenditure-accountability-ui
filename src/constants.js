export const LOCAL_STORAGE_TOKEN = 'expenditure-accountability-token';

export const TRANSACTION_TYPE_GROCERY = 'grocery';
export const TRANSACTION_TYPE_PERSONAL = 'personal';
export const TRANSACTION_TYPE_SHARED = 'shared';

export const TRANSACTION_TYPES = [
    TRANSACTION_TYPE_GROCERY,
    TRANSACTION_TYPE_PERSONAL,
    TRANSACTION_TYPE_SHARED
];

export const TRANSACTION_TYPE_LABELS = {
    [TRANSACTION_TYPE_GROCERY]: 'Grocery Expense',
    [TRANSACTION_TYPE_PERSONAL]: 'Personal Expense',
    [TRANSACTION_TYPE_SHARED]: 'Shared Expense'
};
