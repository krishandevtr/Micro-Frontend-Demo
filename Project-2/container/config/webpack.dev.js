const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin.js');
const commonConfig = require('./webpack.common')
const packageJson = require("../package.json").dependencies
const devConfig={
    mode:'development',
    output: {
        publicPath: 'http://localhost:8080/',
    },
    devServer:{
        port:8080,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new ModuleFederationPlugin({
            name:"host",
            remotes:{
                "marketing":"marketing@http://localhost:8081/remoteEntry.js",
                "auth":"auth@http://localhost:8082/remoteEntry.js",
                "dashboard":"dashboard@http://localhost:8083/remoteEntry.js",
            },
            shared:['react','react-dom'],
        })
    ]
}
module.exports = merge(commonConfig,devConfig);