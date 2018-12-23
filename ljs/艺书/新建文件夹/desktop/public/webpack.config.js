var webpack = require("webpack");

module.exports = {
    entry:  {
      login: __dirname + '/jsx/login.jsx',
      main: __dirname + '/jsx/main.jsx'
    },
    output: {
        path: __dirname + '/js/build',
        filename: '[name].build.js'
    },
    externals: {
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: {
          //css
        },
        modules: [
            'node_modules',
            'bower_components'
        ]
    },
    module: {
        loaders: [
          { test: /\.jsx$/, exclude: /node_modules/,
              loader: 'babel-loader', query: { presets: ['react', 'es2015']}},
          { test: /\.js$/, exclude: /node_modules/,
              loader: 'babel-loader', query: { presets: ['es2015']}},
          {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader'},
          { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    plugins: [
      new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
      })
    ]
};