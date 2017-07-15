/*
Problem : 1
=================================================================================================

In the given xml file named Problem.gpx, find the following making assumptions based on SI units:

A*. Total Distance
B. Max speed
C*. Average speed
D*. Elevation gained (high-low elevation)
E*. Moving time (Its the time when the subject was moving i.e. not sitting idle)
F*. Total time elapsed

The xml file contains the timestamp, location and elevation datapoints.

Link to test data: https://dl.dropboxusercontent.com/s/8nvqnasci6l76nz/Problem.gpx?dl=0
*/

var fs = require('fs');                                                                                                                                    
var parser = require('xmljson').to_json;

var thresholdSpeed = 0.000004;

var distance = function(a, b) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((b.lat - a.lat) * p)/2 + 
          c(a.lat * p) * c(b.lat * p) * 
          (1 - c((b.lon - a.lon) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

var timeDiff = function(at, bt) {
  return (new Date(bt).getTime() - new Date(at).getTime()) / 1000;
}

var computeDetails = function(data) {
  
  
  var answer = {
    totalDistance: 0, // KM
    movingTime: 0,
    maxSpeed: 0, // Km/s
    totalTime: 0, //seconds
  }
  var hElev =  data['0'].ele - 0;
  var lElev = data['0'].ele - 0;
  for(var k in data) {
    var a = data[k];
    var l = (k - 0) + 1 + '';
    var b = data[l];
    if(b) {
      var dist = distance(a['$'], b['$']);
      var time = timeDiff(a.time, b.time);
      var speed = dist/time; // Km/s
      if(speed > answer.maxSpeed) {
        answer.maxSpeed = speed;
      }
      
      if(speed > thresholdSpeed) {
         answer.movingTime += time;
      }
      
      if((a.ele - 0) > hElev) {
        hElev = (a.ele - 0);
      }
      if((a.ele - 0) < lElev) {
        lElev = (a.ele - 0);
      }
      answer.totalTime += time;
      answer.totalDistance += dist;
    }
  }
  answer.avgSpeed = answer.totalDistance / answer.totalTime;
  answer.elevGained = (hElev - lElev).toFixed(2) - 0;
  console.log(answer);
}
                                                                                                                                                           
var readData = function() {                                                                                                                      
    fs.readFile('./input.xml', function read(err, data){                                                                                                    
            if(err) {
                console.log(err);
            } else {
              parser(data, function(err, json) {
                if(err) {
                  console.log(err);
                }
                var inputData = json.gpx.trk.trkseg.trkpt;
                computeDetails(inputData);
              })
            }                                                                                                                                       
    })                                                                                                                                                 
}                                                                                                                                                          
                                                   
readData();