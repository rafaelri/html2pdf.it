var express = require('express');
var gzippo = require("gzippo");

var env = process.env.APP_ENV || "production";
var config = require("../config/" + env + ".app.config.js");
var http = express.createServer();


http.configure(function () {
	http.use(http.router);
	http.use(gzippo.staticGzip(__dirname + '/public', {clientMaxAge:-1000 * 60 * 60 * 24}));
});

require("./websiteRoutes.js")(http);
require("./webservices/pdf.js")(http);

http.listen(config.http.port);
console.log("Listening on http://localhost:" + config.http.port + "/");