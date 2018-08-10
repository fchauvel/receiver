/*
 * SensApp::Receiver
 *
 * Copyright (C) 2017 SINTEF Digital
 * All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 */

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
	});
    });

    it("returns 200 for /sensapp/my-sensor", function() {
	var options = {
	    "url": "http://localhost:3000/sensapp/my-sensor",
	    "method": "POST"
	};

	request(options, function(error, response, body) {
	    expect(response.statusCode).to.equal(200);
	});
    });

    it("returns 200 for /about", function() {
	var options = {
	    "url": "http://localhost:3000/sensapp/about",
	    "method": "POST"
	};

	request(options, function(error, response, body) {
	    expect(response.statusCode).to.equal(200);
	    expect(body).to.have.string("SINTEF");
	});
    });
    
});
