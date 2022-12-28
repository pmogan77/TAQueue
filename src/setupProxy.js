const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://0.0.0.0:"+process.env.PORT,
      changeOrigin: true,
    })
  );

  app.use(
    "/register.js",
    createProxyMiddleware({
      target: "http://0.0.0.0:"+process.env.PORT,
      changeOrigin: true,
    })
  );
};
