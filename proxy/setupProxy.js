import { createProxyMiddleware } from "http-proxy-middleware";

export const setupProxy = (app, proxyRoutes) => {
  proxyRoutes.map((route) => {
    app.use(route.url, createProxyMiddleware(route.proxy));
  });
};
