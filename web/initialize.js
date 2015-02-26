var fs = require('fs');
var cron = require('cron');
var archive = require('../helpers/archive-helpers');

// Sync is ok here because this is called just once on startup.
module.exports = function () {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync("../archives")) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync("../archives");
  }

  // if the file doesn't exist, create it.
  if (!fs.existsSync("../archives/sites.txt")) {
    // We use fs.openSync to create the file
    var file = fs.openSync("../archives/sites.txt", "w");
    fs.closeSync(file);
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync("../archives/sites")) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync("../archives/sites");
  }

  // run cron job
  var cronJob = cron.job("0 * * * * *", archive.downloadUrls);
  cronJob.start();
};
