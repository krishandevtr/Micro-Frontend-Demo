const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin.js');  
const commonConfig = require('./webpack.common');
const Dep = require("../package.json").dependencies

const devConfig={
    mode:'development',
    output: {
        publicPath: 'http://localhost:8081/',
    },
    devServer:{
        port:8081,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new ModuleFederationPlugin({
            name:"marketing",
            filename:"remoteEntry.js",
            exposes:{
                "./MarketingApp":"./src/bootstrap"
            },
            shared:Dep,
        })
        
    ]
}
module.exports = merge(commonConfig,devConfig);