var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');

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
    }

    if (route === '/styles.css'){
      //serve up styles
      var style = archive.paths.siteAssets.concat('/styles.css');
      httpHelpers.serveAssets(res, style, function(){
        res.end();
      });
    }
  },
  POST: function(req, res){
    var route = archive.parseRoute(req.url);
    if (route === '/'){
      var data = "";
      req.on('data', function(chunk){
        data += chunk;
      });
      req.on('end', function(){
        // gets url from form submission
        var url = httpHelpers.formValues(data).url;

        // new submission
        if (!archive.isUrlInList(url)){
          console.log('new submission');
          archive.addUrlToList(url);
          httpHelpers.serveLoading(res);
        }

        // pending submission
        if (archive.isUrlInList(url) && !archive.isUrlArchived(url)){
          console.log('pending submission');
          httpHelpers.serveLoading(res);
        }

        // take them to the page
        if (archive.isUrlInList(url) && archive.isUrlArchived(url)){
          console.log('redirect to archived page');
          var site = archive.paths.archivedSites.concat('/'+url);
          httpHelpers.serveAssets(res, site, function(){
            res.end();
          });
        }
      });
    }

  }
};

exports.handleRequest = function (req, res) {
  exports.router[req.method](req, res);
};
