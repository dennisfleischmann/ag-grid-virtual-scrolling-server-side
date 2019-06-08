var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');


let database;

fs.readFile(__dirname + '/data.json', function(err, data) {

  var idSequence = 0;

  data.forEach(function(item) {
    item.id = idSequence++;
  });

  database = JSON.parse(data);

  app.set('port', process.env.PORT || 3000);
  app.get('/data', function(request, res) {

    var startRow = request.param('startRow');
    var endRow = request.param('endRow');

    // take a slice of the total rows
    var rowsThisPage = database.slice(startRow, endRow);

    var lastRow = database.length <= endRow ? database.length : -1;

    res.setHeader('Content-Type', 'application/json');

    res.send({
      success: true,
      rows: rowsThisPage,
      lastRow: lastRow
    })

  });

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.get('/main.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../main.js'));
  });

  app.listen(app.get('port'), function() {
    console.log('http Express server(worker) listening on port ' + app.get('port'));
  });
  if (err) {
    throw err;
  }
});
