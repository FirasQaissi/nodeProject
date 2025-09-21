const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "..", "..", "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

function errorFileLogger(req, res, next) {
  res.on("finish", () => {
    console.log("📌 errorFileLogger called, status:", res.statusCode);

    if (res.statusCode >= 400) {
      const today = new Date().toISOString().split("T")[0];
      const logFile = path.join(logsDir, `${today}.log`);

      const logLine = `[${new Date().toISOString()}] ${res.statusCode} - ${
        res.statusMessage || "Unknown error"
      } - ${req.method} ${req.originalUrl}\n`;

      console.log("📌 writing log:", logLine);

      fs.appendFile(logFile, logLine, (fsErr) => {
        if (fsErr) console.error("❌ Failed to write log file:", fsErr);
        else console.log("✅ log written to", logFile);
      });
    }
  });

  next();
}

module.exports = {errorFileLogger};
