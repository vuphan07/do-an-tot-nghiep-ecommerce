require("dotenv").config();
const app = require("./src/app");
const rateModel = require("./src/v1/models/rate.model");
const https = require("https");
const fs = require("fs");
const cron = require("node-cron");
const { pythonRecommend } = require("./src/python.service");

const options = {
  key: fs.readFileSync("./conf/key.pem"),
  cert: fs.readFileSync("./conf/cert.pem"),
  //ca: fs.readFileSync('yourdomain.csr')
};
let training = 1;


cron.schedule("0 */12 * * *", () => {
  console.log("training")

  fs.writeFile("countTraining.txt", training.toString(), (error) => {
    if (error) {
      console.error("Error writing to file:", error);
    } else {
      console.log("File write operation completed successfully.");
    }
  });
  pythonRecommend(["updatematrix"], () => {});
  training += 1;
});

const { PORT } = process.env;

const httpsServer = https.createServer(options, app);

const server = httpsServer.listen(PORT, () => {
  console.log(`WSV start with port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`exits server express`));
});
