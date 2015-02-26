var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var urlParser = require('url');

// var fs = require('fs-utils');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.parseRoute = function(url){
  var parts = urlParser.parse(url);
  var route = parts.pathname;
  return route;
}

exports.readListOfUrls = function(){

  var urls = fs.readFileSync('./archives/sites.txt', 'utf8').split('\n');
  return urls.slice(0,urls.length-1);
};

exports.isUrlInList = function(url, list){
  list = list || exports.readListOfUrls();
  return list.indexOf(url) > -1;
};

exports.addUrlToList = function(url){
  // get urls
  var list = exports.readListOfUrls();
  // check if duplicate
  if (!exports.isUrlInList(url, list)){
    // write urls to sites.txt
    list.push(url);
    fs.writeFileSync('./archives/sites.txt', 'utf8', list.join('\n'));
  }

};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
