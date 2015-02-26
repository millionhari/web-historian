var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.router = {
  GET: function(req, res){
    // get route from URL
    var parts = urlParser.parse(req.url);
    var route = parts.pathname;
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
    archive.readListOfUrls();
    // console.log(archive.isUrlInList('www.amazon.com'));
    // look up website in sites.txt
    // if exists in archive
      //serve it up
    // else serve up to loading.html
  }
};

exports.handleRequest = function (req, res) {

  exports.router[req.method](req, res);


  // handle GET requests
  // if(req.method === 'GET'){

  //   // respond with homepage
  //   if(req.url === '/'){
  //     console.log('the url', req.url);

  //   }
  // }
  // res.end(archive.paths.list);

};
