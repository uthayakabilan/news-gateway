import dotenv from "dotenv";
dotenv.config();

export const proxyRoutes = [
  {
    url: "/feed",
    auth: true,
    proxy: {
      target: process.env.FEED_PROXY_LOCATION,
      changeOrigin: true,
    },
  },
  {
    url: "/save",
    auth: true,
    proxy: {
      target: process.env.SAVE_PROXY_LOCATION,
      changeOrigin: true,
    },
  },
];
