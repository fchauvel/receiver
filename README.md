# SensApp::Receiver

This the front-end service that sensors hit when they post data to
SensApp. It is ia REST service that offers, the follwing endpoints:

 * POST at `/sensapp/:sensor-id`. Accept the data collected by the
   sensors in JSON document.

 * GET at `/sensapp/about` returns some general informations about the
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

The port listen to can be specified using the `-p` option as follows:

    $> node app/start -p 8078

