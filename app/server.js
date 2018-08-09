

var knownSensors = ["my-sensor"]

const options = [
    { name: "version", alias: 'v', type: Boolean },
    { name: "port", alias: "p", type: Number, defaultValue: 3000},
    { name: "host", alias: "h", type: String, defaultValue: "localhost" }
];

const commandLineArgs = require('command-line-args');
const commandLine = commandLineArgs(options);


var express = require("express");
var app = express();

app.post("/sensapp/:sensorId", function(request, response) {
    var sensorId = request.params.sensorId
    
    if (knownSensors.indexOf(sensorId) > -1) {
	response.send("That's all folks");

    } else {
	response.statusCode = 400;
	response.send("Unknown sensor!");
    }
    
});


var CLI = require("./cli").CLI;
var Credits = require("./cli").Credits;

var credits = new Credits();
var cli = new CLI(console, credits);

cli.showOpening();
cli.showCopyright();
cli.showHorizontalLine();
app.listen(commandLine.port);
cli.showEndpoint(commandLine.host, commandLine.port);
