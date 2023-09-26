import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import "./utils/mongooseConnection.js";
import bodyParser from "body-parser";
import session from "express-session";
import { corsOptions, sessionOptions } from "./utils/authUtils.js";
import { setupLogging } from "./logging/setupMorgan.js";
import authRoute from "./routes/authRoute.js";
import { setupProxy } from "./proxy/setupProxy.js";
import { proxyRoutes } from "./proxy/proxyRoutes.js";

const port = process.env.GATEWAY_PORT || 1401;
const app = express();
app.use(cors(corsOptions));
setupLogging(app);
setupProxy(app, proxyRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(sessionOptions));

app.listen(port, () => {
  console.log(`Gateway server listening on port : ${port}`);
});

app.get("/", (req, res) => {
  res.send("Gatway home route");
});
app.use("/auth", authRoute);
