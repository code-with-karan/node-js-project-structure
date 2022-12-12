import "reflect-metadata";
import './schedulers';
import { createConnection } from "typeorm";
import * as path from 'path';
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import dbConfig from "./config/database";
import addErrorHandler from "./middleware/error-handler";
import cors from 'cors';

const multer = require('multer');
const upload = multer();
const PORT = process.env.PORT || 8000;
const app: Application = express();
const bodyParser = require('body-parser');

app.use(upload.array()); 
app.use(cors())
app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use(Router);
app.use(addErrorHandler);

createConnection(dbConfig).then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}).catch((err) => {
  console.log("Unable to connect to db", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error('err', err);
  console.log("Node NOT Exiting...");
});
