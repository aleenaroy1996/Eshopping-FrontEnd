const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/eshopping',
      {
        target: 'http://ec2-3-139-217-115.us-east-2.compute.amazonaws.com:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/eshopping': '' // remove the /api prefix
        }
      }
    )
  );
};
