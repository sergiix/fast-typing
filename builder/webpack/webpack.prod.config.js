var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');
var Webpack2Polyfill = require("webpack2-polyfill-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var _ = require('underscore');
var path = require('path');
var Handlebars = require('handlebars');
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
var DEV_PORT = process.env.DEV_PORT;

const extractSass = new ExtractTextPlugin({
    filename: 'styles.[contenthash:12].css',
    disable: IS_DEVELOPMENT
});

const extractCss = new ExtractTextPlugin({
    filename: 'themes.[contenthash:12].css',
    disable: IS_DEVELOPMENT
});

module.exports = {
    target: 'web',
    entry: data.getEntry({SRC_JS_DIR: SRC_JS_DIR}),
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, SRC_JS_DIR),
            path.resolve(__dirname, SRC_JS_DIR + 'modules/')
        ],
        alias: {
            underscore: 'underscore',
            Backbone: 'backbone',
            jquery: 'jbone',
            device: path.resolve(__dirname, SRC_DIR + 'vendors/device'),
            server: path.resolve(__dirname, SRC_JS_DIR + 'modules/server/server.request'),
            core: path.resolve(__dirname, SRC_JS_DIR + 'core'),
            model: path.resolve(__dirname, SRC_JS_DIR + 'core/core.model'),
            view: path.resolve(__dirname, SRC_JS_DIR + 'core/core.view'),
            collection: path.resolve(__dirname, SRC_JS_DIR + 'core/core.collection'),
            'core.events': path.resolve(__dirname, SRC_JS_DIR + 'core/core.events'),
            images: path.resolve(__dirname, SRC_IMAGES_DIR)
        },
        extensions: ['.js', '.jsx', '.txt', '.json', '.css']
    },
    plugins: [
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
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            sourceMap: true,
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            }
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].[hash:12].js.map',
        }),
        new Webpack2Polyfill(),
        new CopyWebpackPlugin([
            {
                context: SRC_DIR,
                from: {
                    glob: '**/*.json',
                    dot: true
                },
                to: DIST_DIR
            }
        ])
    ],
    module: {
        rules: [{
            test: /\.html$/,
            exclude: /node_modules/,
            use: ['raw-loader', 'html-minifier-loader']
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
                        [
                            "es2015",
                            {
                                "modules": false
                            }
                        ]
                    ],
                    plugins: [
                        "transform-object-rest-spread"
                    ]
                }
            }
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            use: 'raw-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            exclude: /node_modules/,
            use: 'url-loader?limit=100&name=images/[hash:12].[ext]'
        }, {

            test: /\.css$/,
            exclude: /node_modules/,
            use: extractCss.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }, {
        }, {

            test: /\.scss$/,
            exclude: /node_modules/,
            use: extractSass.extract({
                //use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"

            })
        }, {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
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
    }
};
