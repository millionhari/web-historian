var fs = require('fs');
var cron = require('cron');
var archive = require('../helpers/archive-helpers');

module.exports = function () {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync("../archives")) {
    fs.mkdirSync("../archives");
  }

  // if the file doesn't exist, create it.
  if (!fs.existsSync("../archives/sites.txt")) {
    var file = fs.openSync("../archives/sites.txt", "w");
    fs.closeSync(file);
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync("../archives/sites")) {
    fs.mkdirSync("../archives/sites");
  }

  // run cron job
  var cronJob = cron.job("0 * * * * *", archive.downloadUrls);
  cronJob.start();
  console.log('cronjob started');
};
