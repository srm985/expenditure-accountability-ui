const path = require('path');

module.exports = async ({
    config
}) => {
    config.module.rules.push({
        include: path.resolve(__dirname, '../'),
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    });

    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.map((data) => {
        const {
            test: currentTest
        } = data;

        let newTest = currentTest;

        if (/svg\|/.test(String(data.test))) {
            newTest = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
        }

        return {
            ...data,
            test: newTest
        };
    });

    config.module.rules.push({
        test: /\.(gif|png|jpe?g)$/i,
        use: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                options: {
                    disable: true
                }
            }
        ]
    });

    config.module.rules.push({
        loader: 'svg-inline-loader',
        test: /\.svg$/
    });

    return config;
};
