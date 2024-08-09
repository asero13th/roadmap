//write a back backend that listen on port
import express from "express";
import App from "./services/ExpressApp.js";
import { connectDB } from "./services/Database.js";

const startServer = async () => {
  const app = express();
  const port = 8000;
  connectDB();
  await App(app);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

startServer();