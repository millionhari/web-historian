var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(asset, "binary", function(err, file){
    res.writeHead(200);
    res.write(file, "binary");
    callback();
  })
};

exports.formValues = function(data){
  var splits = data.split('&');
  var hash = [];
  for (var i = 0; i < splits.length; i++){
    var element = splits[i].split('=');
    hash[element[0]] = element[1];
  }
  return hash;
};

exports.serveLoading = function(res){
  //perform redirect to loading page
  var loading = archive.paths.siteAssets.concat('/loading.html');
  exports.serveAssets(res, loading, function(){
    res.end();
  });
};

// As you progress, keep thinking about what helper functions you can put here!
