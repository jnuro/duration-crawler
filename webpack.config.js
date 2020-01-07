const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js'
    },
    target: 'node',
    module: {
        rules: [
          {
            test: /\.js$/,
            include: [
              path.resolve(__dirname, 'src/js')
            ],
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              }
            }
          }
        ]
    },
    node: {
      __dirname: true,
    },
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development'
}