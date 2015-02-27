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
  fs.readFile(asset, "binary", function(err, file){
    res.writeHead(200, headers);
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
  var loading = archive.paths.siteAssets.concat('/loading.html');
  exports.serveAssets(res, loading, function(){
    res.end();
  });
};

exports.sendResponse = function(res, obj, status){
  status = status || 200;
  res.writeHead(status, headers);
  res.end(obj);
};

exports.send404 = function(res){
  exports.sendResponse(res, '404: Page not found', 404);
};

exports.sendRedirect = function(res, location, status){
  status = status || 302;
  res.writeHead(status, {Location: location});
  res.end();
};
