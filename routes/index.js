/*
 * Routes for CanLII API Demo
 */

exports.index = function (req, res) {

  // Require request module for simplified HTTP GET requests
  var request = require("request");

  // Define API request parameters
  var reqParameters = {
      api_key: 'c9jckm4neq4nhancmd6pbqmd',
      offset: 0,
      resultCount: 100,
      fullText: 'citizenship+and+immigration'
    },
    reqPath = 'http://api.canlii.org/v1/search/en/?';

  // Concatinate request parameters onto the API request path
  for (param in reqParameters) {
    if (reqParameters.hasOwnProperty(param)) {
      reqPath += param + '=' + reqParameters[param] + '&';
    }
  }
  reqPath = reqPath.slice(0,reqPath.length-1);

  // Define callback for the API request
  function callback(error, response, body)  {
    if (!error && response.statusCode == 200) {

      // Create data object to be returned and
      // the regexes for identifying defendant and plaintif cases
      var data_object = {},
          patt_d = /v[.].+Canada.+Citizenship\s+and\s+Immigration/,
          patt_p = /Canada.+Citizenship\s+and\s+Immigration.+v[.].+/;

      console.log(body);

      // Parse API response and populate the data object
      for (var i=0; i<body['results'].length-1; i++) {

        // Filter out results that are not cases
        if(body['results'][i].hasOwnProperty('case')) {

          // determine year from caseId ***DANGEROUS*** may not work for all cases
          var year = body['results'][i]["case"]["caseId"]["en"].substring(0,4),
          // init var for to as pointer for counting
              currRecord = null;

          if(data_object[year]){
            currRecord = data_object[year];
          } else {
            data_object[year] = { d : 0, p : 0}
            currRecord = data_object[year];
          }

          if(patt_d.test(body['results'][i]["case"]["title"])) {
            currRecord.d += 1;
          }
          else if(patt_d.test(body['results'][i]["case"]["title"])) {
            currRecord.p += 1;
          }
        }
      }

      // Return data object to requestor (i.e. browser)
      res.end(JSON.stringify(data_object, null, "\t"));

    }
  }

  // Make the request to CanLII API
  request({url: reqPath, json: true}, callback);
}