module.exports =  {
  "devServer" : {
    "/web/*": {
      "target": "http://sales.novanxyz.com",
      "secure": false,
      "changeOrigin": true
    },
    "/api/*": {
      "target": "http://sales.novanxyz.com",
      "secure": false,
      "changeOrigin": true
    },
  },
  devtool: "source-map",
  module: {
    rules:[
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader', options : { sourceMap: true}
          }, {
            loader: 'resolve-url-loader',
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
    ]
  }


}
