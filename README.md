[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1253b557fc7d4fa8bbb3d4255b459300)](https://app.codacy.com/app/fchauvel/receiver?utm_source=github.com&utm_medium=referral&utm_content=fchauvel/receiver&utm_campaign=Badge_Grade_Settings)
[![Build Status](https://travis-ci.org/fchauvel/receiver.svg?branch=master)](https://travis-ci.org/fchauvel/receiver)
[![Test Coverage](https://img.shields.io/codecov/c/github/fchauvel/receiver.svg)](https://codecov.io/gh/fchauvel/receiver)
![GitHub tag](https://img.shields.io/github/tag/fchauvel/receiver.svg)

# SensApp::Receiver

This the front-end service that sensors hit when they post data to
SensApp. It is ia REST service that offers, the follwing endpoints:

 * POST at `/sensors/{sensor-id}/data`. Accept the data collected by the
   sensors in JSON document. Here is an example of JSON payload:
   
		[
			{
				"measurement": "test",
				"tags": {
					"source:" "integration tests",
				},
				"time": "2009-11-10T23:00:00Z",
				"fields": {
					"value": 0.64,
		
				}
			}
		]

 * GET at `/receiver/about` returns some general informations about the
   service. Useful to quickly test that the service is up and running.

 
# Build, Test and Installation

Receiver is a NodeJS application, so the requirements are NodeJS and
Git. Here is the installation procedure.

 1. Fetch the sources from the git repository:

		$> git clone https://github.com/fchauvel/receiver.git

 2. Install the application from the sources:

		$> cd receiver
		$> npm install

 3. Run the test suite:

		$> node app/start &
		$> npm test
		$> kill $!

# Start-up

This is a NodeJS application that starts with:

     $> node app/start
     SensApp.Receiver v0.0.0
     Copyright (C) SINTEF -- 2018
     ------
     Listening on localhost:3000 ...
	 
## Options

A couple of options can be set through the command line as follows:

	$ node app/start --help
	
	Usage: start [options]

	REST end-point where sensors can push data

	Options:

	  -V, --version           output the version number
      -p, --port [int]        Set the port on which Receiver listens (default: 3000)
	  -q, --task-queue [url]  Set the URL of the task queue (default: amqp://task-queue:5672)
      -h, --help              output usage information

franck@debian:~/Documents/mssep/receiver$ 

