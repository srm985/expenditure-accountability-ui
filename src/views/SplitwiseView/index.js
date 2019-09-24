const SplitwiseView = () => {
    const {
        location: {
            search: queryStrings
        }
    } = window;

    console.log({
        queryStrings
    });

    const extractedCode = queryStrings.replace('?code=');

    return null;
};

export default SplitwiseView;
