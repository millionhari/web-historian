var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.router = {
  GET: function(req, res){
    // get route from URL
    var route = archive.parseRoute(req.url);
    if (route === '/'){
      //serve up index.html
      var index = archive.paths.siteAssets.concat('/index.html');
      httpHelpers.serveAssets(res, index, function(){
        res.end();
      });
      console.log(archive.readListOfUrls());
    }
    if (route === '/styles.css'){
      //serve up styles
      var style = archive.paths.siteAssets.concat('/styles.css');
      httpHelpers.serveAssets(res, style, function(){
        res.end();
      });
    }
    // console.log(archive.readListOfUrls());
  },
  POST: function(req, res){
    var route = archive.parseRoute(req.url);
    if (route === '/'){
      var data = "";
      req.on('data', function(chunk){
        data += chunk;
      });
      req.on('end', function(){
        if (!archive.isUrlInList(data)){
          archive.addUrlToList(data);
          //perform redirect to loading page
        }
        if (archive.isUrlInList(data) && !isUrlArchived()){
          //perform redirect to loading page
        }
        if (archive.isUrlInList(data) && isUrlArchived()){
          //perform redirect to archived page
        }
      });
      //retrieve data sent in request
      //see if it's in URL list
        //if not in list
          //add url to list and redirect to loading
        //if on list and is archived
          //redirect to archived url
    }

  }
};

exports.handleRequest = function (req, res) {

  exports.router[req.method](req, res);


};
