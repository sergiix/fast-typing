var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var SpritesmithPlugin = require('webpack-spritesmith');
var Webpack2Polyfill = require("webpack2-polyfill-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var Handlebars = require('handlebars');
var _ = require('underscore');
var path = require('path');
var util = require('util');
var fs = require('fs');
var data = require('./webpack.data');

const PROJECT_TITLE = 'Try App';

const ENVIRONMENT = process.env.NODE_ENV;
const IS_PRODUCTION = ENVIRONMENT === 'production';
const IS_DEVELOPMENT = ENVIRONMENT === 'development';

const SRC_DIR = path.join(__dirname, '../../src/');
const SRC_JS_DIR = SRC_DIR + 'js/';
const SRC_CSS_DIR = SRC_DIR + 'css/';
const SRC_STYLES_DIR = SRC_DIR + 'css/';
const SRC_IMAGES_DIR = SRC_DIR + 'images/';
const DIST_DIR = path.resolve(__dirname, '../../dist/');

var DEV_HOST = process.env.DEV_HOSTNAME;
var DEV_PORT = '3000';

const extractSass = new ExtractTextPlugin({
    filename: 'styles.[contenthash:12].css',
    disable: IS_DEVELOPMENT
});
const extractCss = new ExtractTextPlugin({
    filename: '[name].[contenthash:12].css',
    disable: IS_DEVELOPMENT
});


module.exports = {
    target: 'web',
    entry: data.getEntry({SRC_JS_DIR: SRC_JS_DIR}),
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, SRC_JS_DIR)
        ],
        extensions: ['.js', '.jsx', '.txt', '.json', '.css']
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HTMLWebpackPlugin({
            title: PROJECT_TITLE,
            template: SRC_DIR + 'index.html',
            favicon: SRC_DIR + 'favicon.ico',
            expires: new Date(),
            lastModified: new Date()
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(ENVIRONMENT)
            },
            __DEV__: JSON.stringify(IS_DEVELOPMENT),
            __PROD__: JSON.stringify(IS_PRODUCTION)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: Infinity
        }),
        new webpack.HotModuleReplacementPlugin(),
        extractSass,
        extractCss,
        new Webpack2Polyfill(),
    ],
    module: {
        // Disable handling of requires with a single expression
        exprContextRegExp: /$^/,
        exprContextCritical: false,
        // Disable handling of requires with expression wrapped by string,
        wrappedContextRegExp: /$^/,
        wrappedContextCritical: false,
        rules: [{
            test: /\.html$/,
            exclude: /node_modules/,
            use: 'html-loader'
        }, {
            test: /\.txt$/,
            exclude: /node_modules/,
            use: 'text-loader'
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',

                query: {
                    cacheDirectory: true, //important for performance
                    presets: [
                        "stage-0",
                        "react",
                        "es2015"
                    ]
                }
            }
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            exclude: /node_modules/,
            use: 'url-loader?limit=100&name=images/[hash:12].[ext]'
        }, {

            test: /\.scss$/,
            exclude: /node_modules/,
            //use: ['css-loader', 'postcss-loader', 'sass-loader']
            use: extractSass.extract({
                //use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"

            })
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: extractCss.extract({
                //use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
                use: [{
                    loader: "css-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"

            })
        }, {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
            test: /\.(json)$/,
            loader: 'file-loader?name=[name].[ext]'
        }],
        loaders: [{
            test: /\.svg$/,
            loader: 'svg-inline'
        }]
    },
    output: {
        path: DIST_DIR,
        publicPath: '',
        filename: '[name].[hash:12].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: DIST_DIR,
        compress: false,
        disableHostCheck: true,
        host: DEV_HOST,
        port: DEV_PORT,
        hot: true,
        inline: true,
        overlay: false
    }
};
