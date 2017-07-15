/*
Problem : 2
===============================================================================================================

Use Google / OpenStreet map APIs to overlay information from Problem 1 on a map.

Use data from following file to create the overlay.

https://dl.dropboxusercontent.com/s/8nvqnasci6l76nz/Problem.gpx?dl=0

Email : ajeet@rupeek.com

*/

var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('port',  process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var fs = require('fs');                                                                                                                                    
var parser = require('xmljson').to_json;

app.get("/populateMap", function(req, res) {
	fs.readFile('./input.xml', function read(err, data){                                                                                                    
	    if(err) {
	        console.log(err);
	    } else {
	      	parser(data, function(err, json) {
	        	if(err) {
	          		console.log(err);
	        	}
	        	var inputData = json.gpx.trk.trkseg.trkpt;
	        	var latlonArr = [];
	        	for(var k in inputData) {
	        		var d = inputData[k]['$'];
	        		latlonArr.push({
	        			lat: d.lat - 0,
	        			lng: d.lon - 0,
	        		});
	        	}
	        	return res.render('problem2', {
	        		data: JSON.stringify(latlonArr),
	        	});
	    	})
	    }                                                                                                                                       
    });
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});