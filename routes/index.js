/*
 * Routes for CanLII API Demo
 */

function index (req, res) {

  // Require http to enable querying the CanLII API
  var http = require("http");

  // Define API request parameters
  var reqParameters = {
    api_key: 'r552g2n96genj4vbp2jpae7m',
    offset: 0,
    resultCount: 10,
    fullText: 'citizenship and immigration'
  },
    reqPath = '/v1/search/en/?';

  for (param in reqParameters) {
    if (reqParameters.hasOwnProperty(param)) {
      reqPath += param + '=' + reqParameters[param] + '&';
    }
  }

  reqPath = reqPath.slice(0,reqPath.length-1);

//  res.end(reqPath);

  // Define HTTP request parameters
  var options = {
    host: 'api.canlii.org',
    port: 80,
    path: reqPath
  };

  // Send a GET request to CanLII
  http.get(options, function(apiResponse) {

    // Output response status to console
    console.log("Got response: " + apiResponse.statusCode);

    // Add a listener for the 'data' event in the response
    apiResponse.on("data", function(chunk) {
      res.end("BODY: " + chunk);
    });

  // Error handler for the GET request
  }).on('error', function(e) {

    res.end("Got error: " + e.message);

  });
};

exports.index = index;