const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/app.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['vue-style-loader', 'css-loader']
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        compress: true,
        contentBase: '.',
        historyApiFallback: true,
        inline: true,
        port: 3000,
        hot: true,
        setup: function (app) {
            app.get('/data', function (req, res) {
                let data = fs.readFileSync('data.json');
                res.end(data);
            });
        }
    },
    plugins: [
        new ExtractTextPlugin('css/[name]-[hash:3].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: './commons.js'
        }),
        new webpack.HotModuleReplacementPlugin(), // 热加载
        new HtmlWebpackPlugin({
        // filename:'index.html',
            template: './index.html'
        })
    ]
};