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
    }
    if (route === '/styles.css'){
      //serve up styles
      var style = archive.paths.siteAssets.concat('/styles.css');
      httpHelpers.serveAssets(res, style, function(){
        res.end();
      });
    }
    archive.readListOfUrls();
    console.log(archive.isUrlInList('www.amazon.com'));
    // look up website in sites.txt
    // if exists in archive
      //serve it up
    // else serve up to loading.html
  },
  POST: function(req, res){
    var route = archive.parseRoute(req.url);
    // if (route === '/'){}
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
