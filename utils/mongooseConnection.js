import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.NEWS_APP_SERVER_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongo DB Connected`);
  })
  .catch((err) => {
    console.log(`Mongo Error`);
    console.log(err);
  });
