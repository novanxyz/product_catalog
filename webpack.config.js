
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


  }


}
