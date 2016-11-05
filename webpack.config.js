/**
 * Created by alvin on 16-11-2.
 */

module.exports = {
    entry: {
        "index": './src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.sass$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.(png)|(jpg)$/,
                loader: 'url?limit=50000'
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 8080,
        colors: true,
        inline: true,
        historyApiFallback: true
    }
};
