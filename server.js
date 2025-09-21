
const express = require("express");
const app = express();
const router = require("./router/router");
const cors = require("./middlewares/cors");
const  {handleError}  = require("./utils/errorHandler");
const logger = require("./logger/loggerService");
const chalk = require("chalk");
const connectToDb = require("./DB/dbService");
const {errorFileLogger} = require("./logger/loggers/errorFileLogger");

//const { connect } = require("mongoose");
const config = require("config");
const {generateInitialCards, generateInitialUsers} = require("./initialData/initialDataService");

// Middleware - App Level
app.use(cors);
app.use(logger)
app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));

//Error file logger middleware
app.use(errorFileLogger);

app.use(router);

// Error Handler Middleware
app.use((err, req, res, next) => {
  handleError(res, err.status || 500, err.message);
});


const PORT =  config.get("PORT");
app.listen(PORT, () => {
 console.log(`INIT SERVER ON : LOCALHOST :${PORT}`);
 connectToDb()

});