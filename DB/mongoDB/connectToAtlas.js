const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config"); 

// Connect to MongoDB Atlas

const userName = config.get("DB_NAME");
const password = config.get("DB_PASSWORD");


mongoose
  .connect(`mongodb+srv://${userName}:${password}@hackeru2.vzfcpxw.mongodb.net/`)
  .then(()=>console.log(chalk.bgGreenBright("MongoDB Productions connected successfully")))
  .catch((error)=>{console.error(chalk.red("MongoDB connection failed: ", error.message))});
  