var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');

exports.router = {
  GET: function(req, res){
    // get route from URL
    var route = archive.parseRoute(req.url);
    console.log(route);
    if (route === '/'){
      //serve up index.html
      var index = archive.paths.siteAssets.concat('/index.html');
      httpHelpers.serveAssets(res, index, function(){
        res.end();
      });
    }

    else if (route === '/styles.css'){
      //serve up styles
      var style = archive.paths.siteAssets.concat('/styles.css');
      httpHelpers.serveAssets(res, style, function(){
        res.end();
      });
    }

    else if (route === '/loading.html'){
      httpHelpers.serveLoading(res);
    }

    else if (archive.isUrlArchived(route)){
      httpHelpers.serveAssets(res, route, function(){
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
          httpHelpers.sendRedirect(res, '/loading.html');
        }

        // pending submission
        else if (archive.isUrlInList(url) && !archive.isUrlArchived(archive.paths.archivedSites.concat('/'+url))){
          console.log('pending submission');
          httpHelpers.sendRedirect(res, '/loading.html');
        }

        // take them to the page
        else if (archive.isUrlInList(url) && archive.isUrlArchived(archive.paths.archivedSites.concat('/'+url))){
          console.log('redirect to archived page');
          var site = archive.paths.archivedSites.concat('/'+url);
          httpHelpers.sendRedirect(res, site);
        }
      });
    }

  }
};

exports.handleRequest = function (req, res) {
  exports.router[req.method](req, res);
};
