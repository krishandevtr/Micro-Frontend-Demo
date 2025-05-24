const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin.js');
const commonConfig = require('./webpack.common');
const Dep = require("../package.json").dependencies

const devConfig = {
    mode: 'development',
    output: {
      publicPath: 'http://localhost:8082/'    
    },
    devServer: {
        port: 8082,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: "auth",
            filename: "remoteEntry.js",
            exposes: {
                "./AuthApp": "./src/bootstrap"
            },
            shared: Dep,
        })

    ]
}
module.exports = merge(commonConfig, devConfig);