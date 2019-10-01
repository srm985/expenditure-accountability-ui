const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    const plugins = [];

    const entry = './src/index.js';

    if (isDevelopment) {
        plugins.push(new HtmlWebpackPlugin({
            filename: 'index.html',
            path: path.join(__dirname, '../dist/'),
            template: './src/index.html'
        }));
    }

    return ({
        devServer: {
            contentBase: path.join(__dirname, '../dist/'),
            historyApiFallback: true,
            hot: true
        },
        entry,
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    test: /\.(js|jsx)$/,
                    use: [
                        'babel-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
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
                },
                {
                    loader: 'svg-inline-loader',
                    test: /\.svg$/
                }
            ]
        },
        output: {
            filename: 'index.js',
            path: `${__dirname}/dist`,
            publicPath: '/'
        },
        plugins,
        resolve: {
            extensions: [
                '*',
                '.js',
                '.jsx'
            ]
        }
    });
};
