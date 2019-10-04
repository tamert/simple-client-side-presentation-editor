const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "src/index.html"),
    filename: "./index.html"
});

const common = require('./webpack.common.js');
const rules = require('./webpack.rules.js');

const styleLoader = {
    loader: MiniCssExtractPlugin.loader
};

rules[1].use.unshift(styleLoader);
rules[2].use.unshift(styleLoader);

module.exports = merge(common, {
    mode: 'production',

    devtool: 'source-map',

    entry: path.resolve(__dirname, './src/index.js'),

    externals: {
        react: 'react'
    },

    module: {
        rules: rules
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin(),
        htmlWebpackPlugin
    ],

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

});
