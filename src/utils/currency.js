const currency = {
    format: (value) => new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(value),

    realTimeFormat: (value) => {
        const allowedCharacters = /[0-9.]/;

        const cleanedValue = value.split('')
            .filter((character) => allowedCharacters.test(character))
            .join('');

        const [
            dollars,
            cents
        ] = cleanedValue.split('.');

        const formattedValue = `${dollars ? '$' : ''}${!dollars && cents !== undefined ? '$0' : ''}${dollars}${cents !== undefined ? (`.${cents.slice(0, 2)}`) : ''}`;

        return formattedValue;
    },

    unFormat: (value) => parseFloat(new Intl.NumberFormat('en-US').format(value.toString().replace('$', '')))
};

export default currency;
