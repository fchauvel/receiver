var expect  = require("chai").expect;
var request = require("request");


describe("Receiver API", function() {
    
    var body = {
	"sensor": "my-sensor-unique-ID",
	"time": "now",
	"data": "50"
    };

    it("returns 404 for any URL other than /sensapp", function() {
	var options = {
	    "url": "http://localhost:3000/somewhere",
	    "method": "POST"
	};

	request(options, function(error, response, body) {
	    expect(response.statusCode).to.equal(404);
	    done();
	});
    });

    it("returns 200 for /sensapp", function() {
	var options = {
	    "url": "http://localhost:3000/sensapp/my-sensor",
	    "method": "POST"
	};

	request(options, function(error, response, body) {
	    expect(response.statusCode).to.equal(200);
	    done();
	});
    });

});
