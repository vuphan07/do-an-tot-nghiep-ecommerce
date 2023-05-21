const path = require("path");
module.exports = {
  pythonRecommend: (prams, callback) => {
    let spawn = require("child_process").spawn;
    const filePath = path.join(__dirname, "module3.py");
    var process = spawn("python3", [filePath, ...prams], {
      cwd: './src'
    });
    process.stdout.on("data", function (data) {
	console.log("training co data")
      callback?.(data);
    });
    process.stdout.on("error", function (err) {
      console.log("err", err);
    });
  },
};
