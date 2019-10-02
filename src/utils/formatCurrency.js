const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency'
}).format(value);

export default formatCurrency;
