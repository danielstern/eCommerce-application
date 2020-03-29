const { resolve } = require("path");

module.exports = {
    mode: "development",
    entry:"./index.js",
    output: {
        filename: 'main.js',
        path: resolve(__dirname, "..", "..", "bin")
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        "plugins":[
                            "@babel/transform-runtime"
                        ],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer: {
        historyApiFallback: false,
        contentBase: resolve(__dirname, "..", "..", "public")
    }
};