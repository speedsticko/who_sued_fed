# who_sued_fed

A proof of concept app that uses the [CanLII](http://developer.canlii.org) API to provide metrics on court decisions involving the federal government, both as the plaintiff and as the defendant.

## Status:

A basic proof of concept is done:

- Application uses Node.js, Express, request, jQuery, and Google Charts
- At present the search string is hard-coded and the demo only parses one request for 100 search results
- The demo consists of a static html file with inline Javascript code makes and AJAX call to retrieve data from the server
- The data, in a JSON formatted array that is fed into a Google Chart object which is then displayed to the user

## TODO:

### Coding

- Modularize (i.e. abstract API access from routing)
- Separate code, content, and presentation (no inline JS)
- Enable continuous requests to fetch the complete set of search results
- Add storage (in-memory to start, though ultimately DB) of the data already fetched from CanLII
- Improve GUI
- Eventually move on to examining citations of legislation in relevant cases

### Research

- Examine longer search result datasets to identify common patterns for naming of federal departments in case titles
- Identify departments and ministers to cover
- Look into how long each department has been in existence
