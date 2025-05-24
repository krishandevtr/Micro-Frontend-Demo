const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin.js');
const commonConfig = require('./webpack.common');
const Dep = require("../package.json").dependencies

const devConfig = {
    mode: 'development',
    output: {
      publicPath: 'http://localhost:8083/'    
    },
    devServer: {
        port: 8083,
        historyApiFallback: true,
        headers:{
            "Access-Control-Allow-Origin": "*"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: "dashboard",
            filename: "remoteEntry.js",
            exposes: {
                "./DashboardApp": "./src/bootstrap"
            },
            shared: Dep,
        })

    ]
}
module.exports = merge(commonConfig, devConfig);