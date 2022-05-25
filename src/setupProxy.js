const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://help-hours.herokuapp.com:"+process.env.PORT,
      changeOrigin: true,
    })
  );
};
