const mongoose = require('mongoose');
const chalk = require("chalk");




mongoose
.connect("mongodb://127.0.0.1:27017/business_card_app")
.then(()=>console.log(chalk.green("MongoDB Locally connected successfully")))
.catch((error)=>{console.error(chalk.red("MongoDB connection failed: ", error.message))});
